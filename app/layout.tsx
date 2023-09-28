import "./globals.scss";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./providers";
import NavbarComponent from "@/app/components/navbar/navbar.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Truffle",
  description: "Discover Movies,Tv shows and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavbarComponent />
          {children}
        </Providers>
      </body>
    </html>
  );
}
