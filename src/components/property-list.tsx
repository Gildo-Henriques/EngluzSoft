import Image from "next/image";
import Link from "next/link";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property } from "./property-form";

interface PropertyListProps {
  properties: Property[];
  onDelete: (id: string) => void;
}

export default function PropertyList({ properties, onDelete }: PropertyListProps) {
  return (
    <div className="space-y-6">
      <div className="w-full border-blue-500 border space-y-5 rounded-xl p-5">
        <p className="text-slate-700">Anuncie o seu imóvel aqui</p>
        <Link href="/gay">
          <Button className="bg-blue-500 hover:bg-blue-400 text-white">
            Anunciar Imóvel
          </Button>
        </Link>
      </div>
      <div className="grid gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="border p-4 rounded-lg bg-white shadow-md"
          >
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                {property.photos[0] ? (
                  <Image
                    src={property.photos[0]}
                    alt={`Foto principal do imóvel ${property.title}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover rounded-lg"
                    priority
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Sem imagem</span>
                  </div>
                )}
              </div>
              <div className="md:col-span-2 flex flex-col gap-4">
                <div>
                  <h4 className="text-lg font-semibold">{property.title}</h4>
                  <p className="text-gray-600">{property.description}</p>
                  {property.salePrice && (
                    <p className="text-gray-600">
                      Valor da Venda:{" "}
                      {property.salePrice.toLocaleString("pt-AO", {
                        style: "currency",
                        currency: "AOA",
                      })}
                    </p>
                  )}
                  {property.rentPrice && (
                    <p className="text-gray-600">
                      Valor da Renda:{" "}
                      {property.rentPrice.toLocaleString("pt-AO", {
                        style: "currency",
                        currency: "AOA",
                      })}
                      /mês
                    </p>
                  )}
                  <p className="text-gray-600">Quartos: {property.bedrooms}</p>
                  <p className="text-gray-600">Área: {property.area} m²</p>
                  <p className="text-gray-600">Localização: {property.location}</p>
                </div>
                {property.photos.length > 1 && (
                  <div className="grid grid-cols-3 gap-2">
                    {property.photos.slice(1).map((photo, index) => (
                      <Image
                        key={index}
                        src={photo}
                        alt={`Foto secundária ${index + 1} do imóvel ${property.title}`}
                        width={100}
                        height={100}
                        className="w-full h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
                <Button
                  variant="destructive"
                  onClick={() => onDelete(property.id)}
                  className="mt-2 self-start"
                >
                  <Trash size={20} className="mr-2" /> Excluir
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}