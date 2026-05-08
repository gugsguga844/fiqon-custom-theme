import React, { useEffect } from "react";
import { Search, ArrowRight, Zap } from "lucide-react";

const tempTriggers = [
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/WEBHOOK.png",
    name: "Webhook",
    description:
      "O Webhook é um dos gatilhos mais versáteis, permitindo que sua integração seja ativada sempre que um evento específico ocorre em outro sistema",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/AGENDAMENTO.png",
    name: "Agendamento",
    description:
      "O gatilho de Agendamento é ideal para integrações que precisam ser executadas em intervalos regulares, sem depender de eventos externos.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/EVOLUTION-API.png",
    name: "Evolution Api ",
    description:
      "Construa integrações com base em eventos específicos dentro do Evolution Api, através de configurações diretas e rápidas.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/META.png",
    name: "Nova requisição",
    description:
      "Este gatilho é ativado toda vez que um novo lead é gerado através de um formulário de leads associado a uma página no Meta Ads.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/GOOGLE-ADS.png",
    name: "Google Ads",
    description:
      "Este gatilho é ativado toda vez que um novo lead é gerado através de um formulário de leads vinculado à sua conta de anúncios no Google Ads.",
  },
  {
    icon: "https://fiqon.com.br/wp-content/uploads/2025/04/Z-API.png",
    name: "Z-APl",
    description:
      "Construa integrações com base em eventos específicos dentro do Z-API, através de configurações diretas e rápidas.",
  },
];

const PopularTriggers = ({ triggers = tempTriggers }) => {
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const appsRes = await fetch(
          "https://fiqon.com.br/wp-json/wp/v2/apps?per_page=100"
        );
        const appsData = await appsRes.json();

        const categoryId = 142; // ID da categoria "Inteligência Artificial"
        const filteredApps = appsData.filter(
          (app) =>
            app["app-category"] && app["app-category"].includes(categoryId)
        );

        console.log("Apps filtrados (Inteligência Artificial):", filteredApps);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchApps();
  }, []);

  return (
    <div className="w-full font-['Poppins',sans-serif]">
      {/* Título */}
      <h2 className="font-['brutaslime-bold'] text-white text-3xl md:text-4xl flex items-center mb-8">
        Gatilhos populares <Zap className="ml-3 text-[#d1fc92]" size={32} />
      </h2>

      {/* Lista de gatilhos */}
      <div className="space-y-4">
        {triggers.map((trigger, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center gap-5 p-5 container-border transition-all hover:bg-[rgba(255,255,255,0.02)] group"
          >
            {/* Box do Ícone/Logo */}
            <div className="w-[80px] h-[80px] flex-shrink-0 bg-[rgba(255,255,255,0.05)] rounded-xl p-2 border border-[rgba(255,255,255,0.05)] flex items-center justify-center group-hover:border-[#d1fc92]/30 transition-colors">
              <img
                src={trigger.icon}
                alt={trigger.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Textos */}
            <div className="md:ml-2 flex-1">
              <p className="text-white font-semibold text-lg">{trigger.name}</p>
              <p className="text-[#aeb4bc] font-normal text-sm mt-1 leading-relaxed">
                {trigger.description}
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

export default PopularTriggers;