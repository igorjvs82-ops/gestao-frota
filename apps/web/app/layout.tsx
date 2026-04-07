import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Logos Studio",
  description: "Plataforma de estudos bíblicos centrada no evangelho"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
