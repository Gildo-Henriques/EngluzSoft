import Hero from "@/components/ui/Hero";
import Image from "next/image"
import ImoveisDetails from "../../components/ui/imoveisDetails";

export default function Home() {
  return (
      <main className="w-full flex space-y-20 flex-col"> 
        <Hero/>
        <ImoveisDetails />
      </main>
  );
}
