'use client';

import Container from "@/components/container";
import Image from "next/image";
import {motion} from "framer-motion";
import {useInView} from "framer-motion";
import {useRef} from "react";

export default function About() {
    const imageRef = useRef(null);
    const infoRef = useRef(null);
    const galleryRef = useRef(null);
    const heroRef = useRef(null);

    const imageInView = useInView(imageRef, {once: true, amount: 0.3});
    const infoInView = useInView(infoRef, {once: true, amount: 0.3});
    const galleryInView = useInView(galleryRef, {once: true, amount: 0.2});
    const heroInView = useInView(heroRef, {once: true, amount: 0.3});

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: {y: 50, opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
            transition: {duration: 0.6, ease: "easeOut"}
        }
    };

    const galleryItemVariants = {
        hidden: {y: 70, opacity: 0},
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.2,
                duration: 0.7,
                ease: "easeOut"
            }
        })
    };

    return (
        <Container className="px-8 flex flex-col items-center text-center max-w-3xl mx-auto overflow-hidden">
            <motion.div
                ref={infoRef}
                initial="hidden"
                animate={infoInView ? "visible" : "hidden"}
                variants={containerVariants}
                className="mt-4 flex flex-col md:flex-row items-center md:items-center justify-between w-full"
            >
                {/* Texte (à gauche sur PC, centré sur mobile) */}
                <motion.div
                    variants={itemVariants}
                    className="md:w-1/2 text-center md:text-left flex flex-col justify-center"
                >
                    <motion.p
                        variants={itemVariants}
                        className="px-5 py-1 text-sm md:text-base text-neutral-500 mb-2"
                    >
                        Restaurant familial
                    </motion.p>
                    <motion.h1
                        variants={itemVariants}
                        className="text-2xl font-bold text-green-600 mb-3"
                    >
                        Mets & Merveilles
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-base text-gray-700"
                    >
                        Situé au cœur de Paris, nous partageons notre passion pour la cuisine traditionnelle.
                    </motion.p>
                </motion.div>

                {/* Image (à droite sur PC, centrée verticalement) */}
                <motion.div
                    ref={imageRef}
                    initial={{opacity: 0, x: 50}}
                    animate={imageInView ? {opacity: 1, x: 0} : {opacity: 0, x: 50}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                    className="md:w-1/2 flex justify-center md:justify-end mt-4 md:mt-0"
                >
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/metsetmerveilles/o/HeroFood.png?alt=media&token=5295e80c-7f3a-449e-a01a-812ff3472920"
                        alt="Food"
                        width={500}
                        height={400}
                        className="object-cover w-full h-auto"
                    />
                </motion.div>
            </motion.div>

            <motion.div
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7, delay: 0.5}}
                className="mt-6 mb-6"
            >
                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.7, delay: 0.8}}
                    className="text-base text-gray-700"
                >
                    Notre menu propose des plats faits maison, préparés avec des ingrédients frais et de qualité.
                </motion.p>

                <motion.div
                    ref={galleryRef}
                    initial="hidden"
                    animate={galleryInView ? "visible" : "hidden"}
                    className="flex flex-col md:flex-row gap-4 my-6 w-full justify-center items-center"
                >
                    <motion.div
                        custom={0}
                        variants={galleryItemVariants}
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.3}}
                        className="shadow-md w-40 h-40 md:w-55 md:h-80 overflow-hidden flex flex-shrink-0"
                    >
                        <Image
                            src="/images/img1.jpg"
                            alt="Plat 1"
                            width={250}
                            height={300}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </motion.div>
                    <motion.div
                        custom={1}
                        variants={galleryItemVariants}
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.3}}
                        className="relative rounded-lg shadow-md w-40 h-40 md:w-55 md:h-80 text-center flex flex-col bg-black items-center justify-center overflow-hidden flex-shrink-0"
                    >
                        <Image
                            src="/images/img2.jpg"
                            alt="Expérience inoubliable"
                            width={250}
                            height={400}
                            className="absolute inset-0 w-full h-full object-cover bg-black opacity-40"
                        />
                        <p className="relative mb-3 font-semibold text-white z-10">Expérience inoubliable</p>
                        <motion.button
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.95}}
                            className="relative border border-white text-white px-3 py-1 rounded-full z-10 text-sm"
                        >
                            Contact
                        </motion.button>
                    </motion.div>
                    <motion.div
                        custom={2}
                        variants={galleryItemVariants}
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.3}}
                        className="shadow-md w-40 h-40 md:w-55 md:h-80 overflow-hidden flex flex-shrink-0"
                    >
                        <Image
                            src="/images/img3.jpg"
                            alt="Plat 2"
                            width={250}
                            height={400}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </motion.div>
                </motion.div>
                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.7, delay: 1.2}}
                    className="text-base text-gray-700"
                >
                    Que vous soyez amateur de cuisine française ou simplement à la recherche d&#39;un bon repas, nous
                    avons quelque chose pour ravir vos papilles.
                </motion.p>
            </motion.div>

            <motion.div
                ref={heroRef}
                initial={{ opacity: 0, y: 70 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-full mt-6 overflow-hidden flex justify-center"
            >
                <div className="relative w-full max-w-6xl h-[400px] md:h-[600px]">
                    <Image
                        src="/images/restaurant.jpg"
                        alt="Restaurant intérieur"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="absolute bottom-8 left-[10%] text-white text-sm md:text-base font-semibold bg-black/60 px-4 py-2 rounded-md max-w-[80%]"
                    >
                        L&apos;équipe de Mets & Merveilles promet une expérience inoubliable.
                    </motion.p>
                </div>
            </motion.div>
        </Container>
    );
}