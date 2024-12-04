import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Container from "./container";

interface HeaderProps {
    userId: string | null;
}

export default function Header({ userId }: HeaderProps) {
    return (
        <header className={cn("w-full z-50 transition")}>
            <Container className="relative px-4 sm:px-6 lg:px-12 flex h-16 items-center justify-between">
                <div className="text-2xl font-bold">Mets & Merveilles</div>
                <nav className="flex items-center space-x-4">
                    {["/", "/menu", "/order", "/about", "/contact"].map((href, index) => (
                        <Button asChild variant="ghost" key={index}>
                            <Link href={href}>
                                {href === "/" ? "Accueil" : href.replace("/", "").charAt(0).toUpperCase() + href.slice(2)}
                            </Link>
                        </Button>
                    ))}
                    {userId ? (
                        <UserButton afterSwitchSessionUrl="/" />
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
