// app/layout.tsx
import type { Metadata } from "next";
import HeaderNavbar from "@/components/ui/navbar";
import "./globals.css"; // Ajuste o caminho se necessário


export const metadata: Metadata = {
  title: "COSMOS",
  description: "Plataforma de conexão",
  icons: {
    icon: "/cosmos-head.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        <HeaderNavbar />
        {children}
      </body>
    </html>
  );
}