// app/layout.tsx
import type { Metadata } from "next";
import HeaderNavbar from "@/components/ui/navbar";
import { AuthProvider } from '../context/AuthContext'; // Ajuste o caminho
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css"; // Ajuste o caminho se necessário


export const metadata: Metadata = {
  title: "EngluzSoft",
  description: "Plataforma de vendas de imóveis",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      
      <body className="antialiased" suppressHydrationWarning={true}>
        <AuthProvider>
          <HeaderNavbar />
          {children}
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}