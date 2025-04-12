"use client";
// Importer les dépendances nécessaires
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";

// Définir le type pour les éléments du panier
interface MenuItem {
    id: number;
    name: string;
    category: string;
    image: string;
    description: string;
    price: string;
    quantity: number;
}

// Définir le type pour le contexte du panier
interface CartContextType {
    cartItems: MenuItem[];
    addToCart: (menu: MenuItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    updateCartItemQuantity: (id: number, quantity: number) => void; // Nouvelle méthode pour mettre à jour la quantité
}

// Créer le contexte avec un type
const CartContext = createContext<CartContextType | undefined>(undefined);

// Créer un fournisseur pour le CartContext
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<MenuItem[]>([]);

    // Charger le panier depuis le localStorage au démarrage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                if (Array.isArray(parsedCart)) {
                    setCartItems(parsedCart);
                }
            } catch (error) {
                console.error("Erreur lors du chargement du panier depuis le localStorage:", error);
            }
        }
    }, []);

    // Ajouter un produit au panier
    const addToCart = (menu: MenuItem) => {
        setCartItems(prevCart => {
            const existingItem = prevCart.find(item => item.id === menu.id);
            let updatedCart;

            if (existingItem) {
                // Si l'article existe, on augmente sa quantité
                updatedCart = prevCart.map(item =>
                    item.id === menu.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Sinon, on l'ajoute avec une quantité de 1
                updatedCart = [...prevCart, { ...menu, quantity: 1 }];
            }

            // Sauvegarde dans le localStorage
            try {
                localStorage.setItem('cart', JSON.stringify(updatedCart)); // Sauvegarde
            } catch (error) {
                console.error("Erreur lors de la sauvegarde du panier dans le localStorage:", error);
            }

            return updatedCart;
        });
    };

    // Supprimer un produit du panier
    const removeFromCart = (id: number) => {
        setCartItems(prevCart => {
            const updatedCart = prevCart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    // Vider le panier
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    // Mettre à jour la quantité d'un produit dans le panier
    const updateCartItemQuantity = (id: number, change: number) => {
        setCartItems(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };


    // Utiliser useMemo pour mémoriser l'objet du contexte
    const value = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItemQuantity // Ajout de la méthode à la valeur du contexte
    }), [cartItems]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Hook pour utiliser le contexte
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
