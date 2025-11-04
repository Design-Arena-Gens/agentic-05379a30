import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ideas de Impacto Social",
  description:
    "Plataforma de ideas de negocio con impacto social para profesionales en mediación y trabajo comunitario."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
