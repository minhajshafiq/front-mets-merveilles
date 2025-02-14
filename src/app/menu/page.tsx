'use client'
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
        { id: 1, name: "Menu 1", category: "Entrées", image: "/images/plat.jpg", description: "Délicieuse entrée aux saveurs méditerranéennes.", price: "12.99€" },
        { id: 2, name: "Menu 2", category: "Plats", image: "/images/plat.jpg", description: "Un plat principal généreux et savoureux.", price: "18.50€" },
        { id: 3, name: "Menu 3", category: "Desserts", image: "/images/plat.jpg", description: "Un dessert gourmand pour finir en beauté.", price: "7.99€" },
        { id: 4, name: "Menu 4", category: "Boissons", image: "/images/plat.jpg", description: "Une boisson rafraîchissante pour accompagner votre repas.", price: "4.50€" },
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
            {showNavbar && (
                <div className="fixed top-0 left-0 w-full backdrop-blur-md bg-opacity-70 shadow-md p-4 z-50">
                    <div className="max-w-5xl mx-auto flex justify-between items-center">
                        <h1 className="text-xl font-semibold">Menus</h1>
                        <Button>Contact</Button>
                    </div>
                </div>
            )}

            <div className="max-w-5xl mx-auto py-10 space-y-6">
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

                    <main className="flex-1 ml-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredMenus.map((menu) => (
                                <div key={menu.id}
                                     className="relative rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1">
                                    <div className="h-[250px] w-full min-w-[350px] relative">
                                        <Image src={menu.image} alt={menu.name} fill
                                               className="object-cover rounded-lg group-hover:opacity-80 transition-opacity duration-300"/>
                                        <div
                                            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-3 rounded-lg">
                                            <h2 className="text-lg font-bold text-white">{menu.name}</h2>
                                            <p className="text-xs text-gray-300 mt-1">{menu.description}</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-white/100 backdrop-blur-md p-1 rounded-lg mt-2">
                                        <div className="flex items-center justify-center space-x-4">
                                            <p className="text-md font-semibold text-green-600">{menu.price}</p>
                                            <Button variant="ghost" className="w-full max-w-[200px] text-md">
                                                Ajouter au panier
                                            </Button>
                                        </div>
                                    </div>
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
