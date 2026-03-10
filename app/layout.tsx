

import type { Metadata } from "next";
import { Poppins } from "next/font/google"; 
import "./globals.css";

 const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-body",
  display: "swap", //browser viser med det samme en fallback font - og swapper til Poppins, så snart den er loadet
  //Det hjælper også på Core Web Vitals-scoren (FCP — First Contentful Paint).
}) 

export const metadata: Metadata = {
  title: {
     template: "%s | Believe Fitness", //%s placeholder will be replaced by the page title defined in each page
    default: "Believe Fitness"
  },
  description: "Train like a pro",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable} >
      <body>
        <div id="app-shell">
        {children}
        </div>
      </body>
    </html>
  );
}
