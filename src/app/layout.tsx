import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Rubik } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/provider";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vale Viajem | Laike Turismo",
  description:
    "Cansado de lidar com recibos e reembolsos de viagens? O Vale-Viagem é a solução perfeita para você! Automatize a gestão de despesas com viagens, reduza custos e simplifique a vida.",
  icons: "/laike.svg",
  keywords:
    "viagem, turismo, vale-viagem, laike turismo, benefícios, destinos, cadastro, gestão, despesas, reembolsos, custos, simplificação, vida, automatização, solução, perfeita, lidar, recibos, viagens, vale-viagem, solução, perfeita, você, automatize, gestão, despesas, viagens, reduza, custos, simplifique, vida, vale-viagem, solução, perfeita, você, automatize, gestão, despesas, viagens, reduza, custos, simplifique, vida, vale-viagem, solução, perfeita, você, automatize, gestão, despesas, viagens, reduza, custos, simplifique, vida, vale-viagem, solução, perfeita, você, automatize, gestão, despesas, viagens, reduza, custos, simplifique, vida, vale-viagem, solução, perfeita, você, automatize, gestão, despesas, viagens, reduza, custos, simplifique, vida, vale-viagem, solução, perfeita, você, automatize, gestão, despesas, viagens, reduza, custos, simplifique, vida, vale-viagem, solução, perfeita, você, automatize, gestão, despesas, viagens, reduza, custos, simplifique, vida, vale-viagem, solução, perfeita, você, automatize, gestão, despesas, viagens, reduza, custos, simplifique, vida, vale-viagem, solução, perfeita, você, automatize, gestão, despesas, viagens, reduza, custos, simplifique, vida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className={rubik.className}>
        <NextTopLoader />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
