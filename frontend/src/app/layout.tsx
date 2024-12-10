import type { Metadata } from "next";
import Providers from "./providers";
import { Inter } from "next/font/google";
import "./globals.css";

import NavigationBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Commune | Scraping-Chatbot",
  description: "This is s a commune scraping chatbot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavigationBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
