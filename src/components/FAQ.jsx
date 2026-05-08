import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    question: "Como eu começo a integrar com a FiqOn?",
    answer: "É mais simples do que parece! Fale com um especialista do nosso time e a gente descobre junto o melhor caminho pra você começar a automatizar.",
  },
  {
    question: "Quantas ações eu preciso?",
    answer: "Isso varia conforme a quantidade de integrações criadas dentro da plataforma e o volume de dados que serão movimentados entre elas.",
  },
  {
    question: "O que é uma operação?",
    answer: "É a resposta executada em um sistema após um gatilho ser acionado. Por exemplo, quando um evento ocorre em um sistema de origem, a operação é a tarefa realizada no sistema de destino, como enviar dados, criar um registro ou atualizar informações.",
  },
  {
    question: "O que é um middleware?",
    answer: "É um software que atua como um intermediário, permitindo que diferentes sistemas ou aplicações se comuniquem e troquem dados entre si, facilitando a integração.",
  },
  {
    question: "O que é um gatilho?",
    answer: "É o evento que inicia uma automação em uma integração, como uma mudança em um sistema que aciona outra ação em um sistema integrado.",
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto md:p-6 font-['Poppins',sans-serif]">
      {/* Título com a fonte principal e destaque Neon */}
      <h2 className="text-center font-['brutaslime-bold'] text-[2.5rem] md:text-5xl text-white mb-12">
        Perguntas <span className="text-[#d1fc92]">frequentes</span>
      </h2>

      {/* Lista de FAQs em formato de Cards */}
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggleFAQ(index)}
            className={`container-border p-5 md:p-6 transition-all duration-300 cursor-pointer hover:bg-[rgba(255,255,255,0.02)] group ${openIndex === index ? 'border-[#d1fc92]/30 bg-[rgba(209,252,146,0.02)]' : ''
              }`}
          >
            <div className="flex justify-between items-center">
              <p
                className={`font-semibold text-base md:text-lg transition-colors pr-4 ${openIndex === index ? 'text-[#d1fc92]' : 'text-white group-hover:text-[#d1fc92]'
                  }`}
              >
                {faq.question}
              </p>

              {openIndex === index ? (
                <X className="text-[#d1fc92] flex-shrink-0" size={24} />
              ) : (
                <Plus className="text-[#d1fc92] flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" size={24} />
              )}
            </div>

            {/* Corpo da Resposta */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)]' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
              <div className="overflow-hidden">
                <p className="text-[#aeb4bc] leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;