'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import {
  BadgeEuro,
  Banknote,
  Ellipsis,
  HousePlus,
  InspectionPanel,
  User,
} from 'lucide-react';

// Interface para os dados dos imóveis
interface Imovel {
  id: number;
  title: string;
  location: string;
  price: string;
  details: string;
  owner: string;
  image: string; // Imagem principal
  images: string[]; // Array de imagens para o carousel
  category: string;
  description: string; // Descrição detalhada
  size: string; // Tamanho (ex.: 120m²)
  bedrooms: number; // Quantidade de quartos
  bathrooms: number; // Quantidade de banheiros
  garage?: number; // Vagas na garagem (opcional)
  yearBuilt?: number; // Ano de construção (opcional)
}

// Interface para os filtros
interface Filter {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Dados dos imóveis (atualizados com mais informações)
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
    image: '/images/rosa4.jpg',
    images: [
      '/images/rosa4.jpg',
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
    id: 6,
    title: 'Apartamento Premium no Centro',
    location: 'Centro, Luanda',
    price: '$300,000',
    details: '3 Quartos | 2 Banheiros | 130m²',
    owner: 'Clara Lopes',
    image: '/images/rosa2.jpg',
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
    id: 7,
    title: 'Apartamento Premium no Centro',
    location: 'Centro, Luanda',
    price: '$300,000',
    details: '3 Quartos | 2 Banheiros | 130m²',
    owner: 'Jorge de As',
    image: '/images/rosa6.jpg',
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

// Dados dos filtros
const filters: Filter[] = [
  { id: 'destaque', label: 'Em destaque', icon: <User size={20} /> },
  { id: 'venda', label: 'A venda', icon: <BadgeEuro size={20} /> },
  { id: 'renda', label: 'A renda', icon: <Banknote size={20} /> },
  { id: 'apartamento', label: 'Apartamento', icon: <HousePlus size={20} /> },
  { id: 'terreno', label: 'Terreno', icon: <InspectionPanel size={20} /> },
  { id: 'mais', label: 'Ver mais', icon: <Ellipsis size={20} /> },
];

// Componente para cada card de imóvel
function ImovelCard({ imovel }: { imovel: Imovel }) {
  return (
    <div className="flex flex-col w-full h-96 space-y-3 rounded-xl overflow-hidden">
      <Image
        src={imovel.image}
        width={500}
        height={500}
        alt={imovel.title}
        className="h-48 2xl:h-52 w-full rounded-xl object-cover"
      />
      <div className="flex flex-col space-y-1 px-2">
        <span className="font-semibold text-lg">{imovel.title}</span>
        <span className="text-sm text-gray-600">{imovel.location}</span>
        <span className="text-xl font-semibold text-blue-500">{imovel.price}</span>
        <span className="text-sm">{imovel.details}</span>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm">{imovel.owner}</span>
          <Link href={`/imoveis/${imovel.id}`}>
            <Button
              className="bg-transparent border hover:bg-blue-500 text-blue-500 hover:text-white border-blue-500 text-sm py-1 px-3"
              aria-label={`Ver detalhes de ${imovel.title}`}
            >
              Ver Detalhes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Componente principal
export default function ImoveisDetails() {
  const [activeFilter, setActiveFilter] = useState('destaque');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filtra os imóveis com base na categoria ativa
  const filteredImoveis = imoveisData.filter(
    (imovel) =>
      activeFilter === 'mais' ||
      activeFilter === 'apartamento' ||
      imovel.category === activeFilter
  );

  // Funções para navegação do carousel
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? filteredImoveis.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === filteredImoveis.length - 1 ? 0 : prev + 1));
  };

  // Autoplay para o carousel
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 4000);
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <section className="w-full space-y-5 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-28 flex flex-col mt-44 lg:mt-0">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold titillium-web-semibold">
        O que está procurando?
      </h2>
      {/* Filtros */}
      <div
        className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-gray-100 lg:bg-transparent rounded-lg p-2 sm:p-4"
        role="tablist"
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => {
              setActiveFilter(filter.id);
              setCurrentSlide(0);
            }}
            className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg transition-all duration-200 ${
              activeFilter === filter.id
                ? 'bg-black text-white'
                : 'text-gray-800 hover:bg-slate-100'
            }`}
            aria-label={`Filtrar por ${filter.label}`}
            aria-selected={activeFilter === filter.id}
            role="tab"
          >
            {filter.icon}
            <span className="text-sm mt-1 hidden sm:block">{filter.label}</span>
          </button>
        ))}
      </div>
      {/* Carousel para mobile (<lg) */}
      {filteredImoveis.length > 0 ? (
        <div className="block lg:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform ease-in-out duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {filteredImoveis.map((imovel) => (
                <div key={imovel.id} className="min-w-full">
                  <ImovelCard imovel={imovel} />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
            <Button
              className="text-white bg-transparent hover:bg-white/20"
              onClick={prevSlide}
              aria-label="Slide anterior"
            >
              <ChevronLeft size={24} />
            </Button>
            <Button
              className="text-white bg-transparent hover:bg-white/20"
              onClick={nextSlide}
              aria-label="Próximo slide"
            >
              <ChevronRight size={24} />
            </Button>
          </div>
          <div className="flex justify-center mt-2">
            {filteredImoveis.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${
                  currentSlide === index ? 'bg-blue-500' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="block lg:hidden text-center py-4">
          <p className="text-gray-600">Nenhum imóvel encontrado para este filtro.</p>
        </div>
      )}
      {/* Grid para telas maiores (>=lg) */}
      {filteredImoveis.length > 0 ? (
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImoveis.map((imovel) => (
            <ImovelCard key={imovel.id} imovel={imovel} />
          ))}
        </div>
      ) : (
        <div className="hidden lg:block text-center py-4">
          <p className="text-gray-600">Nenhum imóvel encontrado para este filtro.</p>
        </div>
      )}
    </section>
  );
}