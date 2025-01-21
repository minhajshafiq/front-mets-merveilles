import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Image from "next/image";
import localFont from "next/font/local";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import { auth } from "@clerk/nextjs/server";

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

type RootLayoutProps = {
    children: React.ReactNode;
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<RootLayoutProps>): Promise<JSX.Element> {
    const { userId } = await auth(); // Await ici car `auth()` est une promesse.

    return (
        <ClerkProvider>
            <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            {/* Hero Image */}
            <Image
                src="/images/hero.svg"
                className="absolute -z-10 top-0 right-0 w-full md:w-[60%]"
                alt="Hero Banner"
                width={800}
                height={800}
            />

            {/* Header */}
            <Header userId={userId} />

            {/* Main Content */}
            {children}

            {/* Footer */}
            <Footer />
            </body>
            </html>
        </ClerkProvider>
    );
}
