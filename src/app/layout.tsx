import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://docufacil.pages.dev";
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DocuFácil | Generador Gratis de Documentos Legales, Contratos y RFC en PDF",
    template: "%s | DocuFácil",
  },
  description:
    "Crea e imprime gratis en segundos cartas poder, contratos de arrendamiento, pagarés, recibos de pago, políticas de privacidad y tu ficha de RFC. Sin registros y 100% privado.",
  keywords: [
    "formato carta poder pdf",
    "contrato de arrendamiento simple pdf",
    "generador de pagare gratis",
    "recibo de pago pdf",
    "generador politica de privacidad",
    "calcular rfc con homoclave",
    "documentos legales gratis mexico",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: "DocuFácil",
    title: "DocuFácil | Documentos Legales y Comprobantes Rápidos en PDF",
    description:
      "Llena un formulario sencillo paso a paso, mira la vista previa en vivo y descarga tu documento en PDF listo para firmar o entregar.",
  },
  verification: GSC_VERIFICATION
    ? {
        google: GSC_VERIFICATION,
      }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${plusJakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased">
        {ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
