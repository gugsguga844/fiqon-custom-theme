import React from "react";
import { Rocket, CreditCard } from "lucide-react";

const HeroSinglePost = ({ post }) => {
  const { acf } = post;

  return (
    <div className="pt-16 md:pb-24 flex items-center justify-center font-['Poppins',sans-serif] w-full">
      <div className="w-full max-w-[1280px] flex flex-col md:flex-row justify-between items-center px-[24px] md:px-[40px] xl:px-[60px] gap-12">

        {/* Texto e chamada para ação */}
        <div className="max-w-2xl flex-1">
          <h1 className="font-['brutaslime-bold'] text-[2.5rem] md:text-[3.5rem] leading-[1.1] text-white text-center md:text-left mb-6">
            Integrar o <span className="text-[#d1fc92]">{acf.app_title}</span> aos
            seus sistemas nunca foi tão simples.
          </h1>
          <p className="text-[#aeb4bc] text-lg text-center md:text-left mb-10 leading-relaxed">
            Integre agora o {acf.app_title} com seus demais sistemas e coloque
            tarefas no piloto automático!
          </p>

          {/* Botão */}
          <div className="flex justify-center md:justify-start">
            <a href="https://fiqon.com.br/#contato" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
              <button className="w-full md:w-auto bg-[#d1fc92] text-[#0A0F0D] font-bold px-10 py-4 rounded-xl shadow-[0_0_25px_rgba(209,252,146,0.3)] hover:bg-[#bbf070] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(209,252,146,0.5)] transition-all text-lg">
                Fale com um especialista
              </button>
            </a>
          </div>
        </div>

        {/* Imagem em Destaque (Glassmorphism) */}
        <div className="flex-1 flex justify-center items-center w-full">
          <div className="relative w-full max-w-[400px] aspect-square flex justify-center items-center container-border rounded-3xl p-10 group">
            {/* Efeito de Glow interno suave */}
            <div className="absolute inset-0 bg-[#d1fc92] blur-[100px] opacity-[0.08] rounded-full group-hover:opacity-[0.12] transition-opacity"></div>

            <img
              src={acf.app_logo?.url}
              alt={acf.app_title}
              className="w-full h-full object-contain relative z-10 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSinglePost;