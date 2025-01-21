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


            </Container>
    );
}
