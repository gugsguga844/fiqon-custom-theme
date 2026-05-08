import React from "react";

const Hero = () => {
  return (
    <div className="w-full h-[600px] text-center relative">
      {/* Versão mobile */}
      <div
        className="block md:hidden absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://fiqon.com.br/wp-content/uploads/2026/05/fiqon-hero-mobile.png')",
        }}
      ></div>

      {/* Versão desktop */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://fiqon.com.br/wp-content/uploads/2026/05/herodark.png')",
        }}
      ></div>

      {/* Conteúdo do Hero */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-3xl">
          <h1 className="font-['brutaslime-bold'] text-[2rem] md:text-[3rem] leading-[1.1] text-white">
            Conecte seus sistemas em <span className="text-[#d1fc92]">poucos cliques</span>
          </h1>
          <p className="mt-6 text-[#aeb4bc] text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Deixe seus processos online integrando suas ferramentas favoritas de
            forma fácil e rápida usando a <span className="text-white font-semibold">FiqOn</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
