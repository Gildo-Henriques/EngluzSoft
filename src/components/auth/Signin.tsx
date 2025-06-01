// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Image from "next/image";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext"; // Ajuste o caminho

export default function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success("Login realizado com sucesso!");
      router.push("/");
    } catch (error: any) {
      // Usando 'any' temporariamente; pode ser refinado
      toast.error(
        error.message || "Erro ao fazer login. Verifique suas credenciais."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Login com Google ainda não implementado.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[400px] px-5 space-y-3 mx-auto z-30"
    >
      <div className="border-l-4 border-black text-2xl px-5 mb-10">
        <h2>Já tem uma conta?</h2>
      </div>
      <Input
        type="email"
        className=""
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        className="shadow-2xs"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="text-center"></div>
      <Button
        type="submit"
        className="w-full py-5 flex items-center justify-center rounded cursor-pointer bg-blue-500 hover:bg-blue-400 text-white text-center"
        disabled={loading}
      >
        <span>{loading ? "Carregando..." : "Concluído"}</span>
      </Button>
      <div className="flex justify-center">
        <span className="text-xs text-center">Ou</span>
      </div>
      <Button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full py-5 flex items-center justify-center rounded cursor-pointer bg-black text-white text-center gap-2"
      >
        <span>Entrar com</span>
        <Image
          src={"/images/google.png"}
          className="size-5"
          width={20}
          height={20}
          alt="Google"
        />
      </Button>
      <div className="flex flex-col items-center">
        <Button
          variant={"link"}
          className="cursor-pointer"
          onClick={() => router.push("/signup")}
        >
          Não tenho uma conta
        </Button>
        <Button
          variant={"link"}
          className="cursor-pointer"
          onClick={() => router.push("/forgot-password")}
        >
          Esqueci a palavra-passe
        </Button>
      </div>
    </form>
  );
}
