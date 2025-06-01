// pages/imoveis/contactar/[sellerId].tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import SellerInfo from "@/components/seller-info";
import { Button } from "@/components/ui/button";
import { imoveisData } from "@/data/imoveis";

interface PageProps {
  params: { sellerId: string };
}

export default function ContactarVendedor({ params }: PageProps) {
  console.log("Params em ContactarVendedor:", params);

  const sellerId = parseInt(params.sellerId);
  if (isNaN(sellerId)) {
    console.error("sellerId inválido:", params.sellerId);
    notFound();
  }

  // Buscar o vendedor e os imóveis associados
  const imoveis = imoveisData.filter((item) => item.seller.id === sellerId);
  if (imoveis.length === 0) {
    console.error("Nenhum imóvel encontrado para sellerId:", sellerId);
    notFound();
  }

  const seller = imoveis[0].seller; // Pegar o vendedor do primeiro imóvel
  if (!seller) {
    console.error("Vendedor não encontrado para sellerId:", sellerId);
    notFound();
  }

  return (
    <section className="w-full ">
      
      
      <div className="max-w-2xl mx-auto px-4 flex flex-col space-y-8">
        <div className="space-y-4 mt-20">
        <h2 className="text-xl font-semibold">Imóveis do Vendedor</h2>
        <div className="flex flex-wrap gap-4">
          {imoveis.map((imovel) => (
            <Link key={imovel.id} href={`/imoveis/${imovel.id}`}>
              <Button
                className="bg-gray-500 text-white hover:bg-gray-400 px-6 py-2"
                aria-label={`Voltar ao imóvel ${imovel.title}`}
              >
                {imovel.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
        <SellerInfo seller={seller} readOnly />
      </div>
    </section>
  );
}