import Container from "@/components/container";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {PopularDishesCarousel} from "@/components/popularDishes";
import { Truck, Salad, CookingPot } from 'lucide-react';

export default function Home() {
    return (
        <Container className="w-full px-7 md:px-12">

        {/* Hero Banner Section */}
            <section className="flex flex-col md:flex-row-reverse gap-3 py-6 pt-16">
                {/* Image */}
                <div className="flex items-center justify-center md:w-1/2">
                    <div className="relative w-full h-[300px] md:max-w-[400px] md:h-[300px] lg:max-w-[500px] lg:h-[500px]">
                        <Image
                            src="/images/HeroFood.png"
                            alt="Food"
                            className="object-contain w-full h-full"
                            fill
                        />
                    </div>
                </div>

                {/* Texte */}
                <div className="flex flex-col items-start justify-center gap-2 md:w-1/2">
                    <p className="px-5 py-0.5 text-sm md:text-sm lg:text-base rounded-full text-neutral-500 border border-gray-300 md:px-4 md:py-1">
                        Vous avez faim ?
                    </p>

                    <h2 className="text-2xl md:text-2xl lg:text-4xl font-bold tracking-wider text-colors-titleGreen font-instrumentSans my-2">
                        Venez déguster chez nous !
                    </h2>

                    <p className="text-sm md:text-base lg:text-lg text-center md:text-left font-poppins">
                        Mets & Merveilles est un restaurant familial situé à Paris.
                        Nous vous proposons une cuisine traditionnelle et authentique.
                        Venez déguster nos plats et laissez-vous tenter par nos desserts faits maison.
                    </p>

                    <div className="my-4 flex text-center justify-center gap-6 w-full md:w-auto">
                        <Link href="/menu">
                            <Button className="px-4 lg:px-12 py-3 md:py-5 lg:py-6 rounded-full bg-green-500 hover:bg-green-300 text-sm md:text-base lg:text-1xl">
                                Consulter le menu
                            </Button>
                        </Link>

                        <Link href="/menu">
                            <Button className="px-4 lg:px-12 py-3 md:py-5 lg:py-6 rounded-full hover:bg-gray-700 text-sm md:text-base lg:text-1xl">
                                En savoir plus
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>


            {/* Popular Dishes Section */}
            <section className="py-12">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-colors-titleGreen font-instrumentSans mb-6 md:text-center">
                    Nos plats les plus populaires
                </h2>

                <div className="w-full max-w-3xl mx-auto">
                    <PopularDishesCarousel />
                </div>
            </section>

            {/* Why Us Section */}
            <section className="py-13">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold md:text-2xl lg:text-3xl tracking-wider text-colors-titleGreen font-instrumentSans mb-4">
                        Pourquoi choisir notre restaurant ?
                    </h2>
                    <p className="text-base md:text-xl lg:text-lg font-poppins max-w-2xl mx-auto">
                        Chez Mets & Merveilles, nous nous engageons à vous offrir une expérience culinaire inoubliable
                        avec des produits de qualité, une cuisine traditionnelle et un service rapide. Découvrez ce qui
                        fait notre différence !
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {/* Card 1 - Fresh Ingredients */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center border">
                        <div className="flex justify-center items-center mb-4">
                            <i className="text-colors-titleGreen text-3xl sm:text-4xl md:text-2xl lg:text-2xl">
                                <Truck />
                            </i>
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-medium text-colors-titleGreen mb-2">Ingrédients frais</h3>
                        <p className="text-sm sm:text-base md:text-sm lg:text-sm text-neutral-600">
                            Nous utilisons uniquement des ingrédients frais et de saison, provenant directement des producteurs locaux, pour garantir la meilleure qualité dans chaque plat.
                        </p>
                    </div>

                    {/* Card 2 - Authentic Cuisine */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center border">
                        <div className="flex justify-center items-center mb-4">
                            <i className="text-colors-titleGreen text-3xl sm:text-4xl md:text-2xl lg:text-2xl">
                                <CookingPot />
                            </i>
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-medium text-colors-titleGreen mb-2">Cuisine authentique</h3>
                        <p className="text-sm sm:text-base md:text-sm lg:text-sm text-neutral-600">
                            Chaque plat est préparé avec des recettes traditionnelles et un savoir-faire ancestral, afin de vous offrir une expérience culinaire véritablement authentique.
                        </p>
                    </div>

                    {/* Card 3 - Fast Service */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center border">
                        <div className="flex justify-center items-center mb-4">
                            <i className="text-colors-titleGreen text-3xl sm:text-4xl md:text-2xl lg:text-2xl">
                                <Salad />
                            </i>
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-medium text-colors-titleGreen mb-2">Service rapide</h3>
                        <p className="text-sm sm:text-base md:text-sm lg:text-sm text-neutral-600">
                            Nous savons que votre temps est précieux. C&#39;est pourquoi nous nous engageons à vous servir rapidement sans compromettre la qualité de nos plats.
                        </p>
                    </div>
                </div>
            </section>


        </Container>
    );
}
