import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Lora, Source_Sans_3 } from "next/font/google";

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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${sourceSans.variable}`}>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
