'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

interface Dish {
    imageUrl: string;
    name: string;
    description: string;
    price: number;
}

export function PopularDishesCarousel() {
    const [dishes, setDishes] = React.useState<Dish[]>([]);

    React.useEffect(() => {
        async function fetchDishes() {
            try {
                const response = await fetch('/api/menus');
                const data = await response.json();
                if (data?.starters?.[0] && data?.mainCourses?.[0] && data?.desserts?.[0] && data?.drinks?.[0]) {
                    setDishes([
                        data.starters[0],
                        data.mainCourses[0],
                        data.desserts[0],
                        data.drinks[0],
                    ]);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des plats populaires:', error);
            }
        }

        fetchDishes();
    }, []);

    return (
        <Carousel opts={{ align: 'start' }} className="w-full max-w-3xl" plugins={[
            Autoplay({
                delay: 5000,
            }),
        ]}>
            <CarouselContent>
                {dishes.map((dish, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex-shrink-0">
                        <div className="p-1 h-[250px] md:h-[300px] lg:h-[350px]">
                            <Card className="h-full flex flex-col">
                                <CardContent className="flex flex-col items-center h-full p-0.1">
                                    <div className="relative w-full h-[150px] md:h-[200px] lg:h-[250px]">
                                        <Image
                                            src={dish.imageUrl || '/images/default.jpg'}
                                            alt={dish.name}
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                    <h3 className="text-lg mt-2 font-bold text-center">{dish.name}</h3>
                                    <p className="text-sm text-muted-foreground text-center">{dish.description}</p>
                                    <p className="text-md font-semibold mt-2">{dish.price} €</p>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}