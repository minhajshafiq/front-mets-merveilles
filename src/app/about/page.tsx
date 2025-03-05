import Container from "@/components/container";
import Image from "next/image";

export default function About() {
    return (
        <Container className="px-8 flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="mt-4 flex flex-col md:flex-row items-center md:items-center justify-between w-full">
                {/* Texte (à gauche sur PC, centré sur mobile) */}
                <div className="md:w-1/2 text-center md:text-left flex flex-col justify-center">
                    <p className="px-5 py-1 text-sm md:text-base text-neutral-500 mb-2">
                        Restaurant familial
                    </p>
                    <h1 className="text-2xl font-bold text-green-600 mb-3">Mets & Merveilles</h1>
                    <p className="text-base text-gray-700">
                        Situé au cœur de Paris, nous partageons notre passion pour la cuisine traditionnelle.
                    </p>
                </div>

                {/* Image (à droite sur PC, centrée verticalement) */}
                <div className="md:w-1/2 flex justify-center md:justify-end mt-4 md:mt-0">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/metsetmerveilles/o/HeroFood.png?alt=media&token=5295e80c-7f3a-449e-a01a-812ff3472920"
                        alt="Food"
                        width={500} // Largeur de l'image spécifiée
                        height={400} // Hauteur de l'image spécifiée
                        className="object-cover w-full h-auto"
                    />
                </div>
            </div>

            <div className="mt-6 mb-6">
                <p className="text-base text-gray-700">
                    Notre menu propose des plats faits maison, préparés avec des ingrédients frais et de qualité.
                </p>

                <div className="flex flex-col md:flex-row gap-4 my-6 w-full justify-center items-center">
                    <div className="shadow-md w-40 h-40 md:w-55 md:h-80 overflow-hidden flex flex-shrink-0">
                        <Image
                            src="/images/img1.jpg"
                            alt="Plat 1"
                            width={250}
                            height={300}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div
                        className="relative rounded-lg shadow-md w-40 h-40 md:w-55 md:h-80 text-center flex flex-col bg-black items-center justify-center overflow-hidden flex-shrink-0">
                        <Image
                            src="/images/img2.jpg"
                            alt="Expérience inoubliable"
                            width={250}
                            height={400}
                            className="absolute inset-0 w-full h-full object-cover bg-black opacity-40"
                        />
                        <p className="relative mb-3 font-semibold text-white z-10">Expérience inoubliable</p>
                        <button
                            className="relative border border-white text-white px-3 py-1 rounded-full z-10 text-sm">Contact
                        </button>
                    </div>
                    <div className="shadow-md w-40 h-40 md:w-55 md:h-80 overflow-hidden flex flex-shrink-0">
                        <Image
                            src="/images/img3.jpg"
                            alt="Plat 2"
                            width={250}
                            height={400}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>
                <p className="text-base text-gray-700">
                    Que vous soyez amateur de cuisine française ou simplement à la recherche d&#39;un bon repas, nous
                    avons
                    quelque chose pour ravir vos papilles.
                </p>
            </div>

            <div className="relative w-screen mt-6">
                <Image
                    src="/images/restaurant.jpg"
                    alt="Restaurant intérieur"
                    width={1200}
                    height={600}
                    className="w-screen max-h-[700px] object-contain"
                />
                <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs md:text-base font-semibold bg-black bg-opacity-50 px-3 py-1 rounded-md text-center max-w-[90%]">
                    L&#39;équipe de Mets & Merveilles promet une expérience inoubliable.
                </p>
            </div>
        </Container>
    );
}
