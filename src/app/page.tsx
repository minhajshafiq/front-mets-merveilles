import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {PopularDishesCarousel} from "@/components/popularDishes";

export default function Home() {
    return (
            <Container className="px-4 md:px-12">

                {/* Hero Banner Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12 pt-16">
                    <div className="flex flex-col items-start justify-center gap-4">
                        <p className="px-6 py-1 rounded-full text-neutral-500 border border-b-gray-300">
                            Vous avez faim ?
                        </p>

                        <h2 className="text-5xl font-bold tracking-wider uppercase text-neutral-700 my-4">
                            Venez dégustez chez nous !
                        </h2>

                        <p className="text-base text-center md:text-left">
                            Mets & Merveilles est un restaurant familial situé à Paris.
                            Nous vous proposons une cuisine traditionnelle et authentique.
                            Venez déguster nos plats et laissez-vous tenter par nos desserts faits maison.
                        </p>

                        <div className="my-4 flex text-center justify-center gap-6 w-full md:w-auto">
                            <Link href="/menu">
                                <Button className="px-8 md:px-16 py-4 md:py-6 rounded-full bg-green-500 hover:bg-green-300">
                                    Consulter le menu
                                </Button>
                            </Link>

                            <Link href="/menu">
                                <Button className="px-8 md:px-16 py-4 md:py-6 rounded-full hover:bg-gray-700">
                                    En savoir plus
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative w-full h-[560px]">
                            <Image
                                src="/images/HeroFood.png"
                                alt="Food"
                                className="object-contain w-full h-full"
                                fill
                            />
                        </div>
                    </div>
                </section>

                {/* Popular Dishes Section */}
                <section className="flex flex-col items-center justify-center py-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-neutral-700 mb-8">
                        Nos plats les plus populaires
                    </h2>

                    <div className="w-full max-w-3xl">
                        <PopularDishesCarousel />
                    </div>
                </section>

                {/* Why Us Section */}
                <section className="py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold tracking-wider text-neutral-700 mb-4">
                            Pourquoi choisir notre restaurant ?
                        </h2>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                            Chez Mets & Merveilles, nous nous engageons à vous offrir une expérience culinaire inoubliable avec des produits de qualité, une cuisine traditionnelle et un service rapide. Découvrez ce qui fait notre différence !
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
                        {/* Card 1 - Fresh Ingredients */}
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                            <div className="flex justify-center items-center mb-4">
                                <i className="fas fa-lemon text-4xl text-green-500">Icon 1</i>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-700 mb-2">Ingrédients frais</h3>
                            <p className="text-neutral-600">
                                Nous utilisons uniquement des ingrédients frais et de saison, provenant directement des producteurs locaux, pour garantir la meilleure qualité dans chaque plat.
                            </p>
                        </div>

                        {/* Card 2 - Authentic Cuisine */}
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                            <div className="flex justify-center items-center mb-4">
                                <i className="fas fa-spoon text-4xl text-yellow-500"> Icon 2</i>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-700 mb-2">Cuisine authentique</h3>
                            <p className="text-neutral-600">
                                Chaque plat est préparé avec des recettes traditionnelles et un savoir-faire ancestral, afin de vous offrir une expérience culinaire véritablement authentique.
                            </p>
                        </div>

                        {/* Card 3 - Fast Service */}
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                            <div className="flex justify-center items-center mb-4">
                                <i className="fas fa-clock text-4xl text-red-500"> Icon 3 </i>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-700 mb-2">Service rapide</h3>
                            <p className="text-neutral-600">
                                Nous savons que votre temps est précieux. C&#39;est pourquoi nous nous engageons à vous servir rapidement sans compromettre la qualité de nos plats.
                            </p>
                        </div>
                    </div>
                </section>




            </Container>
    );
}
