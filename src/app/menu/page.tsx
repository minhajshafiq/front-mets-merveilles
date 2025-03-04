'use client';
import { Search, Plus } from 'lucide-react';
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCart } from "@/components/context/CartContext";
import { toast } from "sonner";

// Définition du type pour un menu avec quantity
interface Menu {
    id: number;
    name: string;
    category: string;
    image: string;
    description: string;
    price: string;
    quantity: number;
}

interface StarterResponse {
    id: number;
    name: string;
    imageUrl?: string;
    description: string;
    price: number;
}

export default function MenuPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const { addToCart, cartItems } = useCart();
    const [starters, setStarters] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(false);

    const categories = ["Entrées", "Plats", "Desserts", "Boissons"];
    const defaultMenus: Menu[] = [
        { id: 1, name: "Pizza Margherita", category: "Plats", image: "/images/pizza.jpg", description: "Tomate, mozzarella, basilic frais", price: "19€", quantity: 1 },
        { id: 2, name: "Pâtes Carbonara", category: "Plats", image: "/images/pates.jpg", description: "Crème, lardons, parmesan", price: "18.50€", quantity: 1 },
        { id: 3, name: "Tiramisu", category: "Desserts", image: "/images/tiramisu.jpg", description: "Dessert italien au mascarpone", price: "7.99€", quantity: 1 },
        { id: 4, name: "Salade César", category: "Entrées", image: "/images/salade.jpg", description: "Poulet, croûtons, sauce César", price: "4.50€", quantity: 1 },
        { id: 5, name: "Coca-Cola", category: "Boissons", image: "/images/coca.jpg", description: "Boisson gazeuse", price: "2.50€", quantity: 1 },
    ];

    useEffect(() => {
        const fetchStarters = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/starter');
                if (!response.ok) throw new Error('Failed to fetch starters');
                const data = await response.json();
                console.log(data);

                const formattedStarters = data.map((starter: StarterResponse) => ({
                    id: starter.id,
                    name: starter.name,
                    category: "Entrées",
                    image: starter.imageUrl || "/images/default-starter.jpg",
                    description: starter.description,
                    price: `${starter.price}€`,
                    quantity: 1
                }));

                setStarters(formattedStarters);
            } catch (error) {
                console.error('Error fetching starters:', error);
                toast.error("Erreur lors du chargement des entrées");
            } finally {
                setLoading(false);
            }
        };

        fetchStarters();
    }, []);

    const allMenus = [...starters, ...defaultMenus.filter(menu => menu.category !== "Entrées")];

    // Filtrage des menus en fonction de la recherche et de la catégorie sélectionnée
    const filteredMenus = allMenus.filter(
        (menu) =>
            menu.name.toLowerCase().includes(search.toLowerCase()) &&
            (selectedCategory ? menu.category === selectedCategory : true)
    );

    // Fonction pour ajouter un élément au panier
    const handleAddToCart = (menu: Menu) => {
        const existingMenu = cartItems.find(item => item.id === menu.id);
        if (existingMenu) {
            existingMenu.quantity += 1;
        } else {
            addToCart({...menu, quantity: 1});
        }
        toast.success(`${menu.name} a été ajouté au panier !`);
    };

    return (
        <div className="min-h-screen px-8">
            <div className="max-w-5xl mx-auto py-10 space-y-6">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-full max-w-lg">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                        <Input
                            type="text"
                            placeholder="Rechercher un menu"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex overflow-x-auto space-x-2">
                        <Button
                            variant={selectedCategory === "" ? "ghost" : "link"}
                            onClick={() => setSelectedCategory("")}
                            className={`text-sm px-2 ${selectedCategory === "" ? "font-bold" : "border-0"}`}
                        >
                            Toutes
                        </Button>
                        {categories.map((category) => (
                            <Button
                                className={`text-sm px-2 ${selectedCategory === category ? "font-bold" : "border-0"}`}
                                key={category}
                                variant={selectedCategory === category ? "ghost" : "link"}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3">
                        {filteredMenus.map((menu) => (
                            <div key={menu.id} className="relative rounded-lg cursor-pointer overflow-hidden shadow-lg group">
                                <div className="h-[200px] w-full relative">
                                    <Image
                                        src={menu.image}
                                        alt={menu.name}
                                        fill
                                        className="object-cover transition-transform transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-40"></div>
                                    <div
                                        className="absolute top-1 right-1 rounded-full p-1 cursor-pointer shadow-md transition hover:bg-gray-700"
                                        onClick={() => handleAddToCart(menu)}
                                    >
                                        <Plus size={30} color="white"/>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full p-3 text-white flex justify-between items-end">
                                        <div>
                                            <h2 className="text-lg font-bold">{menu.name}</h2>
                                            <p className="text-sm">{menu.description}</p>
                                        </div>
                                        <p className="text-md font-semibold">{menu.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredMenus.length === 0 && (
                            <p className="text-center text-gray-500 col-span-full">Aucun menu trouvé.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
