'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '../../../../components/ui/button';

// Interface para os dados dos imóveis (copiada do ImoveisDetails)
interface Imovel {
  id: number;
  title: string;
  location: string;
  price: string;
  details: string;
  owner: string;
  image: string;
  images: string[];
  category: string;
  description: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  garage?: number;
  yearBuilt?: number;
}

// Dados dos imóveis (copiados do ImoveisDetails para simulação)
// Em uma aplicação real, você pode buscar esses dados de uma API ou banco de dados
const imoveisData: Imovel[] = [
  {
    id: 1,
    title: 'Apartamento de Luxo no Talatona',
    location: 'Talatona, Luanda Sul',
    price: '$250,000',
    details: '3 Quartos | 2 Banheiros | 120m²',
    owner: 'Ana de Sousa',
    image: '/images/predio.jpg',
    images: [
      '/images/predio.jpg',
      '/images/rosa1.jpg',
      '/images/rosa3.jpg',
      '/images/rosa5.jpg',
    ],
    category: 'venda',
    description:
      'Um apartamento moderno e espaçoso no coração de Talatona, com acabamentos de alta qualidade, vista panorâmica e acesso a comodidades premium.',
    size: '120m²',
    bedrooms: 3,
    bathrooms: 2,
    garage: 2,
    yearBuilt: 2020,
  },
  {
    id: 2,
    title: 'Casa Moderna no Benfica',
    location: 'Benfica, Luanda',
    price: '$180,000',
    details: '4 Quartos | 3 Banheiros | 150m²',
    owner: 'João Mendes',
    image: '/images/rosa3.jpg',
    images: [
      '/images/rosa3.jpg',
      '/images/predio.jpg',
      '/images/rosa1.jpg',
      '/images/rosa5.jpg',
    ],
    category: 'venda',
    description:
      'Casa contemporânea com amplo espaço interno e externo, ideal para famílias grandes, localizada em um bairro tranquilo.',
    size: '150m²',
    bedrooms: 4,
    bathrooms: 3,
    garage: 3,
    yearBuilt: 2018,
  },
  {
    id: 3,
    title: 'Apartamento para Renda no Patriota',
    location: 'Patriota, Luanda',
    price: '$1,200/mês',
    details: '2 Quartos | 1 Banheiro | 80m²',
    owner: 'Maria Silva',
    image: '/images/rosa5.jpg',
    images: [
      '/images/rosa5.jpg',
      '/images/predio.jpg',
      '/images/rosa1.jpg',
      '/images/rosa3.jpg',
    ],
    category: 'renda',
    description:
      'Apartamento compacto e bem localizado, perfeito para casais ou solteiros, com fácil acesso ao transporte público.',
    size: '80m²',
    bedrooms: 2,
    bathrooms: 1,
    garage: 1,
  },
  {
    id: 4,
    title: 'Terreno no Kilamba',
    location: 'Kilamba, Luanda',
    price: '$50,000',
    details: '500m²',
    owner: 'Pedro Santos',
    image: '/images/rosa1.jpg',
    images: ['/images/rosa1.jpg', '/images/predio.jpg', '/images/rosa3.jpg'],
    category: 'terreno',
    description:
      'Terreno amplo em uma área em crescimento, ideal para construção residencial ou comercial.',
    size: '500m²',
    bedrooms: 0,
    bathrooms: 0,
  },
  {
    id: 5,
    title: 'Apartamento Premium no Centro',
    location: 'Centro, Luanda',
    price: '$300,000',
    details: '3 Quartos | 2 Banheiros | 130m²',
    owner: 'Clara Lopes',
    image: '/images/predio.jpg',
    images: [
      '/images/predio.jpg',
      '/images/rosa5.jpg',
      '/images/rosa1.jpg',
      '/images/rosa3.jpg',
    ],
    category: 'destaque',
    description:
      'Apartamento de alto padrão no centro de Luanda, com design sofisticado e proximidade a serviços essenciais.',
    size: '130m²',
    bedrooms: 3,
    bathrooms: 2,
    garage: 2,
    yearBuilt: 2022,
  },
  {
    id: 8,
    title: 'Apartamento Premium no Centro',
    location: 'Centro, Luanda',
    price: '$300,000',
    details: '3 Quartos | 2 Banheiros | 130m²',
    owner: 'Clara Lopes',
    image: '/images/cidade.jpg',
    images: [
      '/images/predio.jpg',
      '/images/rosa5.jpg',
      '/images/rosa1.jpg',
      '/images/rosa3.jpg',
    ],
    category: 'destaque',
    description:
      'Apartamento de alto padrão no centro de Luanda, com design sofisticado e proximidade a serviços essenciais.',
    size: '130m²',
    bedrooms: 3,
    bathrooms: 2,
    garage: 2,
    yearBuilt: 2022,
  },
];
interface PageProps {
  params: {id: string}
}

// Componente da página de detalhes
export default async function ImovelDetalhes({ params }: PageProps ) {
  const imovel = imoveisData.find((item) => item.id === parseInt(params.id));

  if (!imovel) {
    notFound(); // Retorna 404 se o imóvel não for encontrado
  }

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-28 py-10 flex flex-col space-y-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold titillium-web-semibold">
        {imovel.title}
      </h1>
      {/* Grid de Imagens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {imovel.images.map((image, index) => (
          <div
            key={index}
            className="relative h-48 sm:h-64 lg:h-72 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <Image
              src={image}
              width={500}
              height={500}
              alt={`Imagem ${index + 1} do imóvel ${imovel.title}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* Informações Detalhadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Detalhes do Imóvel</h2>
          <div className="space-y-2">
            <p>
              <strong>Localização:</strong> {imovel.location}
            </p>
            <p>
              <strong>Preço:</strong> {imovel.price}
            </p>
            <p>
              <strong>Tamanho:</strong> {imovel.size}
            </p>
            <p>
              <strong>Quartos:</strong> {imovel.bedrooms}
            </p>
            <p>
              <strong>Banheiros:</strong> {imovel.bathrooms}
            </p>
            {imovel.garage && (
              <p>
                <strong>Garagem:</strong> {imovel.garage} vaga(s)
              </p>
            )}
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
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Descrição</h2>
          <p className="text-gray-600">{imovel.description}</p>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-400 px-6 py-2"
            aria-label="Contactar proprietário"
          >
            Contactar Proprietário
          </Button>
        </div>
      </div>
    </section>
  );
}