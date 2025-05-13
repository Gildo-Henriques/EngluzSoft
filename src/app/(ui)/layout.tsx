import type { Metadata } from "next";
import Head from "next/head";
import HeaderNavbar from "../../components/ui/navbar";
export const metadata: Metadata = {
  title: "EngluzSoft",
  description: "Plataforma de vendas de imóveis",
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
      
        
      </Head>
      <body
        className={`antialiased`}
      >
                <HeaderNavbar />
        {children}
      </body>
    </html>
  );
}
