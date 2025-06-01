// app/imoveis/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { imoveisData, Imovel } from '../../../../data/imoveis'; // Ajuste o caminho
import SearchBar from '../../../../components/ui/searchbar';
import { Button } from '../../../../components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react'; // Ícone de coração para favoritar
import { toast } from 'react-toastify';

export default function ImoveisPage() {
  // Mostra apenas os primeiros 3 imóveis inicialmente
  const initialImoveis = imoveisData.slice(0, 3);
  const [filteredImoveis, setFilteredImoveis] = useState<Imovel[]>(initialImoveis);
  const [favorites, setFavorites] = useState<number[]>([]); // IDs dos imóveis favoritados

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    if (query.trim() === '') {
      // Se a pesquisa estiver vazia, mostra os imóveis iniciais
      setFilteredImoveis(initialImoveis);
    } else {
      // Filtra todos os imóveis do imoveisData
      const filtered = imoveisData.filter(
        (imovel) =>
          imovel.title.toLowerCase().includes(lowerCaseQuery) ||
          imovel.location.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredImoveis(filtered);
    }
  };

  const toggleFavorite = (imovelId: number) => {
    setFavorites((prev) => {
      if (prev.includes(imovelId)) {
        toast.info('Imóvel removido dos favoritos.');
        return prev.filter((id) => id !== imovelId);
      } else {
        toast.success('Imóvel adicionado aos favoritos!');
        return [...prev, imovelId];
      }
    });
  };

  return (
    <div className="container mx-auto mt-20 px-4 py-8">
      {/* Barra de Pesquisa */}
      <SearchBar onSearch={handleSearch} />

      {/* Lista de Imóveis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImoveis.length > 0 ? (
          filteredImoveis.map((imovel) => (
            <div
              key={imovel.id}
              className="relative border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
            >
              <Image
                src={imovel.image}
                alt={imovel.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{imovel.title}</h2>
              <p className="text-gray-600 mb-2">{imovel.location}</p>
              <p className="text-lg font-bold text-blue-600 mb-2">{imovel.price}</p>
              <p className="text-sm text-gray-500 mb-2">{imovel.details}</p>
              <p className="text-sm text-gray-700 mb-4">{imovel.description}</p>
              <div className="flex items-center mb-4">
                <Image
                  src={imovel.seller.photo}
                  alt={imovel.seller.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <p className="text-sm font-medium">{imovel.seller.name}</p>
                  <p className="text-xs text-gray-500">{imovel.seller.contact.location}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Link href={`/imoveis/${imovel.id}`}>Ver Detalhes</Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleFavorite(imovel.id)}
                  className={`${
                    favorites.includes(imovel.id) ? 'text-red-500' : 'text-gray-500'
                  } hover:text-red-500`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(imovel.id) ? 'fill-red-500' : ''
                    }`}
                  />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Nenhum imóvel encontrado.
          </p>
        )}
      </div>
    </div>
  );
}