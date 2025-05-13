// src/data/imoveis.ts
export interface Seller {
  id: number; // Adicionado
  name: string;
  photo: string;
  contact: {
    whatsapp: string;
    phone: string;
    location: string;
  };
}

export interface Imovel {
  id: number;
  title: string;
  location: string;
  price: string;
  quartos: string;
  quartoDeBanho: string;
  details: string;
  owner: string;
  seller: Seller;
  image: string;
  images: string[];
  category: string;
  description: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  garage?: number;
  yearBuilt?: number;
  coordinates: { lat: number; lng: number };
}

export const imoveisData: Imovel[] = [
  {
    id: 1,
    title: "Apartamento de Luxo no Talatona",
    location: "Talatona, Luanda Sul",
    price: "225,000,000 AOA",
    quartos: "3",
    quartoDeBanho: "2",
    details: "3 Quartos | 2 Banheiros | 120m²",
    owner: "Ana de Sousa",
    seller: {
      id: 1, // Ana de Sousa
      name: "Ana de Sousa",
      photo: "/images/Vera.jpeg",
      contact: {
        whatsapp: "+244923456789",
        phone: "+244923456789",
        location: "Talatona, Luanda",
      },
    },
    image: "/images/predio.jpg",
    images: ["/images/predio.jpg", "/images/rosa1.jpg", "/images/rosa3.jpg", "/images/rosa5.jpg"],
    category: "venda",
    description:
      "Um apartamento moderno e espaçoso no coração de Talatona, com acabamentos de alta qualidade, vista panorâmica e acesso a comodidades premium.",
    size: "120m²",
    bedrooms: 3,
    bathrooms: 2,
    garage: 2,
    yearBuilt: 2020,
    coordinates: { lat: -8.9147, lng: 13.1900 },
  },
  {
    id: 2,
    title: "Casa Moderna no Benfica",
    location: "Benfica, Luanda",
    price: "162,000,000 AOA",
    quartos: "3",
    quartoDeBanho: "2",
    details: "4 Quartos | 3 Banheiros | 150m²",
    owner: "João Mendes",
    seller: {
      id: 2, // João Mendes
      name: "João Mendes",
      photo: "/images/default-property.jpg",
      contact: {
        whatsapp: "+244912345678",
        phone: "+244912345678",
        location: "Benfica, Luanda",
      },
    },
    image: "/images/rosa3.jpg",
    images: ["/images/rosa3.jpg", "/images/predio.jpg", "/images/rosa1.jpg", "/images/rosa5.jpg"],
    category: "venda",
    description:
      "Casa contemporânea com amplo espaço interno e externo, ideal para famílias grandes, localizada em um bairro tranquilo.",
    size: "150m²",
    bedrooms: 4,
    bathrooms: 3,
    garage: 3,
    yearBuilt: 2018,
    coordinates: { lat: -8.9667, lng: 13.1500 },
  },
  {
    id: 3,
    title: "Apartamento para Renda no Patriota",
    location: "Patriota, Luanda",
    price: "1,080,000 AOA/",
    quartos: "3",
    quartoDeBanho: "2",
    details: "2 Quartos | 1 Banheiro | 80m²",
    owner: "Maria Silva",
    seller: {
      id: 3, // Maria Silva
      name: "Maria Silva",
      photo: "/images/default-property.jpg",
      contact: {
        whatsapp: "+244921234567",
        phone: "+244921234567",
        location: "Patriota, Luanda",
      },
    },
    image: "/images/rosa5.jpg",
    images: ["/images/rosa5.jpg", "/images/predio.jpg", "/images/rosa1.jpg", "/images/rosa3.jpg"],
    category: "renda",
    description:
      "Apartamento compacto e bem localizado, perfeito para casais ou solteiros, com fácil acesso ao transporte público.",
    size: "80m²",
    bedrooms: 2,
    bathrooms: 1,
    garage: 1,
    coordinates: { lat: -8.9047, lng: 13.1800 },
  },
  {
    id: 4,
    title: "Terreno no Kilamba",
    location: "Kilamba, Luanda",
    price: "45,000,000 AOA",
    quartos: "3",
    quartoDeBanho: "2",
    details: "500m²",
    owner: "Pedro Santos",
    seller: {
      id: 4, // Pedro Santos
      name: "Pedro Santos",
      photo: "/images/default-property.jpg",
      contact: {
        whatsapp: "+244923987654",
        phone: "+244923987654",
        location: "Kilamba, Luanda",
      },
    },
    image: "/images/rosa1.jpg",
    images: ["/images/rosa1.jpg", "/images/predio.jpg", "/images/rosa3.jpg"],
    category: "terreno",
    description:
      "Terreno amplo em uma área em crescimento, ideal para construção residencial ou comercial.",
    size: "500m²",
    bedrooms: 0,
    bathrooms: 0,
    coordinates: { lat: -8.9947, lng: 13.2700 },
  },
  {
    id: 5,
    title: "Apartamento Premium no Centro",
    location: "Centro, Luanda",
    price: "270,000,000 AOA",
    quartos: "3",
    quartoDeBanho: "2",
    details: "3 Quartos | 2 Banheiros | 130m²",
    owner: "Clara Lopes",
    seller: {
      id: 5, // Clara Lopes (mesmo vendedor para imóveis 5 e 6)
      name: "Clara Lopes",
      photo: "/images/default-property.jpg",
      contact: {
        whatsapp: "+244922345678",
        phone: "+244922345678",
        location: "Centro, Luanda",
      },
    },
    image: "/images/predio.jpg",
    images: ["/images/predio.jpg", "/images/rosa5.jpg", "/images/rosa1.jpg", "/images/rosa3.jpg"],
    category: "destaque",
    description:
      "Apartamento de alto padrão no centro de Luanda, com design sofisticado e proximidade a serviços essenciais.",
    size: "130m²",
    bedrooms: 3,
    bathrooms: 2,
    garage: 2,
    yearBuilt: 2022,
    coordinates: { lat: -8.8147, lng: 13.2300 },
  },
  {
    id: 6,
    title: "Apartamento Premium no Centro",
    location: "Centro, Luanda",
    price: "270,000,000 AOA",
    quartos: "3",
    quartoDeBanho: "2",
    details: "3 Quartos | 2 Banheiros | 130m²",
    owner: "Clara Lopes",
    seller: {
      id: 5, // Clara Lopes (mesmo vendedor do imóvel 5)
      name: "Clara Lopes",
      photo: "/images/default-property.jpg",
      contact: {
        whatsapp: "+244922345678",
        phone: "+244922345678",
        location: "Centro, Luanda",
      },
    },
    image: "/images/rosa2.jpg",
    images: ["/images/predio.jpg", "/images/rosa5.jpg", "/images/rosa1.jpg", "/images/rosa3.jpg"],
    category: "destaque",
    description:
      "Apartamento de alto padrão no centro de Luanda, com design sofisticado e proximidade a serviços essenciais.",
    size: "130m²",
    bedrooms: 3,
    bathrooms: 2,
    garage: 2,
    yearBuilt: 2022,
    coordinates: { lat: -8.8147, lng: 13.2300 },
  },
  {
    id: 7,
    title: "Apartamento Premium no Centro",
    location: "Centro, Luanda",
    price: "270,000,000 AOA",
    quartos: "3",
    quartoDeBanho: "2",
    details: "3 Quartos | 2 Banheiros | 130m²",
    owner: "Jorge de Almeida",
    seller: {
      id: 6, // Jorge de Almeida
      name: "Jorge de Almeida",
      photo: "/images/default-property.jpg",
      contact: {
        whatsapp: "+244924567890",
        phone: "+244924567890",
        location: "Centro, Luanda",
      },
    },
    image: "/images/rosa6.jpg",
    images: ["/images/predio.jpg", "/images/rosa5.jpg", "/images/rosa1.jpg", "/images/rosa3.jpg"],
    category: "destaque",
    description:
      "Apartamento de alto padrão no centro de Luanda, com design sofisticado e proximidade a serviços essenciais.",
    size: "130m²",
    bedrooms: 3,
    bathrooms: 2,
    garage: 2,
    yearBuilt: 2022,
    coordinates: { lat: -8.8147, lng: 13.2300 },
  },
];