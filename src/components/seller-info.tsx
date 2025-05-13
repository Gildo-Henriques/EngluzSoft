// src/components/seller-info.tsx
"use client";
import { FC, useState } from "react";
import Image from "next/image";
import { Phone, MapPin, MessageCircle, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Seller {
  id: number;
  name: string;
  photo: string;
  contact: {
    whatsapp: string;
    phone: string;
    location: string;
  };
}

interface SellerInfoProps {
  seller: Seller;
  onUpdate?: (updatedSeller: Seller) => void; // Tornar opcional
  readOnly?: boolean;
}

const SellerInfo: FC<SellerInfoProps> = ({ seller, onUpdate, readOnly = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Seller>(seller);

  console.log("SellerInfo - Dados do vendedor:", seller);
  console.log("SellerInfo - readOnly:", readOnly);

  const getInitials = (name: string) => {
    const nameParts = name.trim().split(" ");
    if (nameParts.length === 0) return "";
    const firstInitial = nameParts[0][0] || "";
    const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] || "" : "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const handleEdit = () => {
    if (isEditing) {
      if (onUpdate) {
        onUpdate(formData);
        console.log("Salvando alterações:", formData);
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
      console.log("Entrando no modo de edição");
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden h-auto shadow-lg">
      {isEditing && !readOnly ? (
        <div className="flex flex-col gap-4 p-6">
          <Input
            placeholder="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            placeholder="URL da Foto"
            value={formData.photo}
            onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
          />
          <Input
            placeholder="WhatsApp (+244)"
            value={formData.contact.whatsapp}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: { ...formData.contact, whatsapp: e.target.value },
              })
            }
          />
          <Input
            placeholder="Telefone (+244)"
            value={formData.contact.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: { ...formData.contact, phone: e.target.value },
              })
            }
          />
          <Input
            placeholder="Localização (ex.: Talatona, Luanda)"
            value={formData.contact.location}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: { ...formData.contact, location: e.target.value },
              })
            }
          />
          <Button onClick={handleEdit}>Salvar</Button>
        </div>
      ) : (
        <div className="flex flex-col items-center relative">
          <div className="relative w-full h-72">
            {seller.photo ? (
              <Image
                src={seller.photo}
                alt={`Foto de ${seller.name}`}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Sem foto</span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold">
                {getInitials(seller.name)}
              </div>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 mt-4">{seller.name}</h3>
          <div className="flex flex-col gap-2 text-gray-600 py-5">
            <a
              href={`https://wa.me/${seller.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageCircle size={20} /> {seller.contact.whatsapp}
            </a>
            <a href={`tel:${seller.contact.phone}`} className="flex items-center gap-2">
              <Phone size={20} /> {seller.contact.phone}
            </a>
            <div className="flex items-center gap-2">
              <MapPin size={20} /> {seller.contact.location}
            </div>
          </div>
          {!readOnly && (
            <Button onClick={handleEdit} className="mt-4 mb-5">
              <Edit size={20} className="mr-2" /> Editar Perfil
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SellerInfo;