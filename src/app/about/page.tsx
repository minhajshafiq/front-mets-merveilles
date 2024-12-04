import Container from "@/components/container";

export default function About() {
    return (
        <Container className="px-4 md:px-12 py-12">
            <h1 className="text-4xl font-bold mb-6">À propos de nous</h1>
            <p className="mb-4">
                Mets & Merveilles est un restaurant familial situé au cœur de Paris.
                Nous sommes passionnés par la cuisine traditionnelle et souhaitons
                partager notre amour de la gastronomie avec nos clients.
            </p>
            <p className="mb-4">
                Notre menu propose des plats faits maison, préparés avec des ingrédients
                frais et de qualité. Que vous soyez amateur de cuisine française ou
                simplement à la recherche d&apos;un bon repas, nous avons quelque chose pour
                ravir vos papilles.
            </p>
            <p className="mb-4">
                L&apos;équipe de Mets & Merveilles s&apos;engage à offrir une expérience inoubliable
                à chaque visite. Nous croyons que chaque repas est une occasion de créer
                des souvenirs et de rassembler les gens.
            </p>
            <p>
                Nous vous invitons à venir découvrir notre restaurant et à savourer
                nos délices culinaires. À très bientôt chez Mets & Merveilles !
            </p>
        </Container>
    );
}