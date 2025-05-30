import Link from "next/link"
import Image from "next/image"
export default function Cta(){
    return (
        <section className=" lg:py-12 lg:flex lg:justify-center">
    <div
        className="overflow-hidden bg-white lg:mx-8 lg:flex lg:max-w-7xl lg:px-5 px-0 lg:w-full lg:shadow-md lg:rounded-xl">
        <div className="lg:w-1/2">
            <div className="h-64 bg-cover lg:h-full">
                <Image src="/images/cta.png" width={500} height={500} alt="casas e terrenos"></Image>
            </div>
        </div>

        <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800  md:text-3xl">
                Transforme seu imóvel em negócio
            </h2>

            <p className="mt-4 text-gray-500 ">
                Tem um imóvel para vender? A EngluzSoft é o lugar certo para isso. Aqui você pode anunciar terrenos, casas ou espaços comerciais de forma simples, rápida e segura. Alcance milhares de interessados, aqui, o seu imóvel ganha visibilidade e você faz negócios com confiança.
            </p>

            <div className="inline-flex w-full mt-6 sm:w-auto">
                <Link href="#" className="inline-flex items-center justify-center w-full px-6 py-2 text-sm text-white duration-300 bg-blue-500 rounded-md hover:bg-blue-400 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                    Anunciar imóvel
                </Link>
            </div>
        </div>
    </div>
</section>
    )
}