// import { NextResponse } from "next/server"
// import nodemailer from "nodemailer"

// export async function POST(request: Request) {
//   try {
//     const body = await request.json()
//     const { name, email, subject, message } = body

//     // Configurare nodemailer pentru Gmail
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER || "your-email@gmail.com", // Adresa ta de Gmail
//         pass: process.env.EMAIL_PASSWORD || "your-app-password", // Parola de aplicație (nu parola contului)
//       },
//     })

//     // Configurare email
//     const mailOptions = {
//       from: `"Formular Contact" <${process.env.EMAIL_USER || "your-email@gmail.com"}>`,
//       to: "lioneh39@gmail.com", // Adresa destinatar
//       subject: `Mesaj nou de pe site: ${subject}`,
//       text: `
// Nume: ${name}
// Email: ${email}

// Mesaj:
// ${message}
//       `,
//       html: `
// <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
//   <h2 style="color: #d32f2f; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Mesaj nou de pe site</h2>
  
//   <div style="margin-bottom: 20px;">
//     <p><strong>Nume:</strong> ${name}</p>
//     <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
//     <p><strong>Subiect:</strong> ${subject}</p>
//   </div>
  
//   <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
//     <h3 style="margin-top: 0; color: #333;">Mesaj:</h3>
//     <p style="white-space: pre-line;">${message}</p>
//   </div>
  
//   <div style="margin-top: 20px; font-size: 12px; color: #777; text-align: center;">
//     <p>Acest email a fost trimis automat de pe site-ul In Pasi de Dans.</p>
//   </div>
// </div>
//       `,
//     }

//     // Trimitere email
//     const info = await transporter.sendMail(mailOptions)
//     console.log("Email trimis:", info.messageId)

//     return NextResponse.json({ success: true, messageId: info.messageId })
//   } catch (error) {
//     console.error("Eroare la trimiterea email-ului:", error)
//     return NextResponse.json({ error: "Eroare la trimiterea mesajului", details: error.message }, { status: 500 })
//   }
// }

