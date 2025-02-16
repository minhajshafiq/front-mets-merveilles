import { auth } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";

export async function GET() {
    const { sessionClaims } = await auth();

    // Vérifie que l'utilisateur est connecté
    if (!sessionClaims) {
        return NextResponse.json({ isAdmin: false });
    }

    // Vérifie si l'utilisateur a le rôle admin
    const isAdmin = sessionClaims?.metadata?.role === "admin";

    return NextResponse.json({ isAdmin });
}
