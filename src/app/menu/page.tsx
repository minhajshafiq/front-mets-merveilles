'use client';
import { Search, Plus } from 'lucide-react';
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MenuPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showNavbar, setShowNavbar] = useState(false);

    const categories = ["Entrées", "Plats", "Desserts", "Boissons"];
    const menus = [
        { id: 1, name: "Pizza Margherita", category: "Plats", image: "/images/pizza.jpg", description: "Tomate, mozzarella, basilic frais", price: "19$" },
        { id: 2, name: "Pâtes Carbonara", category: "Plats", image: "/images/pates.jpg", description: "Crème, lardons, parmesan", price: "18.50€" },
        { id: 3, name: "Tiramisu", category: "Desserts", image: "/images/tiramisu.jpg", description: "Dessert italien au mascarpon", price: "7.99€" },
        { id: 4, name: "Salade César", category: "Boissons", image: "/images/salade.jpg", description: "Poulet, croûtons, sauce César", price: "4.50€" },
    ];

    const filteredMenus = menus.filter(
        (menu) =>
            menu.name.toLowerCase().includes(search.toLowerCase()) &&
            (selectedCategory ? menu.category === selectedCategory : true)
    );

    const handleScroll = () => {
        setShowNavbar(window.scrollY > 50);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen px-8">
            {showNavbar && (
                <div className="fixed top-0 left-0 w-full backdrop-blur-md bg-opacity-70 shadow-md p-4 z-50">
                    <div className="max-w-5xl mx-auto flex justify-between items-center">
                        <h1 className="text-xl font-semibold">Menus</h1>
                        <Button>Contact</Button>
                    </div>
                </div>
            )}

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
                    <div className="flex overflow-x-auto">
                        <Button
                            variant={selectedCategory === "" ? "ghost" : "link"}
                            onClick={() => setSelectedCategory("")}
                            className={`text-sm px-3 ${selectedCategory === "" ? "font-bold" : "border-0"}`}
                        >
                            Toutes
                        </Button>
                        {categories.map((category) => (
                            <Button
                                className={`text-sm px-3 ${selectedCategory === category ? "font-bold" : "border-0"}`}
                                key={category}
                                variant={selectedCategory === category ? "ghost" : "link"}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3">
                    {filteredMenus.map((menu) => (
                        <div key={menu.id} className="relative rounded-lg overflow-hidden shadow-lg">
                            <div className="h-[200px] w-full relative">
                                <Image src={menu.image} alt={menu.name} fill className="object-cover" />
                                <div className="absolute inset-0 bg-black opacity-40"></div>
                                <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1 cursor-pointer shadow-md hover:bg-white transition">
                                    <Plus size={20} className="text-gray-700" />
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
            </div>
        </div>
    );
}
