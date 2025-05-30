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
    title: "Apartamento para Renda no Patriota",
    location: "Patriota, Luanda",
    price: "1,080,000 AOA/",
    quartos: "3",
    quartoDeBanho: "2",
    details: "2 Quartos | 1 Banheiro | 80m²",
    owner: "Maria Silva",
    seller: {
      id: 2, // Maria Silva
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
    id: 3,
    title: "Terreno no Talatona",
    location: "Centro, Luanda",
    price: "27,000,000 AOA",
    quartos: "3",
    quartoDeBanho: "2",
    details: "50 hectares",
    owner: "Clara Lopes",
    seller: {
      id: 3, // Clara Lopes (mesmo vendedor do imóvel 5)
      name: "Clara Lopes",
      photo: "/images/clara.jpeg",
      contact: {
        whatsapp: "+244922345678",
        phone: "+244922345678",
        location: "Centro, Luanda",
      },
    },
    image: "/images/terreno2.jpg",
    images: ["/images/terreno2.1.jpg", "/images/terreno2.2.jpg", "/images/terreno2.3.jpg"],
    category: "terreno",
    description:
      "Terreno no Talatona",
    size: "130m²",
    bedrooms: 0,
    bathrooms: 0,
    garage: 0,
    yearBuilt: 2022,
    coordinates: { lat: -8.8147, lng: 13.2300 },
  },
  {
    id: 4,
    title: "Terreno no Zango",
    location: "Centro, Luanda",
    price: "270,000,000 AOA",
    quartos: "3",
    quartoDeBanho: "2",
    details: "1 hectar",
    owner: "Jorge de Almeida",
    seller: {
      id: 4, // Jorge de Almeida
      name: "Jorge de Almeida",
      photo: "/images/jorge.jpg",
      contact: {
        whatsapp: "+244924567890",
        phone: "+244924567890",
        location: "Centro, Luanda",
      },
    },
    image: "/images/terreno3.jpg",
    images: ["/images/terreno3.1.jpg", "/images/terreno3.2.jpg", "/images/terreno3.3.jpg"],
    category: "terreno",
    description:
      "Terreno no Zango, zona asfaltada",
    size: "130m²",
    bedrooms: 0,
    bathrooms: 0,
    garage: 0,
    yearBuilt: 2022,
    coordinates: { lat: -8.8147, lng: 13.2300 },
  },
];