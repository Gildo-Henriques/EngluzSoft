// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Signup() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validações
    if (!formData.nome || !formData.email || !formData.phone || !formData.password) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Por favor, insira um email válido.');
      setLoading(false);
      return;
    }

    try {
      await register(
        formData.nome,
        formData.email,
        formData.phone,
        formData.password
      );
      toast.success('Conta criada com sucesso!');
      router.push('/profile');
    } catch (error: any) {
      console.error('Erro no formulário de registro:', error);
      toast.error(error.message || 'Erro ao criar conta. Verifique sua conexão ou tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.info('Registro com Google ainda não implementado.');
  };

  return (
    <form onSubmit={handleSubmit} action={"https://engluzsoft-backend-1.onrender.com/api/users"} className="w-[400px] px-5 space-y-3 mx-auto z-30">
      <div className="border-l-4 border-black text-2xl px-5 mb-10">
        <h2>Crie uma conta</h2>
      </div>
      <Input
        type="text"
        name="nome"
        className=""
        placeholder="Nome completo"
        value={formData.nome}
        onChange={handleChange}
        required
      />
      <Input
        type="email"
        name="email"
        className=""
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        type="tel"
        name="phone"
        className=""
        placeholder="Nº telefone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <Input
        type="password"
        name="password"
        className="shadow-2xs"
        placeholder="Criar senha"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        name="confirmPassword"
        className="shadow-2xs"
        placeholder="Confirmar senha"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <Button
        type="submit"
        className="w-full py-5 flex items-center justify-center rounded cursor-pointer bg-blue-500 hover:bg-blue-400 text-white text-center"
        disabled={loading}
      >
        <span>{loading ? 'Carregando...' : 'Concluído'}</span>
      </Button>
      <div className="flex justify-center">
        <span className="text-xs text-center">Ou</span>
      </div>
      <Button
        type="button"
        onClick={handleGoogleSignup}
        className="w-full py-5 flex items-center justify-center rounded cursor-pointer bg-black text-white text-center gap-2"
      >
        <span>Criar com</span>
        <Image
          src="/images/google.png"
          className="size-5"
          width={20}
          height={20}
          alt="Google"
        />
      </Button>
    </form>
  );
}