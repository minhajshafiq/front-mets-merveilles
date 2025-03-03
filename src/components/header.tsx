"use client";

import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {UserButton} from "@clerk/nextjs";
import Container from "./container";
import {checkRole} from "@/lib/roles.ts";
import Image from "next/image";
import {Menu, X, ShoppingCart, Trash2} from "lucide-react";
import {useCart} from "@/components/context/CartContext";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {usePathname} from "next/navigation";

interface HeaderProps {
    userId: string | null;
}

export default function Header({userId}: Readonly<HeaderProps>) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const {cartItems, removeFromCart, updateCartItemQuantity} = useCart();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        if (userId) {
            checkRole().then(setIsAdmin);
        }

        // Fonction pour gérer le scroll
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsSticky(true); // Ajouter la classe "sticky" si l'utilisateur a scrollé
            } else {
                setIsSticky(false); // Retirer la classe "sticky" si l'utilisateur est tout en haut
            }
        };

        // Attacher l'écouteur d'événement de scroll
        window.addEventListener("scroll", handleScroll);

        // Nettoyer l'écouteur d'événements au démontage du composant
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [userId]);

    useEffect(() => {
        if (isOpen) {
            // Désactiver le scroll sur le body
            document.body.style.overflow = 'hidden';
        } else {
            // Réactiver le scroll sur le body
            document.body.style.overflow = 'auto';
        }

        // Nettoyage au démontage du composant
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    // Liste des liens du menu
    const navLinks = [
        {href: "/", label: "Accueil"},
        {href: "/menu", label: "Menu"},
        {href: "/about", label: "À propos"},
        {href: "/contact", label: "Contact"},
    ];

    // Fonction pour gérer l'ajustement de la quantité
    const handleQuantityChange = (itemId: number, type: "increase" | "decrease") => {
        updateCartItemQuantity(itemId, type === "increase" ? 1 : -1);
    };

    // Fonction pour supprimer un item du panier
    const handleRemoveItem = (itemId: number) => {
        removeFromCart(itemId);
    };

    // Vérifier si l'URL actuelle est l'une des pages où le panier doit être caché
    const isCartPage = pathname === "/cart";
    const isSignUpPage = pathname === "/sign-up";
    const isSignInPage = pathname === "/sign-in";

    const shouldShowCartIcon = !isCartPage && !isSignUpPage && !isSignInPage;

    return (
        <header
            className={`w-full h-200 z-50 transition-all ${isSticky ? 'fixed top-0 left-0 bg-white shadow-lg' : ''}`}>
            <Container className="relative px-4 sm:px-6 lg:px-12 flex h-16 align items-center justify-between">
                <div className="max-w-[100px] md:max-w-[120px]">
                    <Link href="/">
                        <Image src={`/images/logo_mets-merveilles.png`} alt="Mets & Merveilles" width={200} height={200}
                               className="w-full h-full object-contain"/>
                    </Link>
                </div>

                {/* Menu Desktop */}
                <nav className="hidden sm:flex items-center space-x-3">
                    {navLinks.map(({href, label}) => (
                        <Button asChild variant="link" key={href} className="font-bold text-colors-titleGreen md:px-2">
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
                            <UserButton afterSwitchSessionUrl="/"/>
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

                    {/* Icône Panier avec Popover */}
                    {!isSignUpPage && !isSignInPage && !isCartPage && (
                        <Popover>
                            <PopoverTrigger className="relative">
                                <ShoppingCart size={28} className="text-colors-titleGreen"/>
                                {cartCount > 0 && (
                                    <span
                                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </PopoverTrigger>

                            <PopoverContent className="w-80 p-4 shadow-lg bg-white">
                                <h3 className="font-semibold text-lg mb-2">Panier</h3>
                                {cartItems.length > 0 ? (
                                    <div>
                                        {cartItems.map(item => (
                                            <div key={item.id}
                                                 className="flex justify-between gap-1 items-center mb-3 border-b pb-2">
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{item.name}</span>
                                                    <span className="text-sm text-gray-500">
                                                        €{item.price}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => handleQuantityChange(item.id, "decrease")}
                                                        className="text-sm px-2 py-1 border rounded-md"
                                                    >
                                                        -
                                                    </Button>

                                                    <span
                                                        className="text-sm font-semibold w-6 text-center">{item.quantity}</span>

                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => handleQuantityChange(item.id, "increase")}
                                                        className="text-sm px-2 py-1 border rounded-md"
                                                    >
                                                        +
                                                    </Button>

                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="text-sm text-red-500 px-2 py-1 border border-red-500 rounded-md hover:bg-red-500 hover:text-white group"
                                                    >
                                                        <Trash2 size={16}
                                                                className="text-red-500 group-hover:text-white"/>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="mt-4 text-center">
                                            <Link href="/cart" className="text-blue-600 font-semibold">
                                                Voir mon panier
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500">Votre panier est vide.</p>
                                )}
                            </PopoverContent>
                        </Popover>
                    )}
                </nav>

                {/* Bouton Menu Hamburger (Mobile) */}
                <button onClick={() => setIsOpen(true)} className="sm:hidden p-2 z-50">
                    <Menu size={28}/>
                </button>

                {/* Overlay + Menu Mobile qui glisse depuis la droite */}
                <div
                    className={`fixed inset-0 z-[60] transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                    {/* Overlay sombre */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Menu latéral avec animation */}
                    <div
                        className={`fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-lg z-[70] transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                        <div className="flex flex-col items-center py-6 space-y-4">
                            {/* Bouton de fermeture */}
                            <button onClick={() => setIsOpen(false)} className="self-end p-4">
                                <X size={28}/>
                            </button>

                            {navLinks.map(({href, label}) => (
                                <Link key={href} href={href} className="py-3 text-lg font-semibold"
                                      onClick={() => setIsOpen(false)}>
                                    {label}
                                </Link>
                            ))}
                            {userId ? (
                                <>
                                    {isAdmin && <Link href="/admin" className="py-3 text-lg font-semibold"
                                                      onClick={() => setIsOpen(false)}>Dashboard</Link>}
                                    <div className="py-3">
                                        <UserButton afterSwitchSessionUrl="/"/>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link href="/sign-up" className="py-3 text-lg font-semibold"
                                          onClick={() => setIsOpen(false)}>Sign up</Link>
                                    <Link href="/sign-in" className="py-3 text-lg font-semibold"
                                          onClick={() => setIsOpen(false)}>Sign in</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Icône Panier Fixe sur Mobile */}
                {shouldShowCartIcon && cartCount > 0 &&  (
                    <Link
                        href="/cart"
                        className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center sm:hidden z-50"
                    >
                        <ShoppingCart size={28} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {cartCount}
                        </span>
                    </Link>
                )}
            </Container>
        </header>
    );
}
