import { NextResponse } from 'next/server';

// Définition du type pour un élément du menu
interface MenuItem {
    id: number;
    type: string;
    name: string;
    price: number;
    description: string;
}

const menuItems: MenuItem[] = [];

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, name, price, description } = body;

        if (!type || !name || !price || !description) {
            return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
        }

        const newItem: MenuItem = { id: menuItems.length + 1, type, name, price, description };
        menuItems.push(newItem);

        return NextResponse.json({ message: 'Item ajouté avec succès.', item: newItem });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Une erreur inconnue est survenue");
        }
        return NextResponse.json({ error: 'Erreur lors du traitement de la requête.' }, { status: 500 });
    }
}
