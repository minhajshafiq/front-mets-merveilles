import {NextRequest, NextResponse} from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-03-31.basil',
});

export async function POST(request: NextRequest) {
    try {
        const {amount, customerDetails} = await request.json();

        // Créer un PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur',
            metadata: {customerDetails: JSON.stringify(customerDetails)},
        });

        return NextResponse.json({clientSecret: paymentIntent.client_secret});
    } catch (error) {
        console.error('Erreur lors de la création du payment intent:', error);
        return NextResponse.json(
            {message: 'Erreur serveur interne'},
            {status: 500}
        );
    }
}