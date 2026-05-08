import React, { useState } from "react";
import Hero from "./Hero.jsx";
import SearchBar from "./SearchBar.jsx";
import PopularTriggers from "./PopularTriggers.jsx";
import PopularActions from "./PopularActions.jsx";
import FAQ from "../FAQ.jsx";
import ToolGridWithCategoryFilter from "./ToolGridWithCategoryFilter.jsx";

const ArchivePosts = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!posts || posts.length === 0) {
    return (
      // Aplicando o fundo dark e texto com a cor neutra da identidade
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F0D] text-white font-['Poppins',sans-serif]">
        <p className="text-center text-[#aeb4bc] text-lg">Nenhuma ferramenta encontrada.</p>
      </div>
    );
  }

  return (
    // Wrapper principal recebendo o fundo #0A0F0D, texto branco e a fonte Poppins como padrão
    <div className="min-h-screen w-full bg-[#0A0F0D] text-white font-['Poppins',sans-serif] overflow-hidden">

      <Hero />

      <section className="w-full flex flex-col items-center pb-10">
        <div className="w-full max-w-[1280px] px-[24px] md:px-[40px] xl:px-[60px]">
          <div className="mt-[40px]">
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center pb-10">
        <div className="max-w-[1280px] w-full flex flex-col px-[24px] md:px-[40px] xl:px-[60px]">
          <ToolGridWithCategoryFilter searchQuery={searchQuery} />
        </div>
      </section>

      <section className="w-full flex justify-center py-10">
        <div className="max-w-[1200px] w-full flex flex-col px-[24px] md:px-[40px] xl:px-[60px]">
          <PopularTriggers />
        </div>
      </section>

      <section className="w-full flex justify-center py-10">
        <div className="max-w-[1200px] w-full flex flex-col px-[24px] md:px-[40px] xl:px-[60px]">
          <PopularActions />
        </div>
      </section>

      {/* Adicionei uma borda muito sutil em cima do FAQ para separar visualmente */}
      <section className="w-full flex justify-center py-10 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-[1200px] w-full flex flex-col px-[24px] md:px-[40px] xl:px-[60px]">
          <FAQ />
        </div>
      </section>

    </div>
  );
};

export default ArchivePosts;