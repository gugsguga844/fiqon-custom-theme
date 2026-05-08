import React from "react";
import { Search, Settings } from "lucide-react";

const tempActions = [
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/SHEETS.png",
    name: "Adicionar linha na planilha",
    description:
      "Acrescenta uma linha com valores no final da planilha do Google Sheets.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/Z-API-1.png",
    name: "Enviar texto simples",
    description:
      "Envie textos simples via WhatsApp! Você pode incrementá-los utilizando a formatação de texto e emojis.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/Z-API-1.png",
    name: "Enviar áudio",
    description:
      "Ação responsável por enviar áudios para os seus chats no WhatsApp.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/GPT.png",
    name: "Criar uma Thread",
    description:
      "Cria uma thread para conversa com assistente do ChatGPT.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/CLICKUP-1.png",
    name: "Criar tarefa",
    description:
      "Criar uma tarefa no ClickUp.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/EVOLUTION-API-1.png",
    name: "Enviar Anexo",
    description:
      "Ação que envia anexos para um contato no WhatsApp.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/ASAAS.png",
    name: "Atualizar cadastro do cliente",
    description:
      "Ação que atualiza o cadastro de um cliente no Asaas.",
  },
];

const PopularActions = ({ actions = tempActions }) => {
  return (
    <div className="w-full font-['Poppins',sans-serif]">
      {/* Título */}
      <h2 className="font-['brutaslime-bold'] text-white text-3xl md:text-4xl flex items-center mb-8">
        Ações populares <Settings className="ml-3 text-[#d1fc92]" size={32} />
      </h2>

      {/* Lista de ações */}
      <div className="space-y-4">
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center gap-5 p-5 container-border transition-all hover:bg-[rgba(255,255,255,0.02)] group"
          >
            {/* Box do Ícone/Logo */}
            <div className="w-[80px] h-[80px] flex-shrink-0 bg-[rgba(255,255,255,0.05)] rounded-xl p-2 border border-[rgba(255,255,255,0.05)] flex items-center justify-center group-hover:border-[#d1fc92]/30 transition-colors">
              <img
                src={action.icon}
                alt={action.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Textos */}
            <div className="md:ml-2 flex-1">
              <p className="text-white font-semibold text-lg">{action.name}</p>
              <p className="text-[#aeb4bc] font-normal text-sm mt-1 leading-relaxed">
                {action.description}
              </p>
            </div>

            {/* Botão CTA */}
            <a
              href="https://fiqon.com.br/#contato"
              className="mt-4 md:mt-0 w-full md:w-32 text-center whitespace-nowrap px-6 py-2.5 bg-[#d1fc92] text-[#0A0F0D] font-bold rounded-lg hover:bg-[#bbf070] hover:shadow-[0_0_20px_rgba(209,252,146,0.3)] transition-all"
            >
              Testar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularActions;