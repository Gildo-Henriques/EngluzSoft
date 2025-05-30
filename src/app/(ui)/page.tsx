import Hero from "@/components/ui/Hero";
import ImoveisDetails from "../../components/ui/imoveisDetails";
import Cta from "@/components/ui/cta";
import Faq from "@/components/ui/faq";

export default function Home() {
  return (
      <main className="w-full flex space-y-20 flex-col"> 
        <Hero/>
        <ImoveisDetails />
        <Cta />
        <section className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-6">FaQ</h2>
          <div className="w-[500px]">
        <Faq/>
          </div>
        </section>


      </main>
  );
}
