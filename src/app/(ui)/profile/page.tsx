"use client";
import { useState } from "react";
import SellerInfo from "@/components/seller-info";
import PropertyList from "@/components/property-list";

interface Seller {
  name: string;
  photo: string;
  contact: {
    whatsapp: string;
    phone: string;
    location: string;
  };
}

interface Property {
  id: string;
  title: string;
  description: string;
  salePrice?: number;
  rentPrice?: number;
  bedrooms: number;
  area: number;
  photos: string[];
  location: string;
  coordinates?: { lat: number; lng: number };
}

export default function SellerProfile() {
  const [seller, setSeller] = useState<Seller>({
    name: "Domingos Afonso",
    photo: "/images/Vera.jpeg",
    contact: {
      whatsapp: "+244923456789",
      phone: "+244923456789",
      location: "Maianga, Luanda",
    },
  });

  const [properties, setProperties] = useState<Property[]>([
    {
      id: "1",
      title: "Apartamento em Talatona",
      description: "Apartamento moderno com vista para o mar, perto do Belas Shopping.",
      salePrice: 150000000,
      rentPrice: 600000,
      bedrooms: 3,
      area: 120,
      photos: ["/images/rosa6.jpg", "/images/rosa5.jpg"],
      location: "Talatona, Luanda, Angola",
      coordinates: { lat: -8.9147, lng: 13.1900 },
    },
    {
      id: "2",
      title: "Casa em Benguela",
      description: "Casa espaçosa ideal para famílias, com quintal.",
      salePrice: 80000000,
      bedrooms: 4,
      area: 200,
      photos: ["/images/rosa5.jpg", "/images/rosa6.jpg"],
      location: "Benguela, Angola",
      coordinates: { lat: -12.5783, lng: 13.4055 },
    },
  ]);

  const handleUpdateSeller = (updatedSeller: Seller) => {
    setSeller(updatedSeller);
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter((prop) => prop.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Perfil do Vendedor</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* SellerInfo à esquerda */}
        <SellerInfo seller={seller} onUpdate={handleUpdateSeller} />
        {/* PropertyList à direita */}
        <div className="flex-1">
          <PropertyList properties={properties} onDelete={handleDeleteProperty} />
        </div>
      </div>
    </div>
  );
}