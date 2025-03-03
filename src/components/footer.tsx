import { CircleUserRound  } from 'lucide-react';
import Image from 'next/image';
import Container from './container';
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="px-7 py-4 text-center text-sm mt-auto bg-white">
            <Container>
                <div className="flex flex-row justify-center items-center gap-8 px-4 md:px-12">
                    {/* Section Menu */}
                    <div className="flex flex-col items-center gap-2">
                        <h2 className="text-lg font-semibold">Menu</h2>
                        <p className="text-neutral-600">Accueil</p>
                        <p className="text-neutral-600">Menu</p>
                        <p className="text-neutral-600">À Propos</p>
                        <p className="text-neutral-600">Contact</p>
                        <Link href={"/sign-up"}>
                            <CircleUserRound className="w-5 h-5 mt-4 text-neutral-700"/>
                        </Link>
                        <p className="text-neutral-600 mt-4">+33 1 23 45 57 89</p>
                    </div>

                    {/* Section Aide */}
                    <div className="flex flex-col items-center gap-2">
                        <h2 className="text-lg font-semibold">Aide</h2>
                        <p className="text-neutral-600">Confidentialité</p>
                        <p className="text-neutral-600">Conditions générales</p>
                        <p className="text-neutral-600">Politique</p>
                        <p className="text-neutral-600">Mentions légales</p>
                        <div className="flex justify-center gap-2 mt-4">
                            <Image src="/images/paypal.svg" width={20} height={20} alt="Paypal Logo" className="w-5 h-5" />
                            <Image src="/images/visa.svg" width={20} height={20} alt="Visa Logo" className="w-5 h-5" />
                            <Image src="/images/mastercard.svg" width={20} height={20} alt="Mastercard Logo" className="w-5 h-5" />
                        </div>
                        <p className="text-neutral-600 mt-4">infor@metsetmerveilles.com</p>
                    </div>
                </div>

                {/* Ligne de séparation */}
                <div className="border-t border-neutral-900 my-6 w-full" />

                {/* Copyright & Réseaux sociaux */}
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-neutral-900 text-xs">© 2025 Mets & Merveilles. All rights reserved</p>
                    <div className="flex gap-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <Image src="/images/facebook.svg" width={20} height={20} alt="Facebook Logo" className="w-5 h-5" />
                        </a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                            <Image src="/images/x.svg" width={20} height={20} alt="X Logo" className="w-5 h-5" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <Image src="/images/instagram.svg" width={20} height={20} alt="Instagram Logo" className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

