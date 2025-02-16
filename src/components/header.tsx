"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import Container from "./container";
import { checkRole } from "@/lib/roles.ts";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface HeaderProps {
    userId: string | null;
}

export default function Header({ userId }: Readonly<HeaderProps>) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (userId) {
            checkRole().then(setIsAdmin);
        }
    }, [userId]);

    // Liste des liens du menu
    const navLinks = [
        { href: "/", label: "Accueil" },
        { href: "/menu", label: "Menu" },
        { href: "/about", label: "À propos" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header className="w-full z-50 transition">
            <Container className="relative px-4 sm:px-6 lg:px-12 flex h-16 items-center justify-between">
                <div className="max-w-[150px] mt-6">
                    <Link href="/">
                        <Image src={`/images/logo_mets-merveilles.png`} alt="Mets & Merveilles" width={200} height={200} className="w-full h-auto object-contain" />
                    </Link>
                </div>

                {/* Menu Desktop */}
                <nav className="hidden sm:flex items-center space-x-4">
                    {navLinks.map(({ href, label }) => (
                        <Button asChild variant="link" key={href} className="font-bold text-colors-titleGreen">
                            <Link href={href}>{label}</Link>
                        </Button>
                    ))}
                    {userId ? (
                        <>
                            {isAdmin && (
                                <Button asChild variant="link" className="font-bold text-colors-titleGreen">
                                    <Link href="/admin">Dashboard</Link>
                                </Button>
                            )}
                            <UserButton afterSwitchSessionUrl="/" />
                        </>
                    ) : (
                        <>
                            <Button asChild variant="link" className="font-bold text-colors-titleGreen">
                                <Link href="/sign-up">Sign up</Link>
                            </Button>
                            <Button asChild variant="link" className="font-bold text-colors-titleGreen">
                                <Link href="/sign-in">Sign in</Link>
                            </Button>
                        </>
                    )}
                </nav>

                {/* Bouton Menu Hamburger (Mobile) */}
                <button onClick={() => setIsOpen(true)} className="sm:hidden p-2 z-50">
                    <Menu size={28} />
                </button>

                {/* Overlay + Menu Mobile qui glisse depuis la droite */}
                <div className={`fixed inset-0 z-[60] transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                    {/* Overlay sombre */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Menu latéral avec animation */}
                    <div className={`fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-lg z-[70] transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                        <div className="flex flex-col items-center py-6 space-y-4">
                            {/* Bouton de fermeture */}
                            <button onClick={() => setIsOpen(false)} className="self-end p-4">
                                <X size={28} />
                            </button>

                            {navLinks.map(({ href, label }) => (
                                <Link key={href} href={href} className="py-3 text-lg font-semibold" onClick={() => setIsOpen(false)}>
                                    {label}
                                </Link>
                            ))}
                            {userId ? (
                                <>
                                    {isAdmin && <Link href="/admin" className="py-3 text-lg font-semibold" onClick={() => setIsOpen(false)}>Dashboard</Link>}
                                    <div className="py-3">
                                        <UserButton afterSwitchSessionUrl="/" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link href="/sign-up" className="py-3 text-lg font-semibold" onClick={() => setIsOpen(false)}>Sign up</Link>
                                    <Link href="/sign-in" className="py-3 text-lg font-semibold" onClick={() => setIsOpen(false)}>Sign in</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
}
