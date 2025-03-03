"use client";

import { useCart } from "@/components/context/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
    const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();

    // Calculer le total du panier
    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

    // Fonction pour gérer l'ajustement de la quantité
    const handleQuantityChange = (itemId: number, type: "increase" | "decrease") => {
        if (type === "increase") {
            updateCartItemQuantity(itemId, 1);
        } else if (type === "decrease") {
            updateCartItemQuantity(itemId, -1);
        }
    };

    // Fonction pour supprimer un item du panier
    const handleRemoveItem = (itemId: number) => {
        removeFromCart(itemId);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">Votre Panier</h1>

            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border-b py-4">
                            <div className="flex items-center">
                                <Image src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                                <div>
                                    <span className="font-medium">{item.name}</span>
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                    <p className="text-sm text-gray-500">€{item.price} x {item.quantity}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="link"
                                    onClick={() => handleQuantityChange(item.id, "increase")}
                                    className="text-sm transition-transform transform hover:scale-110 hover:text-green-500 border border-gray-300 rounded-md px-2 py-1 shadow-sm hover:shadow-md"
                                >
                                    +
                                </Button>

                                <span className="text-sm font-semibold">{item.quantity}</span>

                                <Button
                                    variant="link"
                                    onClick={() => handleQuantityChange(item.id, "decrease")}
                                    className="text-sm transition-transform transform hover:scale-110 hover:text-red-500 border border-gray-300 rounded-md px-2 py-1 shadow-sm hover:shadow-md"
                                >
                                    -
                                </Button>

                                <Button
                                    variant="ghost"
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-sm text-red-500 px-2 py-1 border border-red-500 rounded-md hover:bg-red-500 hover:text-white group flex items-center"
                                >
                                    <Trash2 size={16} className="text-red-500 group-hover:text-white" />
                                    <span className="hidden sm:inline ml-2">Supprimer</span>
                                </Button>
                            </div>
                        </div>
                    ))}

                    <div className="mt-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Total</h2>
                            <p className="text-lg">€{totalPrice.toFixed(2)}</p>
                        </div>
                        <Link href="/checkout">
                            <Button variant="default" className="px-6 py-2 text-white bg-green-500">
                                Passer à la caisse
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Votre panier est vide.</p>
            )}
        </div>
    );
}
