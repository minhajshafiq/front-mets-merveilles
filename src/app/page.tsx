"use client"
import Container from "@/components/container";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {PopularDishesCarousel} from "@/components/popularDishes";
import { Truck, Salad, CookingPot } from 'lucide-react';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
    // Refs for scroll-based animations
    const heroRef = useRef(null);
    const dishesRef = useRef(null);
    const whyUsRef = useRef(null);

    // Scroll progress animations
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ["start end", "end start"]
    });

    const heroImageY = useTransform(heroScroll, [0, 1], [50, -50]);
    const heroTextX = useTransform(heroScroll, [0, 1], [-20, 20]);

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
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
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.7, ease: "easeOut" }
        }
    };

    const slideFromLeft = {
        hidden: { x: -80, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const slideFromRight = {
        hidden: { x: 80, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        },
        hover: {
            y: -15,
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
            transition: { type: "spring", stiffness: 400, damping: 10 }
        }
    };

    return (
        <Container className="w-full px-7 md:px-12 overflow-hidden">

            {/* Hero Banner Section */}
            <motion.section
                ref={heroRef}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="flex flex-col md:flex-row-reverse gap-3 py-6 pt-16 relative"
            >

                {/* Image */}
                <motion.div
                    variants={fadeIn}
                    className="flex items-center justify-center md:w-1/2 relative z-10"
                >
                    <motion.div
                        style={{ y: heroImageY }}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative w-full h-[300px] md:max-w-[400px] md:h-[300px] lg:max-w-[500px] lg:h-[500px]"
                    >
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/metsetmerveilles/o/HeroFood.png?alt=media&token=5295e80c-7f3a-449e-a01a-812ff3472920"
                            alt="Food"
                            className="object-contain w-full h-full drop-shadow-2xl"
                            fill={true}
                        />
                    </motion.div>
                </motion.div>

                {/* Texte */}
                <motion.div
                    style={{ x: heroTextX }}
                    variants={fadeIn}
                    className="flex flex-col items-start justify-center gap-2 md:w-1/2 relative z-10"
                >
                    <motion.p
                        variants={slideFromLeft}
                        className="px-5 py-0.5 text-sm md:text-sm lg:text-base rounded-full text-neutral-500 border border-gray-300 md:px-4 md:py-1"
                    >
                        Vous avez faim ?
                    </motion.p>

                    <motion.h2
                        variants={slideFromLeft}
                        className="text-2xl md:text-2xl lg:text-4xl font-bold tracking-wider text-colors-titleGreen font-instrumentSans my-2"
                        whileHover={{
                            scale: 1.02,
                            color: "#2c9c4a",
                            transition: { duration: 0.2 }
                        }}
                    >
                        Venez déguster chez nous{" "}
                        <motion.span
                            className="inline-block"
                            animate={{
                                rotateZ: [0, 15, 0],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 5
                            }}
                        >
                            !
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        variants={slideFromLeft}
                        className="text-sm md:text-base lg:text-lg text-center md:text-left font-poppins"
                    >
                        Mets & Merveilles est un restaurant familial situé à Paris.
                        Nous vous proposons une cuisine traditionnelle et authentique.
                        Venez déguster nos plats et laissez-vous tenter par nos desserts faits maison.
                    </motion.p>

                    <motion.div
                        variants={slideFromLeft}
                        className="my-4 flex text-center justify-center gap-6 w-full md:w-auto"
                    >
                        <motion.div
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Link href="/menu">
                                <Button className="px-4 lg:px-12 py-3 md:py-5 lg:py-6 rounded-full bg-green-500 hover:bg-green-400 text-sm md:text-base lg:text-1xl relative overflow-hidden group">
                                    <motion.span
                                        className="absolute inset-0 w-0 bg-green-600 transition-all duration-300 ease-out group-hover:w-full"
                                        initial={{ width: "0%" }}
                                        whileHover={{ width: "100%" }}
                                    />
                                    <span className="relative z-10">Consulter le menu</span>
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Link href="/menu">
                                <Button className="px-4 lg:px-12 py-3 md:py-5 lg:py-6 rounded-full hover:bg-gray-700 text-sm md:text-base lg:text-1xl relative overflow-hidden group">
                                    <motion.span
                                        className="absolute inset-0 w-0 bg-gray-800 transition-all duration-300 ease-out group-hover:w-full"
                                        initial={{ width: "0%" }}
                                        whileHover={{ width: "100%" }}
                                    />
                                    <span className="relative z-10">En savoir plus</span>
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.section>


            {/* Popular Dishes Section */}
            <motion.section
                ref={dishesRef}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                className="py-16 relative"
            >

                <motion.h2
                    variants={scaleIn}
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-colors-titleGreen font-instrumentSans mb-10 md:text-center relative z-10"
                >
                    <motion.span
                        className="inline-block"
                        initial={{ x: 0 }}
                        whileInView={{
                            x: [-5, 5, 0],
                            transition: {
                                duration: 0.5,
                                delay: 0.5,
                                ease: "easeInOut"
                            }
                        }}
                        viewport={{ once: true }}
                    >
                        Nos plats les plus populaires
                    </motion.span>
                </motion.h2>

                <motion.div
                    variants={scaleIn}
                    className="w-full max-w-3xl mx-auto relative z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            transition: { duration: 0.8, delay: 0.2 }
                        }}
                        viewport={{ once: true }}
                    >
                        <PopularDishesCarousel />
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Why Us Section */}
            <motion.section
                ref={whyUsRef}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="py-16 mb-6 relative"
            >

                <motion.div
                    variants={fadeIn}
                    className="text-center mb-10 relative z-10"
                >
                    <motion.h2
                        variants={slideFromRight}
                        className="text-xl font-bold md:text-2xl lg:text-3xl tracking-wider text-colors-titleGreen font-instrumentSans mb-4"
                    >
                        Pourquoi choisir notre restaurant ?
                    </motion.h2>
                    <motion.p
                        variants={fadeIn}
                        className="text-base md:text-xl lg:text-lg font-poppins max-w-2xl mx-auto"
                    >
                        Chez Mets & Merveilles, nous nous engageons à vous offrir une expérience culinaire inoubliable
                        avec des produits de qualité, une cuisine traditionnelle et un service rapide. Découvrez ce qui
                        fait notre différence !
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto relative z-10"
                >
                    {/* Card 1 - Fresh Ingredients */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-white shadow-lg rounded-lg p-6 text-center border"
                    >
                        <motion.div
                            whileHover={{ rotateY: 180 }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center items-center mb-4"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-colors-titleGreen text-3xl sm:text-4xl md:text-2xl lg:text-2xl"
                            >
                                <Truck />
                            </motion.div>
                        </motion.div>
                        <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-medium text-colors-titleGreen mb-2">Ingrédients frais</h3>
                        <p className="text-sm sm:text-base md:text-sm lg:text-sm text-neutral-600">
                            Nous utilisons uniquement des ingrédients frais et de saison, provenant directement des producteurs locaux, pour garantir la meilleure qualité dans chaque plat.
                        </p>
                    </motion.div>

                    {/* Card 2 - Authentic Cuisine */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-white shadow-lg rounded-lg p-6 text-center border"
                    >
                        <motion.div
                            whileHover={{ rotateY: 180 }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center items-center mb-4"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                                className="text-colors-titleGreen text-3xl sm:text-4xl md:text-2xl lg:text-2xl"
                            >
                                <CookingPot />
                            </motion.div>
                        </motion.div>
                        <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-medium text-colors-titleGreen mb-2">Cuisine authentique</h3>
                        <p className="text-sm sm:text-base md:text-sm lg:text-sm text-neutral-600">
                            Chaque plat est préparé avec des recettes traditionnelles et un savoir-faire ancestral, afin de vous offrir une expérience culinaire véritablement authentique.
                        </p>
                    </motion.div>

                    {/* Card 3 - Fast Service */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-white shadow-lg rounded-lg p-6 text-center border"
                    >
                        <motion.div
                            whileHover={{ rotateY: 180 }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center items-center mb-4"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1
                                }}
                                className="text-colors-titleGreen text-3xl sm:text-4xl md:text-2xl lg:text-2xl"
                            >
                                <Salad />
                            </motion.div>
                        </motion.div>
                        <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-medium text-colors-titleGreen mb-2">Service rapide</h3>
                        <p className="text-sm sm:text-base md:text-sm lg:text-sm text-neutral-600">
                            Nous savons que votre temps est précieux. C&#39;est pourquoi nous nous engageons à vous servir rapidement sans compromettre la qualité de nos plats.
                        </p>
                    </motion.div>
                </motion.div>
            </motion.section>
        </Container>
    );
}