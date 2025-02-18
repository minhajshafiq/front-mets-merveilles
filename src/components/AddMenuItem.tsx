'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function AddMenuItem() {
    const [formData, setFormData] = useState({
        type: 'starter', // Par défaut : starter
        name: '',
        price: '',
        description: '',
        menuId: '', // Par défaut : vide
        file: null as File | null, // Ajout du champ image
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Vérifier si l'élément est un input de type 'file'
        if (name === 'file') { // Changer 'image' par 'file'
            const input = e.target as HTMLInputElement; // Type assertion pour préciser que c'est un input
            setFormData({
                ...formData,
                file: input.files ? input.files[0] : null, // Récupère le fichier image si présent
            });
        } else {
            setFormData({
                ...formData,
                [name]: name === 'menuId' ? value : value, // Conversion de `menuId` en nombre ou vide
            });
        }
    };

    const handleSelectChange = (value: string) => {
        setFormData({ ...formData, type: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const baseUrl = 'https://back-mets-merveilles-production.up.railway.app'; // URL de ton backend
        const url = `${baseUrl}/${formData.type}`; // URL en fonction du type sélectionné

        console.log(url);

        const formDataToSend = new FormData();

        // Créer un objet dessert à envoyer sous la forme d'un fichier JSON
        const dessertData = {
            name: formData.name,
            price: formData.price,
            description: formData.description,
            menuId: formData.menuId || '', // Assurez-vous que menuId est bien envoyé même s'il est vide
        };

        // Créer un Blob à partir de l'objet JSON
        const jsonBlob = new Blob([JSON.stringify(dessertData)], { type: 'application/json' });

        // Ajouter le fichier JSON sous forme de 'dessert.json'
        formDataToSend.append('data', jsonBlob, 'dessert.json');

        // Ajouter l'image, si présente
        if (formData.file) {
            formDataToSend.append('file', formData.file); // Ajout du fichier image
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formDataToSend,  // Envoi des données et du fichier en multipart/form-data
            });

            if (response.ok) {
                alert('Item ajouté avec succès !');
                setFormData({
                    type: 'starter',
                    name: '',
                    price: '',
                    description: '',
                    menuId: '',
                    file: null,
                });
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.message || 'Une erreur est survenue.'}`);
            }
        } catch (error) {
            console.error(error);
            alert('Impossible de se connecter au serveur.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-xl">Ajouter un élément au menu</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {/* Type */}
                        <div>
                            <Label htmlFor="type">
                                Type <span className="text-red-500"> * </span>
                            </Label>
                            <Select value={formData.type} onValueChange={handleSelectChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sélectionner un type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="starter">Starter</SelectItem>
                                    <SelectItem value="main-course">Main Course</SelectItem>
                                    <SelectItem value="desserts">Desserts</SelectItem>
                                    <SelectItem value="drinks">Drinks</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Nom */}
                        <div>
                            <Label htmlFor="name">
                                Nom <span className="text-red-500"> * </span>
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nom de l'élément"
                                required
                            />
                        </div>

                        {/* Prix */}
                        <div>
                            <Label htmlFor="price">
                                Prix (€) <span className="text-red-500"> * </span>
                            </Label>
                            <Input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Prix"
                                step="0.01"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <Label htmlFor="description">
                                Description <span className="text-red-500"> * </span>
                            </Label>
                            <Input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Description de l'élément"
                                required
                            />
                        </div>

                        {/* ID du menu */}
                        <div>
                            <Label htmlFor="menuId">ID du menu</Label>
                            <Input
                                type="number"
                                name="menuId"
                                value={formData.menuId}
                                onChange={handleChange}
                                placeholder="ID du menu"
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <Label htmlFor="file">Image</Label>
                            <Input
                                type="file"
                                name="file"  // Change ici pour correspondre à "file"
                                onChange={handleChange}
                                accept="image/*"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            Ajouter
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
