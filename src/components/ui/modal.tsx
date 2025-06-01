// components/Modal.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from './button';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnnounceModal({ isOpen, onClose }: ModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        {/* Botão de fechar (X) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Fechar modal"
        >
          <X size={24} />
        </button>

        {/* Conteúdo do modal */}
        <h2 className="text-xl font-semibold mb-4 text-center">
          Anunciar Imóvel
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Para anunciar um imóvel, você precisa criar uma conta ou fazer login.
        </p>

        {/* Botões */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => router.push('/auth/signup')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
          >
            Criar Conta
          </Button>
          <Button
            onClick={() => router.push('/auth/signin')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2"
          >
            Fazer Login
          </Button>
        </div>
      </div>
    </div>
  );
}