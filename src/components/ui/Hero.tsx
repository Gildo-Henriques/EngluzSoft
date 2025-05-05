// import Link from "next/link";
// import {  } from "lucide-react";
import Image from "next/image";
import {CarouselHero, CarouselHeroCard} from "./carousel";



const slides = [
  "/images/predio.jpg",
  "/images/sonho.jpg",
  "/images/talento.jpg",
];


export default function Hero() {
  return (
    <section className="lg:h-[750px] h-auto w-full relative">



      <section className="">
        <CarouselHero>
          {slides.map((s, index) => (
            <Image
              className="object-cover w-full h-full"
              key={s}
              src={s}
              width={1920}
              height={1080}
              alt={`Slide ${index + 1}`}
            />
          ))}
          
        </CarouselHero>

      </section>
      <CarouselHeroCard/>
    </section>
  );
}
