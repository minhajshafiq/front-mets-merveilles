'use client'

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MenuPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showNavbar, setShowNavbar] = useState(false);

    const categories = ["Entrées", "Plats", "Desserts", "Boissons"];
    const menus = [
        { id: 1, name: "Menu 1", category: "Entrées" },
        { id: 2, name: "Menu 2", category: "Plats" },
        { id: 3, name: "Menu 3", category: "Desserts" },
        { id: 4, name: "Menu 4", category: "Boissons" },
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
        <div className="min-h-screen">
            {/* Barre de navigation qui apparaît au scroll */}
            {showNavbar && (
                <div className="fixed top-0 left-0 w-full backdrop-blur-md bg-opacity-70 shadow-md p-4 z-50">
                    <div className="max-w-5xl mx-auto flex justify-between items-center">
                        <h1 className="text-xl font-semibold">Menus</h1>
                        <Button>Contact</Button>
                    </div>
                </div>
            )}

            <div className="max-w-5xl mx-auto py-10 space-y-6">
                {/* Barre de recherche */}
                <div className="flex justify-center">
                    <Input
                        type="text"
                        placeholder="Rechercher un menu"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-lg"
                    />
                </div>

                <div className="flex">
                    {/* Filtre par catégories */}
                    <aside className="w-1/4 bg-white rounded shadow-md p-4">
                        <h2 className="text-lg font-semibold mb-4">Catégories</h2>
                        <ul className="space-y-2">
                            <li>
                                <Button
                                    variant={selectedCategory === "" ? "default" : "outline"}
                                    onClick={() => setSelectedCategory("")}
                                    className="w-full"
                                >
                                    Toutes
                                </Button>
                            </li>
                            {categories.map((category) => (
                                <li key={category}>
                                    <Button
                                        variant={selectedCategory === category ? "default" : "outline"}
                                        onClick={() => setSelectedCategory(category)}
                                        className="w-full"
                                    >
                                        {category}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Liste des menus */}
                    <main className="flex-1 ml-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredMenus.map((menu) => (
                                <div
                                    key={menu.id}
                                    className="bg-white rounded shadow-md p-4 text-center"
                                >
                                    <h3 className="text-lg font-semibold">{menu.name}</h3>
                                    <p className="text-sm text-gray-500">{menu.category}</p>
                                </div>
                            ))}
                            {filteredMenus.length === 0 && (
                                <p className="text-center text-gray-500 col-span-full">
                                    Aucun menu trouvé.
                                </p>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
