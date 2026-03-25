import type { Metadata } from "next";
import { Playfair_Display, IM_Fell_English } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const imFell = IM_Fell_English({
  variable: "--font-im-fell",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Wedding Post — Iara & Douglas",
  description:
    "Confirme sua presença no casamento de Iara Mello e Douglas Tertuliano, 21 de Novembro de 2026, Igreja Matriz Nossa Senhora da Saúde, Lagoa Santa.",
  openGraph: {
    title: "The Wedding Post — Iara & Douglas",
    description: "21 de Novembro de 2026 · Igreja Matriz N.S. da Saúde, Lagoa Santa",
    type: "website",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${imFell.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#c4683a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="The Wedding Post" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
