"use client";
import { FC, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export interface Property {
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

interface NewPropertyForm {
  title: string;
  description: string;
  salePrice: number;
  rentPrice: number;
  bedrooms: number;
  area: number;
  photos: string[];
  location: string;
}

interface PropertyFormProps {
  onCreate: (property: Property) => void;
}

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = { lat: -8.8147, lng: 13.2302 }; // Luanda

const PropertyForm: FC<PropertyFormProps> = ({ onCreate }) => {
  const [newProperty, setNewProperty] = useState<NewPropertyForm>({
    title: "",
    description: "",
    salePrice: 0,
    rentPrice: 0,
    bedrooms: 0,
    area: 0,
    photos: [],
    location: "",
  });
  const [mapCoordinates, setMapCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  const handleCreateProperty = () => {
    if (!newProperty.title || !newProperty.location) {
      alert("Título e localização são obrigatórios!");
      return;
    }
    if (newProperty.bedrooms < 0 || newProperty.area < 0) {
      alert("Quartos e área não podem ser negativos!");
      return;
    }
    const property: Property = {
      ...newProperty,
      id: Math.random().toString(),
      photos: newProperty.photos.length ? newProperty.photos : ["/images/default-property.jpg"],
      salePrice: newProperty.salePrice || undefined,
      rentPrice: newProperty.rentPrice || undefined,
      coordinates: mapCoordinates || undefined,
    };
    onCreate(property);
    setNewProperty({
      title: "",
      description: "",
      salePrice: 0,
      rentPrice: 0,
      bedrooms: 0,
      area: 0,
      photos: [],
      location: "",
    });
    setMapCoordinates(null);
    setMapError(null);
  };

  const handleLocationChange = useCallback(async (location: string) => {
    setNewProperty({ ...newProperty, location });
    setMapError(null);
    if (location) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location + ", Angola"
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.status === "OK" && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setMapCoordinates({ lat, lng });
        } else {
          setMapCoordinates(null);
          setMapError("Endereço não encontrado. Tente um endereço mais específico.");
        }
      } catch (error) {
        console.error("Erro ao buscar coordenadas:", error);
        setMapCoordinates(null);
        setMapError("Erro ao carregar o mapa. Verifique a chave da API ou a conexão.");
      }
    } else {
      setMapCoordinates(null);
    }
  }, [newProperty]);

  return (
    <div className="flex flex-col gap-4 mb-6">
      <h3 className="text-lg font-semibold">Criar Novo Anúncio</h3>
      <Input
        placeholder="Título do Imóvel (ex.: Apartamento em Talatona)"
        value={newProperty.title}
        onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
      />
      <Input
        placeholder="Descrição"
        value={newProperty.description}
        onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Valor da Venda (AOA)"
        value={newProperty.salePrice || ""}
        onChange={(e) =>
          setNewProperty({
            ...newProperty,
            salePrice: e.target.value ? Number(e.target.value) : 0,
          })
        }
      />
      <Input
        type="number"
        placeholder="Valor da Renda (AOA/mês)"
        value={newProperty.rentPrice || ""}
        onChange={(e) =>
          setNewProperty({
            ...newProperty,
            rentPrice: e.target.value ? Number(e.target.value) : 0,
          })
        }
      />
      <Input
        type="number"
        placeholder="Número de Quartos"
        value={newProperty.bedrooms || ""}
        onChange={(e) =>
          setNewProperty({
            ...newProperty,
            bedrooms: e.target.value ? Number(e.target.value) : 0,
          })
        }
      />
      <Input
        type="number"
        placeholder="Área (m²)"
        value={newProperty.area || ""}
        onChange={(e) =>
          setNewProperty({
            ...newProperty,
            area: e.target.value ? Number(e.target.value) : 0,
          })
        }
      />
      <Input
        placeholder="Localização (ex.: Maianga, Luanda)"
        value={newProperty.location}
        onChange={(e) => handleLocationChange(e.target.value)}
        aria-label="Digite o endereço do imóvel"
      />
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        onError={(error) => {
          console.error("Erro ao carregar a API do Google Maps:", error);
          setMapError("Erro ao carregar o mapa. Verifique a chave da API.");
        }}
      >
        {newProperty.location && (
          <div>
            {mapError ? (
              <p className="text-red-600">{mapError}</p>
            ) : (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCoordinates || defaultCenter}
                zoom={15}
              >
                {mapCoordinates && <Marker position={mapCoordinates} />}
              </GoogleMap>
            )}
          </div>
        )}
      </LoadScript>
      <Input
        placeholder="URLs das Fotos (separadas por vírgula)"
        value={newProperty.photos.join(",")}
        onChange={(e) =>
          setNewProperty({
            ...newProperty,
            photos: e.target.value ? e.target.value.split(",") : [],
          })
        }
      />
      <Button onClick={handleCreateProperty}>
        <Plus size={20} className="mr-2" /> Criar Anúncio
      </Button>
    </div>
  );
};

export default PropertyForm;