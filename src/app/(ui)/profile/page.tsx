"use client";
import { useState } from "react";
import SellerInfo from "@/components/seller-info";
import PropertyList from "@/components/property-list";
import PropertyForm from "@/components/property-form";
import { Seller, Imovel } from "@/types";
import { imoveisData } from "@/data/imoveis";

export default function SellerProfile() {
  const [seller, setSeller] = useState<Seller>({
    id: 1,
    name: "Domingos Afonso",
    photo: "/images/Vera.jpeg",
    contact: {
      whatsapp: "+244923456789",
      phone: "+244923456789",
      location: "Maianga, Luanda",
    },
  });

  const [properties, setProperties] = useState<Imovel[]>(
    imoveisData.filter((imovel) => imovel.seller.id === seller.id)
  );

  const [showPropertyForm, setShowPropertyForm] = useState(false);

  const handleUpdateSeller = (updatedSeller: Seller) => {
    setSeller(updatedSeller);
  };

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter((prop) => prop.id !== id));
  };

  const handleCreateProperty = (newProperty: Imovel) => {
    setProperties([...properties, { ...newProperty, id: Date.now() }]);
    setShowPropertyForm(false);
  };

  return (
    <body className="bg-slate-100">
      <div className="max-w-7xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold mt-20 mb-6">Perfil </h1>
      {showPropertyForm ? (
  <PropertyForm
    sellerId={seller.id}
    onSubmit={handleCreateProperty}
    onCancel={() => setShowPropertyForm(false)}
  />
) : (
  <div className="flex flex-col gap-6">
    <SellerInfo seller={seller} onUpdate={handleUpdateSeller} />
    <div className="flex-1">
      <PropertyList
        properties={properties}
        onDelete={handleDeleteProperty}
        onAddProperty={() => setShowPropertyForm(true)}
      />
    </div>
  </div>
)}
     
    </div>
    </body>
    
  );
}