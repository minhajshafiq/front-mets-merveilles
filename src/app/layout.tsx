import type {Metadata} from "next";
import {ClerkProvider} from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import {auth} from "@clerk/nextjs/server";
import {Instrument_Sans, Poppins} from "@next/font/google";
import {Toaster} from "@/components/ui/sonner"
import {CartProvider} from "@/components/context/CartContext";


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
    const {userId} = await auth();

    return (
        <ClerkProvider>
            <CartProvider>
                <html lang="en">
                <body className={`${instrumentSans.className} ${poppins.className} antialiased`}>
                {/* Header a maintenant accès au contexte du panier */}
                <Header userId={userId}/>

                {/* Main Content */}
                {children}
                <Toaster/>

                {/* Footer */}
                <Footer/>
                </body>
                </html>
            </CartProvider>
        </ClerkProvider>
    );
}

