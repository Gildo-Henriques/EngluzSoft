// pages/imoveis/[id].tsx
import Image from "next/image";
import { Bath, BedDouble, CarFront, MapPin } from "lucide-react"
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { imoveisData } from "@/data/imoveis";
import PropertyMap from "@/components/propertyMap";

interface PageProps {
  params: { id: string };
}

export default function ImovelDetalhes({ params }: PageProps) {
  console.log("Params em ImovelDetalhes:", params);

  const id = parseInt(params.id);
  if (isNaN(id)) {
    console.error("ID inválido:", params.id);
    notFound();
  }

  const imovel = imoveisData.find((item) => item.id === id);
  if (!imovel) {
    console.error("Imóvel não encontrado para ID:", id);
    notFound();
  }

  console.log("Preparando redirecionamento para contactar:", imovel.seller.id);

  return (
    <section className="w-full lg:mt-20 mt-10 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-28 py-10 flex flex-col space-y-8">
      <span className="bg-blue-500 text-white px-5 py-2 w-auto self-start">Para {imovel.category}</span>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold titillium-web-semibold">
        {imovel.title}
      </h1>
      <span className="flex items-center space-x-2 text-gray-600 text-lg">
        <MapPin/>  <span>{imovel.location}</span>
      </span>
      <h2 className="text-blue-500 font-bold text-3xl">{imovel.price}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {imovel.image ? (
            <div className="relative h-96 rounded-xl overflow-hidden shadow-md">
              <Image
                src={imovel.image}
                fill
                alt={`Imagem principal do imóvel ${imovel.title}`}
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="h-96 bg-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-gray-500">Sem imagem</span>
            </div>
          )}
        </div>
        {imovel.images.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {imovel.images.slice(0).map((image, index) => (
              <div
                key={index}
                className="relative h-48 rounded-xl overflow-hidden shadow-md"
              >
                <Image
                  src={image}
                  fill
                  alt={`Imagem ${index + 1} do imóvel ${imovel.title}`}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 gap-8">
        <div className="space-y-4 ">
          <h2 className="text-xl font-semibold">Detalhes do Imóvel</h2>
          <div className="items-center flex justify-between flex-wrap">
            <div className="flex items-center space-x-5">
              <BedDouble className="text-blue-500" /> <div className="flex flex-col "> <strong>Quartos:</strong> {imovel.bedrooms}</div>
            </div>
            <div className="flex items-center space-x-5">
              <Bath className="text-blue-500" /> <div className="flex flex-col ">              <strong>Banheiros:</strong> {imovel.bathrooms}</div>
            </div>
            <div className="flex items-center space-x-5">
              <CarFront className="text-blue-500" /> <div className="flex flex-col "> {imovel.garage && (
              <p className="flex flex-col">
                <strong>Garagem:</strong> {imovel.garage} vaga(s)
              </p>
            )} </div>
            </div>

            
           
           
            
          </div>
          <div className="space-y-5">
             <h2 className="text-xl font-semibold">Extras</h2>
             <div className="">
              <p>
              <strong>Localização:</strong> {imovel.location}
            </p>

            <p>
              <strong>Tamanho:</strong> {imovel.size}
            </p>
            {imovel.yearBuilt && (
              <p>
                <strong>Ano de Construção:</strong> {imovel.yearBuilt}
              </p>
            )}
            <p>
              <strong>Proprietário:</strong> {imovel.owner}
            </p>
             </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Descrição</h2>
          <p className="text-gray-600">{imovel.description}</p>
                      <p>
              <strong>Resumo:</strong> {imovel.details}
            </p>
          <Link href={`/imoveis/contactar/${imovel.seller.id}`}>
            <Button
              className="bg-blue-500 text-white hover:bg-blue-400 px-6 py-2"
              aria-label="Contactar proprietário"
            >
              Contactar Proprietário
            </Button>
          </Link>
        </div>
      </div>
      {imovel.coordinates && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Localização no Mapa</h2>
          <PropertyMap coordinates={imovel.coordinates} location={imovel.location} />
        </div>
      )}
    </section>
  );
}