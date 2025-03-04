import { NextResponse } from "next/server";

export async function GET() {
    const baseUrl = 'https://back-mets-merveilles-production.up.railway.app';
    const url = `${baseUrl}/starter`;

    try {
        console.log('Fetching starters from:', url);
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response not ok:', response.status, errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Starters received:', data);
        return NextResponse.json(data);

    } catch (error) {
        console.error('Detailed error:', error);
        return NextResponse.json({
            error: 'Impossible de charger les starters. Veuillez réessayer plus tard.',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}