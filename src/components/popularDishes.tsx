'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

const MOCK_POPULAR_DISHES = [
    {
        id: 1,
        name: 'Pizza Margherita',
        description: 'Tomate, mozzarella, basilic frais',
        price: 12.5,
    },
    {
        id: 2,
        name: 'Pâtes Carbonara',
        description: 'Crème, lardons, parmesan',
        price: 14.0,
    },
    {
        id: 3,
        name: 'Tiramisu',
        description: 'Dessert italien au mascarpone',
        price: 6.0,
    },
    {
        id: 4,
        name: 'Salade César',
        description: 'Poulet, croûtons, sauce César',
        price: 10.0,
    },
];

export function PopularDishesCarousel() {
    return (
        <Carousel
            opts={{
                align: 'start',
            }}
            className="w-full max-w-3xl"
        >
            <CarouselContent>
                {MOCK_POPULAR_DISHES.map((dish) => (
                    <CarouselItem
                        key={dish.id}
                        className="md:basis-1/2 lg:basis-1/3 flex-shrink-0"
                    >
                        <div className="p-1 h-[350px]"> {/* Taille uniforme */}
                            <Card className="h-full flex flex-col">
                                <CardContent className="flex flex-col items-center justify-between h-full p-6">
                                    {/* Image supprimée */}
                                    <h3 className="text-lg font-bold text-center">{dish.name}</h3>
                                    <p className="text-sm text-muted-foreground text-center">
                                        {dish.description}
                                    </p>
                                    <p className="text-md font-semibold mt-2">{dish.price} €</p>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
