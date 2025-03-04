import {NextResponse} from "next/server";

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    category?: string;

    [key: string]: string | number | boolean | undefined;
}

interface MenuResponse {
    starters: MenuItem[];
    mainCourses: MenuItem[];
    desserts: MenuItem[];
    drinks: MenuItem[];
}

export async function GET() {
    const baseUrl = 'https://back-mets-merveilles-production.up.railway.app';
    const url = `${baseUrl}/menus`;

    try {
        console.log('Fetching menus from:', url);
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            },
            cache: 'no-store' // Ensure fresh data each time
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response not ok:', response.status, errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as MenuResponse;

        // Process all image URLs to ensure they have the full path
        // This ensures images work even if they're relative paths
        const processImageUrls = (items: MenuItem[]): MenuItem[] => {
            return items.map(item => {
                if (item.imageUrl && !item.imageUrl.startsWith('http')) {
                    item.imageUrl = `${baseUrl}${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`;
                }
                return item;
            });
        };

        // Process image URLs for each category
        if (data.starters) data.starters = processImageUrls(data.starters);
        if (data.mainCourses) data.mainCourses = processImageUrls(data.mainCourses);
        if (data.desserts) data.desserts = processImageUrls(data.desserts);
        if (data.drinks) data.drinks = processImageUrls(data.drinks);

        console.log('Menus received with processed images:', data);
        return NextResponse.json(data);

    } catch (error) {
        console.error('Detailed error:', error);
        return NextResponse.json({
            error: 'Impossible de charger les menus. Veuillez réessayer plus tard.',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {status: 500});
    }
}