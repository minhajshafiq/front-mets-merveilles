import { NextResponse } from 'next/server';

// Dummy database (remplace avec ta logique réelle, comme une base de données ou un ORM)
const menuItems: any[] = [];

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, name, price, description } = body;

        // Validation simple
        if (!type || !name || !price || !description) {
            return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
        }

        // Ajouter l'élément au menu (exemple simple, remplace avec une base de données réelle)
        const newItem = { id: menuItems.length + 1, type, name, price, description };
        menuItems.push(newItem);

        return NextResponse.json({ message: 'Item ajouté avec succès.', item: newItem });
    } catch (error) {
        return NextResponse.json({ error: 'Erreur lors du traitement de la requête.' }, { status: 500 });
    }
}
