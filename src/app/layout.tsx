import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import { auth } from "@clerk/nextjs/server";
import { Instrument_Sans, Poppins } from "@next/font/google";


const instrumentSans = Instrument_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: "normal",
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: "normal",
});

export const metadata: Metadata = {
    title: "Mets & Merveilles",
    description: "Application Full-Stack de Restauration",
    icons: "images/favicon_mets-merveilles.png",
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
                <body className={`${instrumentSans.className} ${poppins.className} antialiased`}>
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