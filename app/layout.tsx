import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "@/components/Footer/Footer";
import { Analytics } from "@vercel/analytics/next";
import { I18nProvider } from "@/lib/i18n-simple";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: "Jóvenes en acción",
  description: "Pagina oficial de Jóvenes en acción",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <Navbar/>
          {children}
          <Footer/>
          <Analytics />
        </I18nProvider>
      </body>
    </html>
  );
}
