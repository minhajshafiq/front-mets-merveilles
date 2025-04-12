"use client";

import {useCart} from "@/components/context/CartContext";
import {Button} from "@/components/ui/button";
import {Trash2, User, UserPlus} from "lucide-react";
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function CartPage() {
    const {cartItems, removeFromCart, updateCartItemQuantity} = useCart();
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

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

    // Gérer le passage à la caisse
    const handleCheckout = () => {
        setShowModal(true);
    };

    // Navigation selon le choix de l'utilisateur
    const handleAccountChoice = (createAccount: boolean) => {
        setShowModal(false);
        if (createAccount) {
            router.push("/signup?redirect=checkout");
        } else {
            router.push("/checkout");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 relative">
            <h1 className="text-2xl font-semibold mb-6">Votre Panier</h1>

            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border-b py-4">
                            <div className="flex items-center">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 object-cover mr-4"
                                />
                                <div>
                                    <span className="font-medium">{item.name}</span>
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                    <p className="text-sm text-gray-500">{item.price} x {item.quantity}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="link"
                                    onClick={() => handleQuantityChange(item.id, "decrease")}
                                    className="text-sm transition-transform transform hover:scale-110 hover:text-red-500 border border-gray-300 rounded-md px-2 py-1 shadow-sm hover:shadow-md"
                                >
                                    -
                                </Button>

                                <span className="text-sm font-semibold">{item.quantity}</span>

                                <Button
                                    variant="link"
                                    onClick={() => handleQuantityChange(item.id, "increase")}
                                    className="text-sm transition-transform transform hover:scale-110 hover:text-green-500 border border-gray-300 rounded-md px-2 py-1 shadow-sm hover:shadow-md"
                                >
                                    +
                                </Button>

                                <Button
                                    variant="ghost"
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-sm text-red-500 px-2 py-1 border border-red-500 rounded-md hover:bg-red-500 hover:text-white group flex items-center"
                                >
                                    <Trash2 size={16} className="text-red-500 group-hover:text-white"/>
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
                        <Button
                            variant="default"
                            className="px-6 py-2 text-white bg-green-500 hover:bg-green-600"
                            onClick={handleCheckout}
                        >
                            Passer à la caisse
                        </Button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Votre panier est vide.</p>
            )}

            {/* Modal de création de compte */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl transform transition-all">
                        <h3 className="text-xl font-semibold mb-4 text-center">Créer un compte ?</h3>
                        <p className="text-gray-600 mb-6 text-center">
                            Souhaitez-vous créer un compte pour faciliter vos prochaines commandes ?
                        </p>
                        <div className="flex flex-col space-y-3">
                            <Button
                                onClick={() => handleAccountChoice(true)}
                                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg flex items-center justify-center"
                            >
                                <UserPlus size={18} className="mr-2"/>
                                Créer un compte
                            </Button>
                            <Button
                                onClick={() => handleAccountChoice(false)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg flex items-center justify-center"
                            >
                                <User size={18} className="mr-2"/>
                                Continuer en tant qu&#39;invité
                            </Button>
                            <Button
                                onClick={() => setShowModal(false)}
                                variant="ghost"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Annuler
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}