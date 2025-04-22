import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";


export const metadata: Metadata = {
  title: "TMS-Task Management System",
  description: "",
};
const poppins = Poppins({ subsets: ['latin'], weight: ['400'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}><StoreProvider>{children}</StoreProvider></body>
    </html>
  );
}