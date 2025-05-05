import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";
import HeaderNavbar from "../components/ui/navbar";
export const metadata: Metadata = {
  title: "COSMOS",
  description: "Plataforma de conexão",
  icons: {
    icon: "/cosmos-head.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/cosmos-head.svg" type="image/x-icon" />
      <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;700&display=swap"
        />
        
      </Head>
      <body
        className={`antialiased`}
      >

        {children}
      </body>
    </html>
  );
}
