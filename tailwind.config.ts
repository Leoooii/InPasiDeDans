import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors based on the logo
        red: {
          "50": "#fff0f0",
          "100": "#ffe1e1",
          "200": "#ffc7c7",
          "300": "#ffa0a0",
          "400": "#ff6b6b",
          "500": "#ff3a3a",
          "600": "#ff1111",
          "700": "#db0000",
          "800": "#b30000",
          "900": "#910000",
          "950": "#500000",
        },
        orange: {
          "50": "#fff8eb",
          "100": "#ffecc6",
          "200": "#ffd88a",
          "300": "#ffbf4d",
          "400": "#ffa41c",
          "500": "#f98300",
          "600": "#dd6800",
          "700": "#b74d00",
          "800": "#943d00",
          "900": "#7a3400",
          "950": "#461a00",
        },
        beige: {
          "50": "#fefbf3",
          "100": "#fcf5e5",
          "200": "#f8e9c7",
          "300": "#f3d89d",
          "400": "#edc16c",
          "500": "#e6a93d",
          "600": "#d99026",
          "700": "#b4721f",
          "800": "#905b1f",
          "900": "#764b1d",
          "950": "#412609",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-accordion": {
          from: { opacity: "0", transform: "translateY(-4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out-accordion": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(-4px)" },
        },
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "continuous-shine": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        "fade-in-accordion": "fade-in-accordion 0.2s ease-out",
        "fade-out-accordion": "fade-out-accordion 0.2s ease-in",
        shine: "shine 1.5s ease-in-out",
        "continuous-shine": "continuous-shine 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

