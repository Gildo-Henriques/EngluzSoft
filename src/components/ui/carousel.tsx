'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { Children } from 'react';
import Image from 'next/image';

// Seu componente DivBlackTranparent
interface Props {
  title?: string;
  text?: string;
}

function DivBlackTranparent({ title, text }: Props) {
  return (
    <div className="w-full text-white h-full bg-gradient-to-t justify-end space-y-2 flex flex-col p-5 absolute top-0 left-0 from-black/70 to-black/20">
      <span className="font-semibold z-20">{title}</span>
      <span className="text-xs z-20">{text}</span>
    </div>
  );
}

// Componente CarouselHero (intocado, exatamente como você forneceu)
interface CarouselProps {
  children: ReactNode;
}

export function CarouselHero({ children }: CarouselProps) {
  const [curr, setCurr] = useState(0);
  const slides = Children.toArray(children); // Converte ReactNode em array

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  useEffect(() => {
    const slideInterval = setInterval(next, 4000);
    return () => clearInterval(slideInterval);
  }, [curr]);
  return (
    <div className="max-w-full flex flex-col items-center justify-center relative">
      <div className="overflow-hidden h-[500px] relative w-full">
        <div className="h-full flex-col w-full z-10 text-white absolute flex items-center justify-center top-0 left-0 bg-gradient-to-t from-black/90 to-black/50 space-y-2">
          <span className="border rounded-full px-5 py-1">Sistema de geoprocessamento imobiliário</span>
          <h1 className="sm:text-4xl text-3xl text-center titillium-web-semibold">
            Encontre, compre e venda imóveis em Luanda com <br className="lg:flex hidden" /> segurança garantida
          </h1>
          <div className="flex space-x-2 mt-5 items-center">
            <Button className="bg-white px-5 py-2 text-black hover:bg-slate-300">Procurar Imóveis</Button>
            <Button className="bg-blue-500 hover:bg-blue-400 px-5 py-2 text-white ">Anunciar Imóveis</Button>
          </div>
        </div>
        <div
          className="flex transition-transform h-full ease-in-out duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="flex-none w-full">
              {slide}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 transform z-10 -translate-y-1/2 w-full flex justify-between px-5">
        <Button className="text-white bg-transparent" onClick={prev}>
          <ChevronLeft size={40} />
        </Button>
        <Button className="text-white bg-transparent" onClick={next}>
          <ChevronRight size={40} />
        </Button>
      </div>
    </div>
  );
}

// Componente CarouselHeroCard (revisado)
export function CarouselHeroCard() {
  // Estado para controlar o slide atual
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dados dos slides
  const carouselItems = [
    {
      title: 'Realizar sonhos',
      text: 'Escolha o lugar onde quer morar dos seus sonhos',
      image: '/images/familia.jpg',
    },
    {
      title: 'Vender Imóveis',
      text: 'Faça negócios de imóveis aqui.',
      image: '/images/sonho.jpg',
    },
    {
      title: 'Arrendar Imóveis',
      text: 'Construa uma renda passiva',
      image: '/images/venda.jpg',
    },
    {
      title: 'Comprar Imóveis',
      text: 'Compre casas e terrenos aqui',
      image: '/images/imobiliaria.jpg',
    },
  ];

  // Funções para navegação
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  // Autoplay
  
  return (
    <section className="w-full -mt-28 absolute z-10 flex justify-center">
      <div className="bg-muted flex flex-col justify-between gap-x-5 px-5 sm:px-10 sm:w-3/4 w-[95%] py-5 space-y-5 rounded-xl">
        <h2 className="text-white sm:text-2xl text-lg">Local apropriado para:</h2>

        {/* Carousel para mobile (visível apenas em telas <lg) */}
        <div className="block lg:hidden relative">
          <div className="overflow-hidden h-48">
            <div
              className="flex transition-transform ease-in-out duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {carouselItems.map((item, index) => (
                <div key={index} className="min-w-full h-48 relative overflow-hidden rounded-xl">
                  <DivBlackTranparent title={item.title} text={item.text} />
                  <Image
                    src={item.image}
                    className="h-full w-full rounded-lg object-cover"
                    width={500}
                    height={500}
                    alt={item.title || 'Imagem do slide'}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Botões de navegação */}
          <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-5">
            <Button
              className="text-white bg-transparent hover:bg-white/20"
              onClick={prevSlide}
              aria-label="Slide anterior"
            >
              <ChevronLeft size={40} />
            </Button>
            <Button
              className="text-white bg-transparent hover:bg-white/20"
              onClick={nextSlide}
              aria-label="Próximo slide"
            >
              <ChevronRight size={40} />
            </Button>
          </div>
          {/* Indicadores de slide (dots) */}
          <div className="flex justify-center mt-2">
            {carouselItems.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${
                  currentSlide === index ? 'bg-white' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Layout flex para desktop (visível em telas >=lg) */}
        <div className="hidden lg:flex justify-between">
          {carouselItems.map((item, index) => (
            <div key={index} className="lg:h-48 lg:w-60 relative overflow-hidden rounded-xl">
              <DivBlackTranparent title={item.title} text={item.text} />
              <Image
                src={item.image}
                className="h-full rounded-lg object-cover"
                width={500}
                height={500}
                alt={item.title || 'Imagem do slide'}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}