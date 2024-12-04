import type {Metadata} from "next";
import {ClerkProvider} from '@clerk/nextjs';
import Image from "next/image";
import localFont from "next/font/local";
import Header from "@/components/header";
import "./globals.css";
import {auth} from "@clerk/nextjs/server";
import Footer from "@/components/footer";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Mets & Merveilles",
    description: "Application Full-Stack de Restauration",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const{ userId } = auth();
    return (
        <ClerkProvider>
            <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            <Image
                src="/images/hero.svg"
                className="absolute -z-10 top-0 right-0 w-full md:w-[60%]"
                alt="Hero Banner"
                width={800}
                height={800}
            />
            <Header userId={userId} />
            {children}
            <Footer />
            </body>
            </html>
        </ClerkProvider>
    );
}
