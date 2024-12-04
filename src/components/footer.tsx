import {Button} from './ui/button';
import Container from './container';

export default function Footer() {
    return (
        <footer className="bg-white ">
            <Container>
                <div className="w-full bg-hero/30 grid grid-cols-2 md:grid-cols-4 px-4 md:px-12 py-8">
                    <div className="flex flex-col items-start justify-start gap-3">
                        <h2 className="text-3xl font-semibold">Menu</h2>
                        <p className="text-neutral-500 text-sm">Accueil</p>
                        <p className="text-neutral-500 text-sm">Pourquoi Nous Choisir</p>
                        <p className="text-neutral-500 text-sm">Menu Spécial</p>
                        <p className="text-neutral-500 text-sm">Cuisine Récurrente</p>
                        <p className="text-neutral-500 text-sm">Chefs Spéciaux</p>
                    </div>

                    <div className="flex flex-col items-start justify-start gap-3">
                        <h2 className="text-3xl font-semibold">Aide</h2>
                        <p className="text-neutral-500 text-sm">Confidentialité</p>
                        <p className="text-neutral-500 text-sm">Conditions Générales</p>
                        <p className="text-neutral-500 text-sm">Politique</p>
                    </div>

                    <div className="flex flex-col items-start justify-start gap-3">
                        <h2 className="text-3xl font-semibold">Contact</h2>
                        <p className="text-neutral-500 text-sm">+33 1 23 45 67 89</p>
                        <p className="text-neutral-500 text-sm">info@metsetmerveilles.com</p>
                        <p className="text-neutral-500 text-sm">123 Rue de Paris, France</p>
                    </div>

                    <div className="flex flex-col items-start justify-start gap-3">
                        <h2 className="text-3xl font-semibold">Abonnez-vous à notre newsletter</h2>
                        <div className="w-full rounded-md border-2 border-emerald-500 flex items-center justify-center">
                            <input
                                type="text"
                                placeholder="Entrez votre email"
                                className="h-full bg-transparent pl-4 text-sm text-neutral-500 w-full outline-none border-none"
                            />
                            <Button className="bg-emerald-500 rounded-tr-none rounded-br-none hover:bg-emerald-600">
                                S&apos;abonner
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mx-auto py-8 ">
                    <p className="text-center text-xs text-black">
                        &copy; 2023 Mets & Merveilles, Inc. Tous droits réservés
                    </p>
                </div>
            </Container>
        </footer>
    );
}