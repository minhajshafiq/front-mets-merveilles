"use client";

import {useState} from "react";
import {useCart} from "@/components/context/CartContext";
import {useRouter} from "next/navigation";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {Button} from "@/components/ui/button";
import {motion} from "framer-motion";
import {Input} from "@/components/ui/input";
import {Check, Send} from "lucide-react";

// Composant pour les messages d'erreur
const ErrorMessage = ({message}: { message: string }) => (
    <p className="text-red-500 text-xs mt-1">{message}</p>
);

export default function CheckoutPage() {
    const {cartItems, clearCart} = useCart();
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
        country: "France"
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
        country: ""
    });

    // Calculer le total du panier
    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

    // Validation des champs
    const validateField = (name: string, value: string) => {
        let error = "";

        switch (name) {
            case "firstName":
            case "lastName":
                error = value.length < 2 ? "Doit contenir au moins 2 caractères" : "";
                break;
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                error = !emailRegex.test(value) ? "Format d'email invalide" : "";
                break;
            case "phone":
                const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
                error = !phoneRegex.test(value.replace(/\s/g, "")) ? "Format de téléphone invalide" : "";
                break;
            case "zipCode":
                const zipCodeRegex = /^[0-9]{5}$/;
                error = !zipCodeRegex.test(value) ? "Code postal invalide" : "";
                break;
            case "address":
            case "city":
                error = value.length < 3 ? "Champ trop court" : "";
                break;
        }

        setErrors(prev => ({
            ...prev,
            [name]: error
        }));

        return !error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        validateField(name, value);
    };

    const isFormValid = () => {
        return Object.values(formData).every(val => val.length > 0) &&
            Object.values(errors).every(err => err === "");
    };

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid() || !stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);
        setPaymentError(null);

        try {
            // Créer un intent de paiement côté Stripe
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: Math.round(totalPrice * 100),
                    customerDetails: formData,
                }),
            });

            const {clientSecret} = await response.json();

            // Confirmer le paiement avec Stripe
            const {error, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        phone: formData.phone,
                        address: {
                            line1: formData.address,
                            city: formData.city,
                            postal_code: formData.zipCode,
                            country: 'FR',
                        },
                    },
                },
            });

            if (error) {
                setPaymentError(error.message || "Erreur de paiement");
                setIsProcessingPayment(false);
            } else if (paymentIntent.status === 'succeeded') {
                clearCart();
                setIsSubmitted(true);
                setTimeout(() => {
                    router.push("/confirmation");
                }, 2000);
            }
        } catch (err) {
            setPaymentError("Une erreur est survenue lors du paiement");
            setIsProcessingPayment(false);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
                duration: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: {y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
            transition: {duration: 0.5}
        }
    };

    const formFieldVariants = {
        hidden: {x: -10, opacity: 0},
        visible: {
            x: 0,
            opacity: 1,
            transition: {duration: 0.3}
        }
    };

    const successVariants = {
        hidden: {scale: 0.8, opacity: 0},
        visible: {
            scale: 1,
            opacity: 1,
            transition: {duration: 0.5}
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl text-colors-titleGreen font-semibold mb-6">Votre panier est vide</h1>
                <p className="mb-4">Ajoutez des articles à votre panier avant de finaliser votre commande.</p>
                <Button
                    onClick={() => router.push("/menu")}
                    className="bg-green-500 hover:bg-green-600 text-white"
                >
                    Découvrir notre menu
                </Button>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-2xl text-colors-titleGreen font-semibold mb-6">Finaliser votre commande</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Résumé de la commande */}
                <motion.div
                    className="md:w-1/3 bg-gray-50 p-6 rounded-lg h-min shadow-sm"
                    initial={{opacity: 0, x: -20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.5}}
                >
                    <h2 className="text-lg font-semibold mb-4">Résumé de votre commande</h2>
                    <div className="space-y-3">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between">
                                <span>{item.name} x {item.quantity}</span>
                                <span
                                    className="font-medium">€{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="pt-3 mt-3 border-t border-gray-200">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>€{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Formulaire et paiement */}
                <motion.div
                    className="md:w-2/3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {!isSubmitted ? (
                        <motion.form
                            onSubmit={handleSubmit}
                            className="bg-white p-6 rounded-lg shadow-sm"
                            variants={containerVariants}
                        >
                            <motion.h2
                                className="text-lg font-semibold mb-4 text-colors-titleGreen"
                                variants={itemVariants}
                            >
                                Informations de livraison
                            </motion.h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <motion.div variants={formFieldVariants}>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Prénom
                                    </label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        placeholder="Prénom"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`transition-all focus:ring-2 ${errors.firstName ? 'border-red-500 focus:ring-red-200' : 'focus:border-green-500 focus:ring-green-200'}`}
                                    />
                                    {errors.firstName && <ErrorMessage message={errors.firstName}/>}
                                </motion.div>

                                <motion.div variants={formFieldVariants}>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nom
                                    </label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        required
                                        placeholder="Nom"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`transition-all focus:ring-2 ${errors.lastName ? 'border-red-500 focus:ring-red-200' : 'focus:border-green-500 focus:ring-green-200'}`}
                                    />
                                    {errors.lastName && <ErrorMessage message={errors.lastName}/>}
                                </motion.div>

                                <motion.div variants={formFieldVariants}>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`transition-all focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'focus:border-green-500 focus:ring-green-200'}`}
                                    />
                                    {errors.email && <ErrorMessage message={errors.email}/>}
                                </motion.div>

                                <motion.div variants={formFieldVariants}>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Téléphone
                                    </label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        placeholder="Téléphone (ex: 0612345678)"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`transition-all focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'focus:border-green-500 focus:ring-green-200'}`}
                                    />
                                    {errors.phone && <ErrorMessage message={errors.phone}/>}
                                </motion.div>

                                <motion.div variants={formFieldVariants} className="md:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                        Adresse
                                    </label>
                                    <Input
                                        id="address"
                                        name="address"
                                        type="text"
                                        required
                                        placeholder="Adresse complète"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className={`transition-all focus:ring-2 ${errors.address ? 'border-red-500 focus:ring-red-200' : 'focus:border-green-500 focus:ring-green-200'}`}
                                    />
                                    {errors.address && <ErrorMessage message={errors.address}/>}
                                </motion.div>

                                <motion.div variants={formFieldVariants}>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                        Ville
                                    </label>
                                    <Input
                                        id="city"
                                        name="city"
                                        type="text"
                                        required
                                        placeholder="Ville"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`transition-all focus:ring-2 ${errors.city ? 'border-red-500 focus:ring-red-200' : 'focus:border-green-500 focus:ring-green-200'}`}
                                    />
                                    {errors.city && <ErrorMessage message={errors.city}/>}
                                </motion.div>

                                <motion.div variants={formFieldVariants}>
                                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                                        Code postal
                                    </label>
                                    <Input
                                        id="zipCode"
                                        name="zipCode"
                                        type="text"
                                        required
                                        placeholder="Code postal"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className={`transition-all focus:ring-2 ${errors.zipCode ? 'border-red-500 focus:ring-red-200' : 'focus:border-green-500 focus:ring-green-200'}`}
                                    />
                                    {errors.zipCode && <ErrorMessage message={errors.zipCode}/>}
                                </motion.div>

                                {/* Section Paiement */}
                                <motion.div variants={formFieldVariants} className="md:col-span-2 mt-4">
                                    <h3 className="text-lg font-semibold mb-2 text-colors-titleGreen">
                                        Informations de paiement
                                    </h3>
                                    <div className="border rounded-md p-3 mb-2">
                                        <CardElement
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: '16px',
                                                        color: '#424770',
                                                        '::placeholder': {
                                                            color: '#aab7c4',
                                                        },
                                                    },
                                                    invalid: {
                                                        color: '#9e2146',
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                    {paymentError && <ErrorMessage message={paymentError}/>}
                                </motion.div>
                            </div>

                            <motion.div
                                className="mt-6"
                                variants={formFieldVariants}
                                whileHover={{scale: isFormValid() ? 1.02 : 1}}
                                whileTap={{scale: isFormValid() ? 0.98 : 1}}
                            >
                                <Button
                                    type="submit"
                                    className={`w-full py-3 flex items-center justify-center gap-2 ${
                                        isFormValid() && !isProcessingPayment
                                            ? 'bg-green-500 hover:bg-green-600 text-white'
                                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    }`}
                                    disabled={!isFormValid() || isProcessingPayment}
                                >
                                    {isProcessingPayment ? (
                                        <span>Traitement du paiement...</span>
                                    ) : (
                                        <>
                                            <span>Payer €{totalPrice.toFixed(2)}</span>
                                            <Send size={18}/>
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </motion.form>
                    ) : (
                        <motion.div
                            className="bg-green-50 p-8 rounded-lg text-center border border-green-200"
                            variants={successVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    delay: 0.2
                                }}
                                className="flex justify-center mb-4"
                            >
                                <Check size={48} className="text-green-500"/>
                            </motion.div>
                            <h3 className="text-xl font-semibold text-green-700 mb-2">Paiement réussi !</h3>
                            <p className="text-green-600 mb-4">
                                Merci pour votre commande. Vous allez être redirigé vers la page de confirmation.
                            </p>
                            <div className="w-full max-w-xs mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-green-500"
                                    initial={{width: 0}}
                                    animate={{width: "100%"}}
                                    transition={{duration: 2}}
                                />
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </main>
    );
}