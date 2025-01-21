import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/order(.*)'])

export default clerkMiddleware(async (auth, req) => {
    // Attends que l'authentification soit vérifiée
    const { userId } = await auth()

    if (isProtectedRoute(req) && !userId) {
        // Redirige les utilisateurs non authentifiés vers la page de connexion
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/sign-in',
            },
        })
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
