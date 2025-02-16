import Container from "@/components/container";
import Image from "next/image";

export default function About() {
    return (
        <Container className="px-4 md:px-8 py-8 flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="md:w-3/4">
                <p className="px-5 py-1 text-sm md:text-base text-neutral-500 border-b border-gray-300 mb-2">
                    Restaurant familial
                </p>
                <h1 className="text-2xl font-bold text-green-600 mb-3">Mets & Merveilles</h1>
                <p className="text-base text-gray-700">
                    Situé au cœur de Paris, nous partageons notre passion pour la cuisine traditionnelle.
                </p>
                <div className="mt-4">
                    <Image
                        src="/images/heroFood.png"
                        alt="Plat 1"
                        width={500}
                        height={500}
                        className="rounded-lg w-full object-cover"
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 my-6 w-full justify-center">
                <div className="shadow-md w-full text-gray-700 overflow-hidden flex">
                    <Image
                        src="/images/img1.jpg"
                        alt="Plat 1"
                        width={250}
                        height={400}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
                <div
                    className="relative rounded-lg shadow-md w-full text-center flex flex-col bg-black items-center justify-center overflow-hidden">
                    <Image
                        src="/images/img2.jpg"
                        alt="Expérience inoubliable"
                        width={250}
                        height={400}
                        className="absolute inset-0 w-full h-auto object-cover bg-black opacity-40"
                    />
                    <p className="relative mb-3 font-semibold text-white z-10">Expérience inoubliable</p>
                    <button className="relative border border-white text-white px-3 py-1 rounded-full z-10 text-sm">Contact</button>
                </div>
                <div className="shadow-md w-full text-gray-700 overflow-hidden flex">
                    <Image
                        src="/images/img3.jpg"
                        alt="Plat 2"
                        width={250}
                        height={400}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
            </div>

            <div className="relative w-full mt-6">
                <Image
                    src="/images/restaurant.jpg"
                    alt="Restaurant intérieur"
                    width={1200}
                    height={600}
                    className="w-full h-auto object-cover rounded-lg"
                />
                <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-base font-semibold bg-black bg-opacity-50 px-3 py-1 rounded-md">
                    L&#39;équipe de Mets & Merveilles promet une expérience inoubliable.
                </p>
            </div>
        </Container>
    );
}