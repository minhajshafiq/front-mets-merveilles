"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log({ name, email, phone, message });
    };

    return (
        <div>
            {/* Container de texte */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <p className="text-xl text-gray-700">
                    Nous sommes heureux de vous entendre. Si vous avez des questions ou des demandes spécifiques,
                    n&#39;hésitez pas à nous contacter en remplissant le formulaire ci-dessous.
                </p>

                {/* Ligne email et téléphone */}
                <div className="flex justify-center space-x-8 text-lg text-gray-600">
                    <div>
                        <p className="font-semibold">Email :</p>
                        <p>contact@example.com</p>
                    </div>
                    <div>
                        <p className="font-semibold">Téléphone :</p>
                        <p>+33 1 23 45 67 89</p>
                    </div>
                </div>

                {/* Ligne noire */}
                <div className="w-full border-t border-gray-300 my-4"></div>
            </div>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow-md space-y-4">

                <h2 className="text-2xl font-semibold text-center">Contactez-nous</h2>
                <Input
                    required
                    type="text"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    required
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    required
                    type="tel"
                    placeholder="Numéro de téléphone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Textarea
                    required
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit" className="w-full">Envoyer</Button>
            </form>
        </div>
    );
}