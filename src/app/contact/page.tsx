"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log({ name, email, phone, subject, message });
    };

    return (
        <div className="min-h-screen py-4 px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
                <div className="space-y-3 lg:pl-8">
                    <h1 className="text-2xl font-semibold text-colors-titleGreen">Contactez-nous !</h1>
                    <p className="text-base text-gray-700">
                        Une réservation, une question sur notre menu ou une demande particulière ?
                    </p>
                    <p className="mt-0 text-base text-gray-700">Nous sommes à votre écoute !</p>
                    <div className="flex justify-around w-full text-xs text-gray-800 font-bold">
                        <div className="flex items-center space-x-2">
                            <Phone size={20} className="text-gray-900" />
                            <p className={"text-xs"}>+33 1 23 45 67 89</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail size={20} className="text-gray-900" />
                            <p className={"text-xs"}>info@metsetmerveilles.com</p>
                        </div>
                    </div>
                    <div className="w-full border-t border-gray-400 my-3"></div>
                    <div className="flex justify-center space-x-3 text-gray-900 pl-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <Image src="/images/facebook.svg" width={20} height={20} alt="Facebook Logo" className="w-5 h-5" />
                        </a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                            <Image src="/images/x.svg" width={20} height={20} alt="X Logo" className="w-5 h-5" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <Image src="/images/instagram.svg" width={20} height={20} alt="Instagram Logo" className="w-5 h-5" />
                        </a>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-colors-titleGreen">
                        Un formulaire est également disponible pour plus de praticité.
                    </h3>
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-3 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:gap-3">
                            <div className="flex flex-col sm:w-1/2 w-full">
                                <label htmlFor="name" className="text-xs font-medium text-gray-700 mb-1">
                                    Nom
                                </label>
                                <Input
                                    id="name"
                                    required
                                    type="text"
                                    placeholder="Nom"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col sm:w-1/2 w-full">
                                <label htmlFor="email" className="text-xs font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    required
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phone" className="text-xs font-medium text-gray-700 mb-1">
                                Téléphone
                            </label>
                            <Input
                                id="phone"
                                required
                                type="tel"
                                placeholder="Téléphone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="subject" className="text-xs font-medium text-gray-700 mb-1">
                                Sujet
                            </label>
                            <Input
                                id="subject"
                                required
                                type="text"
                                placeholder="Sujet"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="message" className="text-xs font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <Textarea
                                id="message"
                                required
                                placeholder="Votre message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                        >
                            Envoyer
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
