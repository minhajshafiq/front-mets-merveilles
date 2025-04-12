"use client";

import { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";

export default function StripeProvider({ children }: Readonly<{ children: ReactNode }>) {
    const stripePromise = getStripe();

    return <Elements stripe={stripePromise}>{children}</Elements>;
}