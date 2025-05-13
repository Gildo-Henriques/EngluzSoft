'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './sheet';
import { Button } from './button';
import { useEffect, useState, useRef } from 'react';

// Sugestões de pesquisa, incluindo todos os municípios de Luanda
const searchSuggestions = [
  'Apartamentos',
  'Casas',
  'Terrenos',
  'Imóveis à Venda',
  'Imóveis para Alugar',
  'Luanda',
  'Belas',
  'Cacuaco',
  'Cazenga',
  'Icolo e Bengo',
  'Quilamba',
  'Viana',
  'Talatona',
  'Kilamba',
];

export default function HeaderNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Lógica de scroll para mudar o fundo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focar no input quando aberto
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Fechar a pesquisa ao clicar fora ou pressionar Esc
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.search-suggestions') &&
        !(event.target as HTMLElement).closest('.search-button')
      ) {
        setIsSearchOpen(false);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Submeter a pesquisa
  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/imoveis?query=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`fixed w-full h-14 flex shadow-2xs items-center z-50 transition-all duration-300 px-4 sm:px-6 md:px-10 top-0 lg:px-16 2xl:px-28 ${
        isScrolled ? 'bg-white text-black' : 'bg-transparent text-white'
      }`}
    >
      <div className="flex w-full justify-between items-center">
        {/* Logo */}
        <span className="font-semibold text-lg">EngluzSoft</span>
        <div className="flex items-center space-x-4">
          {/* Ícone de Pesquisa */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center cursor-pointer"
              aria-label="Abrir campo de pesquisa"
            >
              <Search size={20} />
            </button>
            {isSearchOpen && (
              <div className="absolute top-12 sm:left-auto sm:right-0 -left-52 w-72 sm:w-80 bg-white rounded-lg shadow-lg z-50">
                <div className="flex items-center">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar imóveis..."
                    className="w-full px-4 py-2 text-black rounded-t-lg border-b focus:outline-none"
                    aria-label="Campo de pesquisa de imóveis"
                  />
                  <Button
                    className="search-button bg-transparent text-black hover:bg-gray-100 p-2"
                    onClick={handleSearch}
                    aria-label="Submeter pesquisa"
                  >
                    <Search size={16} />
                  </Button>
                </div>
                <div className="search-suggestions max-h-60 overflow-y-auto rounded-b-lg">
                  {searchSuggestions
                    .filter((suggestion) =>
                      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((suggestion, index) => (
                      <Link
                        key={index}
                        href={`/imoveis?query=${encodeURIComponent(suggestion)}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        {suggestion}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
          {/* Ícone de Carrinho */}
          <Link href="/carrinho" className="relative flex items-center cursor-pointer">
            <div className="bg-red-500 w-4 h-4 flex items-center justify-center absolute -top-1 -right-1 text-xs text-white rounded-full">
              <span>0</span>
            </div>
            <ShoppingCart size={20} />
          </Link>
          {/* Menu Mobile */}
          <Sheet>
            <SheetTrigger className="lg:hidden flex items-center cursor-pointer" asChild>
              <button aria-label="Abrir menu">
                <Menu size={20} />
              </button>
            </SheetTrigger>
            <SheetContent className="bg-white" side="right">
              <SheetHeader>
                <SheetTitle>MENU</SheetTitle>
                <SheetDescription>Navegue pelo site</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-4">
                <Link href="/carrinho" className="flex items-center space-x-2">
                  <ShoppingCart size={20} />
                  <span>Carrinho</span>
                </Link>
                <Link href="/auth/signin" className="flex items-center space-x-2">
                  <span>Entrar</span>
                </Link>
                <Link href="/auth/signout" className="flex items-center space-x-2">
                  <Button className="bg-blue-500 text-white hover:bg-blue-400 w-full">
                    Criar conta
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          {/* Links Desktop */}
          <div className="lg:flex hidden items-center space-x-4">
            <Link href="/auth/signin" className="flex items-center">
              <span>Entrar</span>
            </Link>
            <Link href="/auth/signout">
              <Button className="bg-blue-500 text-white hover:bg-blue-400">
                Criar conta
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}