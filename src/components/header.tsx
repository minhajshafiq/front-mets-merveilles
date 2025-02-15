import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Container from "./container";
import {checkRole} from "@/lib/roles.ts";
import Image from "next/image";

interface HeaderProps {
    userId: string | null;
}

const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/menu", label: "Menu" },
    { href: "/order", label: "Commande" },
    { href: "/about", label: "À propos" },
    { href: "/contact", label: "Contact" }
];

export default async function Header({ userId }: Readonly<HeaderProps>) {
    return (
        <header className={cn("w-full z-50 transition hidden sm:block")}>
            <Container className="relative px-4 sm:px-6 lg:px-12 flex h-16 items-center justify-between">
                <div className="max-w-[150px] mt-6">
                    <Image
                        src={`/images/logo_mets-merveilles.png`}
                        alt="Mets & Merveilles"
                        width={200}
                        height={200}
                        className="w-full h-auto object-contain"
                    />
                </div>
                <nav className="flex items-center space-x-4">
                    {navLinks.map(({ href, label }) => (
                        <Button asChild variant="link" className={"font-bold"} key={href}>
                            <Link href={href}>{label}</Link>
                        </Button>
                    ))}
                    {userId ? (
                        <>
                            {await checkRole('admin') && (
                                <Button asChild variant="link" className={"font-bold"}>
                                    <Link href="/admin">Dashboard</Link>
                                </Button>
                            )}
                            <UserButton afterSwitchSessionUrl="/" />
                        </>
                    ) : (
                        <div className="flex items-center space-x-2 ml-4">
                            <Button asChild variant="link">
                                <Link href="/sign-up">Sign up</Link>
                            </Button>
                            <Button asChild variant="link">
                                <Link href="/sign-in">Sign in</Link>
                            </Button>
                        </div>
                    )}
                </nav>
            </Container>
        </header>
    );
}

