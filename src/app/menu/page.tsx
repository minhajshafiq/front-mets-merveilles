"use client"

import {useState, useEffect, useMemo} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import {Search, Plus} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import {useCart} from "@/components/context/CartContext";
import {toast} from "sonner";
import Image from "next/image";

interface Menu {
    id: number;
    name: string;
    category: string;
    image: string;
    description: string;
    price: string;
    quantity: number;
}

interface MenusResponse {
    starters: MenuResponse[];
    mainCourses: MenuResponse[];
    desserts: MenuResponse[];
    drinks: MenuResponse[];
}

interface MenuResponse {
    id: number;
    name: string;
    category: string;
    imageUrl?: string;
    description: string;
    price: number;
}

const categories = ["Entrées", "Plats", "Desserts", "Boissons"];

// Map French category names to their corresponding English keys in the data
const categoryMapping: Record<string, string> = {
    "entrées": "starters",
    "plats": "mainCourses",
    "desserts": "desserts",
    "boissons": "drinks"
};

const fetchMenuData = async () => {
    try {
        const response = await fetch('/api/menus');
        if (!response.ok) throw new Error('Failed to fetch menus');
        const data: MenusResponse = await response.json();

        const formatMenus = (menus: MenuResponse[], category: string) => {
            return menus.map((item) => ({
                id: item.id,
                name: item.name,
                category: category,
                image: item.imageUrl ?? `/images/default-${category.toLowerCase()}.jpg`,
                description: item.description,
                price: `${item.price}€`,
                quantity: 1,
            }));
        };

        const starters = formatMenus(data.starters, 'Entrées');
        const mainCourses = formatMenus(data.mainCourses, 'Plats');
        const desserts = formatMenus(data.desserts, 'Desserts');
        const drinks = formatMenus(data.drinks, 'Boissons');

        return {starters, mainCourses, desserts, drinks};
    } catch (err) {
        console.error('Error loading menus:', err);
        toast.error('Erreur lors du chargement des menus');
        return {starters: [], mainCourses: [], desserts: [], drinks: []};
    }
};

export default function MenuPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const {addToCart, cartItems} = useCart();
    const [menus, setMenus] = useState({
        starters: [] as Menu[],
        mainCourses: [] as Menu[],
        desserts: [] as Menu[],
        drinks: [] as Menu[],
    });
    const [loading, setLoading] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const menusData = await fetchMenuData();
            setMenus(menusData);
            setLoading(false);
        };

        fetchData();
    }, []);

    // Memoize filtered menus based on search term
    const filteredMenus = useMemo(() => ({
        starters: menus.starters.filter(menu => menu.name.toLowerCase().includes(search.toLowerCase())),
        mainCourses: menus.mainCourses.filter(menu => menu.name.toLowerCase().includes(search.toLowerCase())),
        desserts: menus.desserts.filter(menu => menu.name.toLowerCase().includes(search.toLowerCase())),
        drinks: menus.drinks.filter(menu => menu.name.toLowerCase().includes(search.toLowerCase()))
    }), [menus, search]);

    // Memoize the displayed menus based on selected category
    const displayMenus = useMemo(() => {
        if (!selectedCategory) {
            return [
                ...filteredMenus.starters,
                ...filteredMenus.mainCourses,
                ...filteredMenus.desserts,
                ...filteredMenus.drinks
            ];
        }

        // Convert French category name to English data key
        const categoryKey = categoryMapping[selectedCategory.toLowerCase()];

        // Return the corresponding filtered menu array
        return categoryKey ? filteredMenus[categoryKey as keyof typeof filteredMenus] : [];
    }, [filteredMenus, selectedCategory]);

    const handleAddToCart = (menu: Menu) => {
        const existingMenu = cartItems.find(item => item.id === menu.id);
        if (existingMenu) {
            existingMenu.quantity += 1;
        } else {
            addToCart({...menu, quantity: 1});
        }
        toast.success(`${menu.name} a été ajouté au panier !`);
    };

    const handleViewDetails = (menu: Menu) => {
        setSelectedMenu(menu);
    };

    return (
        <div className="min-h-screen px-8">
            <div className="max-w-5xl mx-auto py-10 space-y-6">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-full max-w-lg">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20}/>
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
                                key={category}
                                className={`text-sm px-2 ${selectedCategory === category ? "font-bold" : "border-0"}`}
                                variant={selectedCategory === category ? "ghost" : "link"}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-12">
                        {[...Array(8)].map((_, i) => (
                            <Skeleton key={i} className="w-full h-[200px] rounded-md"/>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3">
                        {displayMenus.map((menu) => (
                            <div
                                key={menu.id}
                                className="relative rounded-lg cursor-pointer overflow-hidden shadow-lg group"
                                onClick={() => handleViewDetails(menu)}
                            >
                                <div className="h-[200px] w-full relative">
                                    <Image
                                        src={menu.image}
                                        alt={menu.name}
                                        fill
                                        className="object-cover transition-transform transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-40"></div>
                                    <button
                                        className="absolute top-1 right-1 rounded-full p-1 cursor-pointer shadow-md transition hover:bg-gray-700 bg-transparent border-0"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(menu);
                                        }}
                                        aria-label={`Ajouter ${menu.name} au panier`}
                                    >
                                        <Plus size={30} color="white"/>
                                    </button>
                                    <div
                                        className="absolute bottom-0 left-0 w-full p-3 text-white flex justify-between items-end">
                                        <div>
                                            <h2 className="text-lg font-bold">{menu.name}</h2>
                                            <p className="text-sm">{menu.description}</p>
                                        </div>
                                        <p className="text-md font-semibold">{menu.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {displayMenus.length === 0 && (
                            <p className="text-center text-gray-500 col-span-full">Aucun menu trouvé.</p>
                        )}
                    </div>
                )}
                {selectedMenu && (
                    <Dialog open={!!selectedMenu} onOpenChange={() => setSelectedMenu(null)}>
                        <DialogContent className="max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>{selectedMenu.name}</DialogTitle>
                            </DialogHeader>
                            {/* On mobile: stack vertically (image, content, buttons) */}
                            {/* On desktop: image left (2/5), content right (3/5) */}
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Image - full width on mobile */}
                                <div className="w-full md:w-2/5">
                                    <Image
                                        src={selectedMenu.image}
                                        alt={selectedMenu.name}
                                        width={400}
                                        height={300}
                                        className="object-cover rounded-lg w-full h-auto"
                                        priority={true}
                                        loading="eager"
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                    />
                                </div>

                                {/* Content area - full width on mobile */}
                                <div className="w-full md:w-3/5 flex flex-col">
                                    <DialogDescription className="mb-4">{selectedMenu.description}</DialogDescription>
                                    <p className="text-lg font-semibold mb-2">Prix: {selectedMenu.price}</p>
                                </div>
                            </div>

                            {/* Buttons - always at bottom and side by side */}
                            <div className="flex gap-2 justify-center mt-4">
                                <Button variant="outline" onClick={() => setSelectedMenu(null)}>
                                    Fermer
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleAddToCart(selectedMenu);
                                        setSelectedMenu(null);
                                    }}
                                >
                                    Ajouter au panier
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
}