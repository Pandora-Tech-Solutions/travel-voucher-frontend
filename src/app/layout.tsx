import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import { Rubik } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/provider";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={rubik.className}>
        <NextTopLoader />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
