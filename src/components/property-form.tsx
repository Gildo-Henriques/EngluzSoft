"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Imovel } from "@/types";

interface PropertyFormProps {
  sellerId: number;
  onSubmit: (newProperty: Imovel) => void;
  onCancel: () => void;
}

export default function PropertyForm({ sellerId, onSubmit, onCancel }: PropertyFormProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    owner: "",
    location: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    category: "venda",
    garage: "",
    yearBuilt: "",
    image: "", // URL da imagem principal
    images: [] as string[], // Array de URLs das imagens secundárias
  });
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");

  // Configuração do react-dropzone para upload de imagens
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      image: prev.image || newImages[0] || "", // Define a primeira imagem como principal, se ainda não definida
      images: [...prev.images, ...newImages], // Adiciona novas imagens à galeria
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    multiple: true,
  });

  // Função para remover uma imagem da galeria
  const removeImage = (index: number) => {
    setFormData((prev) => {
      const newImages = prev.images.filter((_, i) => i !== index);
      const newImage = prev.image === prev.images[index] ? (newImages[0] || "") : prev.image;
      return { ...prev, image: newImage, images: newImages };
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Validação por etapa
    if (step === 1 && (!formData.title || !formData.description || !formData.owner)) {
      alert("Por favor, preencha todos os campos obrigatórios da etapa 1.");
      return;
    }
    if (
      step === 2 &&
      (!formData.location || !formData.size || !formData.bedrooms || !formData.bathrooms)
    ) {
      alert("Por favor, preencha todos os campos obrigatórios da etapa 2.");
      return;
    }
    if (step === 3 && (!formData.price || !formData.category)) {
      alert("Por favor, preencha todos os campos obrigatórios da etapa 3.");
      return;
    }
    if (step === 4 && !formData.image) {
      alert("Por favor, selecione pelo menos uma imagem principal na etapa 4.");
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
      if (step + 1 === totalSteps) {
        alert("Prestes a Terminar! Adicione as imagens e finalize.");
      }
    } else {
      // Submissão final
      const bedrooms = parseInt(formData.bedrooms);
      const bathrooms = parseInt(formData.bathrooms);
      const garage = formData.garage ? parseInt(formData.garage) : undefined;
      const yearBuilt = formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined;

      if (isNaN(bedrooms) || isNaN(bathrooms)) {
        alert("Por favor, insira valores válidos para quartos e banheiros.");
        setSubmissionStatus("error");
        return;
      }

      const newProperty: Imovel = {
        id: Date.now(),
        title: formData.title,
        location: formData.location,
        price: formData.price,
        category: formData.category,
        description: formData.description,
        size: formData.size,
        bedrooms,
        bathrooms,
        garage,
        yearBuilt,
        image: formData.image,
        images: formData.images,
        owner: formData.owner,
        seller: {
          id: sellerId,
          name: "",
          photo: "",
          contact: { whatsapp: "", phone: "", location: "" },
        },
        coordinates: { lat: 0, lng: 0 },
      };

      try {
        onSubmit(newProperty);
        setSubmissionStatus("success");
        alert("Conclusão: Imóvel criado com sucesso!");
      } catch (error) {
        setSubmissionStatus("error");
        alert("Erro ao criar imóvel. Tente novamente.");
      }
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const progressValue = (step / totalSteps) * 100;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Anunciar Novo Imóvel - Etapa {step} de {totalSteps}</h2>
      <Progress value={progressValue} className="mb-6" aria-label={`Progresso: ${progressValue}% concluído`} />

      {submissionStatus === "success" ? (
        <div className="text-center">
          <h3 className="text-xl font-semibold text-green-600">Imóvel Criado com Sucesso!</h3>
          <p className="text-gray-600 mt-2">Seu imóvel foi adicionado ao catálogo.</p>
          <Button
            onClick={onCancel}
            className="mt-4 bg-blue-500 hover:bg-blue-400 text-white"
          >
            Voltar ao Perfil
          </Button>
        </div>
      ) : (
        <form onSubmit={handleNext} className="space-y-4" aria-label={`Formulário de anúncio de imóvel - Etapa ${step}`}>
          {step === 1 && (
            <>
              <Input
                type="text"
                placeholder="Título"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="Descrição"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="Proprietário"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                required
              />
            </>
          )}
          {step === 2 && (
            <>
              <Input
                type="text"
                placeholder="Localização"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="Área (ex.: 120m²)"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="Quartos"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="Banheiros"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                required
              />
            </>
          )}
          {step === 3 && (
            <>
              <Input
                type="text"
                placeholder="Preço (ex.: 225,000,000 AOA)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="Categoria (venda, renda, terreno)"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="Garagem (opcional)"
                value={formData.garage}
                onChange={(e) => setFormData({ ...formData, garage: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Ano de Construção (opcional)"
                value={formData.yearBuilt}
                onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
              />
            </>
          )}
          {step === 4 && (
            <>
              <div
                {...getRootProps()}
                className={`border-dashed border-2 p-6 text-center rounded-lg ${
                  isDragActive ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <input {...getInputProps()} />
                <p className="text-gray-600">
                  {isDragActive
                    ? "Solte as imagens aqui..."
                    : "Arraste e solte imagens aqui ou clique para selecionar (PNG, JPG, JPEG)"}
                </p>
              </div>
              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={image}
                        alt={`Pré-visualização da imagem ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-24 object-cover rounded"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-0 right-0 p-1"
                        onClick={() => removeImage(index)}
                        aria-label={`Remover imagem ${index + 1}`}
                      >
                        X
                      </Button>
                      {image === formData.image && (
                        <span className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs px-1 rounded">
                          Principal
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          <div className="flex gap-4 justify-between">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="border-gray-300 text-gray-700"
              >
                Anterior
              </Button>
            )}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="border-gray-300 text-gray-700"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 text-white"
              >
                {step === totalSteps ? "Criar Imóvel" : "Próximo"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}