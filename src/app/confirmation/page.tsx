"use client"
import Container from "@/components/container";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Check, ArrowLeft, ShoppingBag, MapPin, Clock} from 'lucide-react';
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {PopularDishesCarousel} from "@/components/popularDishes";

export default function ConfirmationPage() {
    const [orderId] = useState("CMD-2023-0589");
    const [confettiActive, setConfettiActive] = useState(true);

    useEffect(() => {
        // Désactiver les confettis après 3 secondes
        const timer = setTimeout(() => {
            setConfettiActive(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const fadeIn = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.8, ease: "easeOut"}
        }
    };

    const staggerContainer = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
                ease: "easeOut"
            }
        }
    };

    const scaleIn = {
        hidden: {scale: 0.8, opacity: 0},
        visible: {
            scale: 1,
            opacity: 1,
            transition: {duration: 0.7, ease: "easeOut"}
        }
    };

    return (
        <Container className="w-full px-7 md:px-12 py-10 overflow-hidden">
            {confettiActive && (
                <div className="fixed inset-0 pointer-events-none z-50">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 rounded-full"
                            initial={{
                                top: "-5%",
                                left: `${Math.random() * 100}%`,
                                backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
                                scale: 0
                            }}
                            animate={{
                                top: "105%",
                                scale: [0, 1, 0.5],
                                rotate: Math.random() * 360,
                                x: Math.random() * 200 - 100
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                ease: "easeOut",
                                delay: Math.random() * 0.5
                            }}
                        />
                    ))}
                </div>
            )}

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
                className="mb-8"
            >
                <Link href="/"
                      className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    <span>Retour à l&apos;accueil</span>
                </Link>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="text-center mb-10"
            >
                <motion.div
                    variants={scaleIn}
                    className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4"
                >
                    <motion.div
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.3
                        }}
                    >
                        <motion.div
                            animate={{rotate: [0, 10, -10, 0]}}
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut",
                                times: [0, 0.3, 0.6, 1],
                                repeat: 0
                            }}
                        >
                            <Check className="h-10 w-10 text-green-600"/>
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.h1
                    variants={fadeIn}
                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
                >
                    Commande confirmée !
                </motion.h1>

                <motion.p
                    variants={fadeIn}
                    className="text-gray-600 mb-2"
                >
                    Merci pour votre commande. Votre numéro de commande est :
                </motion.p>

                <motion.p
                    variants={fadeIn}
                    className="text-xl font-bold text-green-600 mb-4"
                >
                    {orderId}
                </motion.p>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
            >
                <motion.div
                    variants={fadeIn}
                    className="border-b border-gray-200 bg-gray-50 px-6 py-4"
                >
                    <h2 className="text-lg font-medium text-gray-900">Détails de votre commande</h2>
                </motion.div>

                <div className="px-6 py-4">
                    <motion.div
                        variants={fadeIn}
                        className="grid md:grid-cols-3 gap-6 mb-6"
                    >
                        <div className="flex items-start space-x-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <ShoppingBag className="h-5 w-5 text-green-600"/>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Type de commande</h3>
                                <p className="text-gray-600">À emporter</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <MapPin className="h-5 w-5 text-green-600"/>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Lieu de retrait</h3>
                                <p className="text-gray-600">Mets & Merveilles<br/>123 Avenue de Paris, 75001 Paris</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <Clock className="h-5 w-5 text-green-600"/>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Heure de retrait</h3>
                                <p className="text-gray-600">Aujourd&apos;hui à 19:30</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeIn} className="mb-6">
                        <h3 className="font-medium text-gray-900 mb-3">Articles commandés</h3>
                        <div className="space-y-3">
                            {[
                                {name: "Poulet rôti aux herbes", quantity: 2, price: "18,90 €"},
                                {name: "Tarte au citron meringuée", quantity: 1, price: "6,50 €"},
                                {name: "Salade César", quantity: 1, price: "12,90 €"}
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{opacity: 0, x: -20}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{delay: 0.3 + i * 0.1}}
                                    className="flex justify-between border-b border-gray-100 pb-2"
                                >
                                    <div className="flex items-center">
                                        <span className="w-6 text-center text-gray-600">{item.quantity}×</span>
                                        <span className="ml-2 text-gray-800">{item.name}</span>
                                    </div>
                                    <span className="font-medium">{item.price}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Récapitulatif */}
                    <motion.div
                        variants={fadeIn}
                        className="border-t border-gray-200 pt-4"
                    >
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Sous-total</span>
                            <span>57,20 €</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-600">TVA</span>
                            <span>5,72 €</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span className="text-green-600">62,92 €</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="bg-green-50 rounded-lg p-6 mb-12 border border-green-100"
            >
                <h3 className="font-medium text-gray-900 mb-2">Comment récupérer votre commande</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    <motion.li
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.5}}
                    >
                        Présentez-vous à l&apos;accueil du restaurant à l&apos;heure indiquée
                    </motion.li>
                    <motion.li
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.6}}
                    >
                        Donnez votre numéro de commande ou votre nom
                    </motion.li>
                    <motion.li
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.7}}
                    >
                        Notre équipe vous remettra votre commande
                    </motion.li>
                </ol>
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7, delay: 0.8}}
                className="flex flex-col md:flex-row justify-center gap-4"
            >
                <motion.div
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                >
                    <Link href="/">
                        <Button className="w-full md:w-auto px-8 py-5 rounded-full bg-green-500 hover:bg-green-400">
                            Retourner à l&apos;accueil
                        </Button>
                    </Link>
                </motion.div>

                <motion.div
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                >
                    <Link href="/menu">
                        <Button
                            className="w-full md:w-auto px-8 py-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800">
                            Commander à nouveau
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Suggestions */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.2}}
                variants={fadeIn}
                className="py-16 relative"
            >
                <motion.h2
                    variants={scaleIn}
                    className="text-xl md:text-2xl font-bold text-colors-titleGreen mb-10 text-center"
                >
                    <motion.span
                        className="inline-block"
                        initial={{x: 0}}
                        whileInView={{
                            x: [-5, 5, 0],
                            transition: {
                                duration: 0.5,
                                delay: 0.5,
                                ease: "easeInOut"
                            }
                        }}
                        viewport={{once: true}}
                    >
                        Vous aimerez peut-être aussi...
                    </motion.span>
                </motion.h2>

                <motion.div
                    variants={scaleIn}
                    className="w-full max-w-3xl mx-auto"
                >
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            transition: {duration: 0.8, delay: 0.2}
                        }}
                        viewport={{once: true}}
                    >
                        <PopularDishesCarousel/>
                    </motion.div>
                </motion.div>
            </motion.section>
        </Container>
    );
}