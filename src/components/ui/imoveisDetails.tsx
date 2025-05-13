"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { BadgeEuro, Banknote, Ellipsis, HousePlus, InspectionPanel, User } from "lucide-react";
import { imoveisData, Imovel } from "@/data/imoveis";

interface Filter {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const filters: Filter[] = [
  { id: "destaque", label: "Em destaque", icon: <User size={20} /> },
  { id: "venda", label: "A venda", icon: <BadgeEuro size={20} /> },
  { id: "renda", label: "A renda", icon: <Banknote size={20} /> },
  { id: "apartamento", label: "Apartamento", icon: <HousePlus size={20} /> },
  { id: "terreno", label: "Terreno", icon: <InspectionPanel size={20} /> },
  { id: "mais", label: "Ver mais", icon: <Ellipsis size={20} /> },
];

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

export default function ImoveisDetails() {
  const [activeFilter, setActiveFilter] = useState("destaque");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dynamicImoveis, setDynamicImoveis] = useState<Imovel[]>([]);

  useEffect(() => {
    const storedImoveis = JSON.parse(localStorage.getItem("imoveis") || "[]");
    setDynamicImoveis(storedImoveis);
  }, []);

  const filteredImoveis = [...imoveisData, ...dynamicImoveis].filter(
    (imovel) =>
      activeFilter === "mais" ||
      activeFilter === "apartamento" ||
      imovel.category === activeFilter
  );

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? filteredImoveis.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === filteredImoveis.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="w-full space-y-5 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-28 flex flex-col mt-44 lg:mt-0">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold titillium-web-semibold">
        O que está procurando?
      </h2>
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
                ? "bg-black text-white"
                : "text-gray-800 hover:bg-slate-100"
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
                  currentSlide === index ? "bg-blue-500" : "bg-gray-400"
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