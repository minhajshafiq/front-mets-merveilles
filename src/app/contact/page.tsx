"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    // Fonctions de validation
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email) ? "" : "Format d'email invalide";
    };

    const validatePhone = (phone: string) => {
        const regex = /^(\+33|0)[1-9](\d{2}){4}$/;
        return regex.test(phone.replace(/\s/g, "")) ? "" : "Format de téléphone invalide";
    };

    const validateLength = (value: string, min: number, field: string) => {
        return value.length < min ? `${field} doit contenir au moins ${min} caractères` : "";
    };

    // Validation en temps réel
    useEffect(() => {
        if (name) setErrors(prev => ({ ...prev, name: validateLength(name, 3, "Le nom") }));
    }, [name]);

    useEffect(() => {
        if (email) setErrors(prev => ({ ...prev, email: validateEmail(email) }));
    }, [email]);

    useEffect(() => {
        if (phone) setErrors(prev => ({ ...prev, phone: validatePhone(phone) }));
    }, [phone]);

    useEffect(() => {
        if (subject) setErrors(prev => ({ ...prev, subject: validateLength(subject, 5, "Le sujet") }));
    }, [subject]);

    useEffect(() => {
        if (message) setErrors(prev => ({ ...prev, message: validateLength(message, 10, "Le message") }));
    }, [message]);

    // Vérifier si le formulaire est valide
    const isFormValid = () => {
        return Object.values(errors).every(error => error === "") &&
            name && email && phone && subject && message;
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        console.log({ name, email, phone, subject, message });
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setName("");
            setEmail("");
            setPhone("");
            setSubject("");
            setMessage("");
            setIsSubmitted(false);
            // Réinitialiser les erreurs
            setErrors({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            });
        }, 3000);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2,
                duration: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const formFieldVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4 }
        }
    };

    const successVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10
            }
        },
        exit: {
            scale: 0.8,
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    const ErrorMessage = ({ message }: { message: string }) => (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-xs mt-1 flex items-center gap-1"
        >
            <AlertCircle size={12} />
            <span>{message}</span>
        </motion.div>
    );

    return (
        <motion.div
            className="py-4 px-8 overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
                {/* Info Side */}
                <motion.div
                    className="space-y-3 lg:pl-8"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <h1 className="text-2xl font-semibold text-colors-titleGreen">
                            Contactez nous !
                        </h1>
                    </motion.div>

                    <motion.p
                        className="text-base text-gray-700"
                        variants={itemVariants}
                    >
                        Une réservation, une question sur notre menu ou une demande particulière ?
                    </motion.p>

                    <motion.p
                        className="mt-0 text-base text-gray-700"
                        variants={itemVariants}
                    >
                        Nous sommes à votre écoute !
                    </motion.p>

                    <motion.div
                        className="flex justify-around w-full text-xs text-gray-800 font-bold"
                        variants={containerVariants}
                    >
                        <motion.div
                            className="flex items-center space-x-2"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                whileHover={{ rotate: 15 }}
                                transition={{ type: "spring", stiffness: 500 }}
                            >
                                <Phone size={20} className="text-gray-900" />
                            </motion.div>
                            <p className={"text-xs"}>+33 1 23 45 67 89</p>
                        </motion.div>

                        <motion.div
                            className="flex items-center space-x-2"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                whileHover={{ rotate: 15 }}
                                transition={{ type: "spring", stiffness: 500 }}
                            >
                                <Mail size={20} className="text-gray-900" />
                            </motion.div>
                            <p className={"text-xs"}>info@metsetmerveilles.com</p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="w-full border-t border-gray-400 my-3"
                        variants={itemVariants}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    ></motion.div>

                    <motion.div
                        className="flex justify-center space-x-3 text-gray-900 pl-4"
                        variants={containerVariants}
                    >
                        <motion.a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Image src="/images/facebook.svg" width={20} height={20} alt="Facebook Logo" className="w-5 h-5" />
                        </motion.a>

                        <motion.a
                            href="https://x.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Image src="/images/x.svg" width={20} height={20} alt="X Logo" className="w-5 h-5" />
                        </motion.a>

                        <motion.a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Image src="/images/instagram.svg" width={20} height={20} alt="Instagram Logo" className="w-5 h-5" />
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Form Side */}
                <motion.div
                    className="space-y-4 relative"
                    variants={containerVariants}
                >
                    <motion.h3
                        className="text-2xl font-semibold text-colors-titleGreen"
                        variants={itemVariants}
                    >
                        Un formulaire est également disponible pour plus de praticité.
                    </motion.h3>

                    <AnimatePresence>
                        {!isSubmitted ? (
                            <motion.form
                                onSubmit={handleSubmit}
                                className="max-w-lg mx-auto p-3 space-y-4 relative"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <motion.div
                                    className="flex flex-col sm:flex-row sm:gap-3"
                                    variants={containerVariants}
                                >
                                    <motion.div
                                        className="flex flex-col sm:w-1/2 w-full"
                                        variants={formFieldVariants}
                                    >
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
                                            className={`transition-all focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'focus:border-green-500 focus:ring-green-200'}`}
                                        />
                                        {errors.name && <ErrorMessage message={errors.name} />}
                                    </motion.div>

                                    <motion.div
                                        className="flex flex-col sm:w-1/2 w-full"
                                        variants={formFieldVariants}
                                    >
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
                                            className={`transition-all focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'focus:border-green-500 focus:ring-green-200'}`}
                                        />
                                        {errors.email && <ErrorMessage message={errors.email} />}
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    className="flex flex-col"
                                    variants={formFieldVariants}
                                >
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
                                        className={`transition-all focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'focus:border-green-500 focus:ring-green-200'}`}
                                    />
                                    {errors.phone && <ErrorMessage message={errors.phone} />}
                                </motion.div>

                                <motion.div
                                    className="flex flex-col"
                                    variants={formFieldVariants}
                                >
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
                                        className={`transition-all focus:ring-2 ${errors.subject ? 'border-red-500 focus:ring-red-200' : 'focus:border-green-500 focus:ring-green-200'}`}
                                    />
                                    {errors.subject && <ErrorMessage message={errors.subject} />}
                                </motion.div>

                                <motion.div
                                    className="flex flex-col"
                                    variants={formFieldVariants}
                                >
                                    <label htmlFor="message" className="text-xs font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        required
                                        placeholder="Votre message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className={`transition-all focus:ring-2 min-h-[100px] ${errors.message ? 'border-red-500 focus:ring-red-200' : 'focus:border-green-500 focus:ring-green-200'}`}
                                    />
                                    {errors.message && <ErrorMessage message={errors.message} />}
                                </motion.div>

                                <motion.div
                                    variants={formFieldVariants}
                                    whileHover={{ scale: isFormValid() ? 1.02 : 1 }}
                                    whileTap={{ scale: isFormValid() ? 0.98 : 1 }}
                                >
                                    <Button
                                        type="submit"
                                        className={`w-full sm:w-auto py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                                            isFormValid()
                                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        }`}
                                        disabled={!isFormValid()}
                                    >
                                        <span>Envoyer</span>
                                        <Send size={16} />
                                    </Button>
                                </motion.div>
                            </motion.form>
                        ) : (
                            <motion.div
                                className="max-w-lg mx-auto p-6 bg-green-50 rounded-lg border border-green-200 text-center"
                                variants={successVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        delay: 0.2
                                    }}
                                    className="flex justify-center mb-4"
                                >
                                    <CheckCircle size={48} className="text-green-500" />
                                </motion.div>
                                <h3 className="text-xl font-semibold text-green-700 mb-2">Message envoyé !</h3>
                                <p className="text-green-600">
                                    Merci de nous avoir contacté. Nous vous répondrons dans les plus brefs délais.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}