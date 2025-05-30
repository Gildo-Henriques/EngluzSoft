import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function () {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Como posso anunciar meu imóvel na EngluzSoft?</AccordionTrigger>
        <AccordionContent>
          É simples! Entre em contato connosco pelo WhatsApp ou e-mail, envie as informações do imóvel e nós cuidamos da divulgação.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger> Há alguma taxa para anunciar?</AccordionTrigger>
        <AccordionContent>
          O anúncio é gratuito. Só cobramos uma comissão justa quando o negócio for fechado com sucesso.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>  Posso alugar meu imóvel por renda mensal ou trimestral?</AccordionTrigger>
        <AccordionContent>
          Sim! Adaptamos os contratos conforme a sua preferência e garantimos segurança nos pagamentos.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>   A EngluzSoft também trabalha com terrenos?</AccordionTrigger>
        <AccordionContent>
          Sim, trabalhamos com a venda, aluguel e renda de terrenos em várias zonas do país.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
