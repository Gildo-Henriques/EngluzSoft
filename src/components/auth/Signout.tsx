
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
export default function Signout(){
    return (
        <form action="" className="w-[400px] px-5 space-y-3 mx-auto z-30">

            <div className="border-l-4 border-black text-2xl px-5 mb-10">
                <h2>Crie uma conta</h2>
            </div>
            <Input type="text" className="" placeholder="Nome completo" />
            <Input type="email" className="" placeholder="email" />
            <Input type="password" className="shadow-2xs" placeholder="criar senha"/>
            <Input type="password" className="shadow-2xs" placeholder="confirmar senha"/>
            <div className="text-center">
            </div>
            <Button type="submit" className="w-full py-5 flex items-center rounded cursor-pointer bg-blue-500 hover:bg-blue-400 text-white text-center">
               <span>Concluido </span>
                
            </Button>
            <div className="flex justify-center">
            <span className="text-xs text-center">Ou</span>
            </div>
            <Button type="submit" className="w-full py-5 flex items-center rounded cursor-pointer bg-black text-white text-center">
               <span>Criar com </span>
                <Image src={'/images/google.png'} className="size-5" width={500} height={500} alt="google png" />
            </Button>


        </form>
    )
}