"use client";
import Link from "next/link";
import { FC, useState } from "react";
import Image from "next/image";
import { Phone, MapPin, MessageCircle, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seller } from "@/types"; // Importe do arquivo de tipos

interface SellerInfoProps {
  seller: Seller;
  onUpdate?: (updatedSeller: Seller) => void;
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
    <div className="rounded-lg flex flex-col items-center justify-center overflow-hidden h-auto">
      {isEditing && !readOnly ? (
        <div className="flex flex-col bg-white py-8 w-full *:max-w-2xl items-center gap-4 p-6">
          <div className="w-full">
                      <h2>Editar Perfil</h2>
          </div>
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
          <Button className="mt-4 bg-blue-500 hover:bg-blue-600 w-full text-white"  onClick={handleEdit}>Salvar</Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full relative">
          <div className="relative flex justify-center intems-end bg-gradient-to-r to-blue-950 from-blue-500 w-full h-52">
            {seller.photo ? (
              <Image
                src={seller.photo}
                alt={`Foto de ${seller.name}`}
                width={500}
                height={500}
                className="size-28 object-cover rounded-full -bottom-14 absolute"
               priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Sem foto</span>
              </div>
            )}

          </div>
          <h3 className="text-xl font-bold mb-2 mt-16">{seller.name}</h3>
          <div className="flex w-full">
          <div className="flex lg:justify-between justify-center items-center flex-col lg:flex-row w-full *:flex *:sm:flex-col *:flex-row  gap-2 text-gray-600 py-5">
            <Link
              href={`https://wa.me/${seller.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageCircle size={20} /> <p>{seller.contact.whatsapp}</p>
            </Link>
            <Link href={`tel:${seller.contact.phone}`} className="flex items-center gap-2">
              <Phone size={20} /> <p> {seller.contact.phone}</p>
            </Link>
            <div className="flex items-center gap-2">
              <MapPin size={20} /> <p> {seller.contact.location}</p>
            </div>
          </div>
          </div>

          {!readOnly && (
            <Button onClick={handleEdit} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white mb-5">
              <Edit size={20} className="mr-2" /> Editar Perfil
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SellerInfo;