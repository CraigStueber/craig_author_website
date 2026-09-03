import type { Metadata } from "next";
import Script from "next/script";
import { Lora, Source_Sans_3 } from "next/font/google";

import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Craig A. Stueber",
    template: "%s | Craig A. Stueber",
  },
  description:
    "Official website of Craig A. Stueber, author of The Comfortable Apocalypse.",
};

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${sourceSans.variable}`}>
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];

                function gtag() {
                  dataLayer.push(arguments);
                }

                gtag('js', new Date());

                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}

        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
