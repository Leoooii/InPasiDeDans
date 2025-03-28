import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { kv } from "@vercel/kv"

/**
 * Configurare NextAuth pentru autentificare
 *
 * Acest fișier configurează sistemul de autentificare folosind NextAuth.js
 * Folosim CredentialsProvider pentru autentificare cu email și parolă
 *
 * În producție, ar trebui să folosiți o metodă mai sigură de stocare a credențialelor
 * și să implementați hashing pentru parole
 */
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // Numele afișat pe pagina de login
      name: "Credentials",
      // Configurarea câmpurilor din formularul de login
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // Funcția de autorizare
      async authorize(credentials) {
        // Verifică dacă avem credențiale
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // În producție, ar trebui să verificați credențialele cu o bază de date
          // Aici folosim Vercel KV pentru a stoca și verifica utilizatorii
          // Dacă nu există utilizatori, creăm un utilizator admin default
          const usersCount = await kv.get("admin:users:count")

          if (!usersCount) {
            // Creăm un utilizator admin default
            // NOTĂ: În producție, ar trebui să folosiți un hash pentru parolă
            await kv.set("admin:users:admin@inpasidedans.ro", {
              email: "admin@inpasidedans.ro",
              password: "admin123", // Ar trebui să fie un hash în producție
              name: "Administrator",
              role: "admin",
            })
            await kv.set("admin:users:count", 1)
          }

          // Verificăm credențialele
          const user = await kv.get(`admin:users:${credentials.email}`)

          if (user && (user as any).password === credentials.password) {
            return {
              id: credentials.email,
              email: credentials.email,
              name: (user as any).name,
              role: (user as any).role,
            }
          }

          return null
        } catch (error) {
          console.error("Eroare la autorizare:", error)
          return null
        }
      },
    }),
  ],

  // Configurare sesiune
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 zile
  },

  // Pagini personalizate
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },

  // Callback-uri
  callbacks: {
    // Personalizăm JWT-ul pentru a include rolul utilizatorului
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },

    // Personalizăm sesiunea pentru a include rolul utilizatorului
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }

