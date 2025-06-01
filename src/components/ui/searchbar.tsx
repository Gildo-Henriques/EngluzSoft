// components/SearchBar.tsx
'use client';

import { useState } from 'react';
import { Input } from './input';
import { Button } from './button';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');

  const handleSearchClick = () => {
    onSearch(query); // Dispara a pesquisa apenas quando o botão é clicado
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6 flex gap-2">
      <Input
        type="text"
        placeholder="Pesquisar por nome ou localização..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button
        onClick={handleSearchClick}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        Pesquisar
      </Button>
    </div>
  );
}