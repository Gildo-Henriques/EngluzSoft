// src/types/index.ts
export interface Seller {
  id: number;
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
  price: string; // Ex.: "225,000,000 AOA" ou "1,080,000 AOA/mês"
  category: string; // Ex.: "venda", "renda", "terreno"
  description: string;
  size: string; // Ex.: "120m²"
  bedrooms: number;
  bathrooms: number;
  garage?: number;
  yearBuilt?: number;
  image: string; // Imagem principal
  images: string[]; // Galeria de imagens
  owner: string;
  seller: Seller;
  coordinates: { lat: number; lng: number };
}