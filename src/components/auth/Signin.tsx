
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
export default function Signin(){
    return (
        <form action="" className="w-[400px] px-5 space-y-3 mx-auto z-30">

            <div className="border-l-4 border-black text-2xl px-5 mb-10">
                <h2>Já tem uma conta?</h2>
            </div>
            <Input type="email" className="" placeholder="email" />
            <Input type="password" className="shadow-2xs" placeholder="senha"/>
            <div className="text-center">
            </div>
            <Button type="submit" className="w-full py-5 flex items-center rounded cursor-pointer bg-blue-500 hover:bg-blue-400 text-white text-center">
               <span>Concluido </span>
                
            </Button>
            <div className="flex justify-center">
            <span className="text-xs text-center">Ou</span>
            </div>
            <Button type="submit" className="w-full py-5 flex items-center rounded cursor-pointer bg-black text-white text-center">
               <span>Entrar com </span>
                <Image src={'/images/google.png'} className="size-5" width={500} height={500} alt="google png" />
            </Button>
            <div className="flex flex-col justify-start items-start ">
                <Button variant={'link'} className="cursor-pointer">Não tenho uma conta</Button>
                <Button variant={'link'} className="cursor-pointer">Esqueci a palavra passe</Button>
            </div>

        </form>
    )
}