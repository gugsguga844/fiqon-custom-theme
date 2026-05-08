import React from "react";
import { ArrowRight } from "lucide-react";

const tempIntegrations = [
  {
    sourceIcon: "https://placehold.co/64",
    targetIcons: ["https://placehold.co/64", "https://placehold.co/64"],
    title: "Lorem ipsum dolor sit amet consectetur. Tempor erat dui sed tristique amet.",
    description: "Lorem ipsum dolor sit amet consectetur. In erat elit tincidunt at sed in velit. Iaculis eget viverra aliquet cras elit dolor in dui feugiat. Auctor odio praesent tincidunt.",
  },
  {
    sourceIcon: "https://placehold.co/64",
    targetIcons: ["https://placehold.co/64", "https://placehold.co/64"],
    title: "Lorem ipsum dolor sit amet consectetur. Tempor erat dui sed tristique amet.",
    description: "Lorem ipsum dolor sit amet consectetur. In erat elit tincidunt at sed in velit. Iaculis eget viverra aliquet cras elit dolor in dui feugiat. Auctor odio praesent tincidunt.",
  },
  {
    sourceIcon: "https://placehold.co/64",
    targetIcons: ["https://placehold.co/64", "https://placehold.co/64"],
    title: "Lorem ipsum dolor sit amet consectetur. Tempor erat dui sed tristique amet.",
    description: "Lorem ipsum dolor sit amet consectetur. In erat elit tincidunt at sed in velit. Iaculis eget viverra aliquet cras elit dolor in dui feugiat. Auctor odio praesent tincidunt.",
  }
];

const PopularIntegrations = ({ integrations = tempIntegrations }) => {
  return (
    <div className="w-full font-['Poppins',sans-serif] mt-12">
      {/* Título da Seção */}
      <div className="text-center mb-10">
        <h2 className="font-['brutaslime-bold'] text-white text-3xl md:text-4xl">
          Integrações <span className="text-[#d1fc92]">populares</span>
        </h2>
      </div>

      {/* Grid de Cards (Responsivo) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration, index) => (
          <div
            key={index}
            className="container-border p-6 rounded-xl flex flex-col text-left transition-all hover:bg-[rgba(255,255,255,0.02)] group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(209,252,146,0.05)]"
          >
            {/* Linha de Ícones da Integração */}
            <div className="flex items-center space-x-3 mb-6">
              {/* Ícone de Origem */}
              <div className="w-[50px] h-[50px] flex-shrink-0 bg-[rgba(255,255,255,0.05)] rounded-lg p-1.5 border border-[rgba(255,255,255,0.05)] flex items-center justify-center">
                <img src={integration.sourceIcon} alt="Source" className="max-w-full max-h-full object-contain" />
              </div>

              <ArrowRight className="text-[#aeb4bc]" size={20} />

              {/* Ícones de Destino */}
              {integration.targetIcons.map((icon, idx) => (
                <React.Fragment key={idx}>
                  <div className="w-[50px] h-[50px] flex-shrink-0 bg-[rgba(255,255,255,0.05)] rounded-lg p-1.5 border border-[rgba(255,255,255,0.05)] flex items-center justify-center">
                    <img src={icon} alt="Target" className="max-w-full max-h-full object-contain" />
                  </div>
                  {idx !== integration.targetIcons.length - 1 && (
                    <ArrowRight className="text-[#aeb4bc]" size={20} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Conteúdo de Texto */}
            <h3 className="text-white font-semibold text-lg leading-snug mb-3">
              {integration.title}
            </h3>
            <p className="text-[#aeb4bc] text-sm leading-relaxed flex-1">
              {integration.description}
            </p>

            {/* Botão/Link de Ação */}
            <a
              href="#"
              className="text-[#d1fc92] font-semibold flex items-center mt-6 hover:text-white transition-colors w-fit"
            >
              Criar a partir do template
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export { PopularIntegrations };