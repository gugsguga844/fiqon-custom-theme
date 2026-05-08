import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const ToolGridWithCategoryFilter = ({ searchQuery }) => {
  const [categories, setCategories] = useState([]);
  const [tools, setTools] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [allTools, setAllTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef();

  // Fechar dropdown clicando fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Buscar ferramentas
  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://fiqon.com.br/wp-json/wp/v2/apps?per_page=100"
        );
        let data = await res.json();

        data.sort((a, b) => {
          const nameA = (
            a.acf?.app_title ||
            a.title?.rendered ||
            ""
          ).toLowerCase();
          const nameB = (
            b.acf?.app_title ||
            b.title?.rendered ||
            ""
          ).toLowerCase();
          return nameA.localeCompare(nameB);
        });

        setAllTools(data);
      } catch (error) {
        console.error("Erro ao buscar ferramentas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  // Buscar categorias
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://fiqon.com.br/wp-json/wp/v2/app-category?per_page=100"
        );
        const data = await res.json();
        setCategories([{ id: null, name: "Todas" }, ...data]);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategories();
  }, []);

  // Contador de categorias
  useEffect(() => {
    const counts = {};

    allTools.forEach((app) => {
      if (Array.isArray(app["app-category"])) {
        app["app-category"].forEach((catId) => {
          counts[catId] = (counts[catId] || 0) + 1;
        });
      }
    });

    counts["all"] = allTools.length;
    setCategoryCounts(counts);

    setCategories((prevCategories) => {
      const filtered = prevCategories.filter((cat) =>
        cat.id === null || counts[cat.id] > 0
      );
      return filtered;
    });
  }, [allTools]);

  // Filtro por categoria e busca
  useEffect(() => {
    setLoading(true);
    let filtered = [...allTools];

    if (selectedCategory) {
      filtered = filtered.filter((app) =>
        app["app-category"]?.includes(selectedCategory)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((tool) => {
        const appTitle = tool.acf?.app_title || "";
        const appName = tool.title?.rendered || "";
        return (
          appTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          appName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    setTools(filtered);
    setLoading(false);
  }, [selectedCategory, searchQuery, allTools]);

  // Render cards (Agora com Glassmorphism)
  const renderTools = () => {
    if (loading) {
      return (
        <p className="col-span-full text-center text-[#aeb4bc]">Carregando ferramentas...</p>
      );
    }
    if (tools.length === 0) {
      return (
        <p className="col-span-full text-center text-[#aeb4bc]">
          Nenhuma ferramenta encontrada
        </p>
      );
    }
    return tools.map((tool, index) => (
      <a
        key={index}
        href={tool.link}
        // Aplicamos a classe global de container-border para o glassmorphism e bordas
        className="flex flex-col items-center justify-center p-4 text-center hover:opacity-90 transition-all hover:scale-105 container-border cursor-pointer group"
        rel="noopener noreferrer"
      >
        <div className="w-[80px] h-[80px] flex items-center justify-center mb-3 bg-[rgba(255,255,255,0.05)] rounded-lg p-2 border border-[rgba(255,255,255,0.05)] group-hover:border-[#d1fc92]/30 transition-colors">
          <img
            src={tool.acf?.app_logo?.url || "https://placehold.co/122"}
            alt={tool.acf?.app_title || tool.title?.rendered || "Ferramenta"}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <p className="text-[#d1d5db] text-xs sm:text-sm font-medium group-hover:text-white transition-colors line-clamp-1">
          {tool.acf?.app_title || tool.title?.rendered}
        </p>
      </a>
    ));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 font-['Poppins',sans-serif]">

      {/* Select mobile/tablet (Dark Mode) */}
      <h3 className="md:hidden text-white font-semibold text-lg tracking-wide uppercase">
        Por Categoria
      </h3>
      <div className="block md:hidden relative z-20 mb-4" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.1)] px-5 py-4 flex justify-between items-center text-sm text-white font-medium outline-none hover:border-[#d1fc92]/50 transition-colors"
        >
          <span>
            {categories.find((cat) => cat.id === selectedCategory)?.name ??
              "Todas"}{" "}
            (
            {selectedCategory === null
              ? categoryCounts["all"] || 0
              : categoryCounts[selectedCategory] || 0}
            )
          </span>
          {dropdownOpen ? (
            <ChevronUp className="w-5 h-5 text-[#d1fc92]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#aeb4bc]" />
          )}
        </button>

        {dropdownOpen && (
          <ul className="absolute left-0 right-0 mt-2 bg-[#1C2120] rounded-lg border border-[rgba(255,255,255,0.1)] shadow-2xl max-h-[300px] overflow-y-auto overflow-x-hidden w-full z-50 custom-scrollbar">
            {categories.map((category) => (
              <li
                key={category.id ?? "null"}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setDropdownOpen(false);
                }}
                className={`px-5 py-3 text-sm transition-colors cursor-pointer break-words border-b border-[rgba(255,255,255,0.05)] last:border-0 ${selectedCategory === category.id
                  ? "bg-[rgba(209,252,146,0.1)] text-[#d1fc92] font-semibold"
                  : "text-[#aeb4bc] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                  }`}
              >
                {category.name} (
                {category.id === null
                  ? categoryCounts["all"] || 0
                  : categoryCounts[category.id] || 0}
                )
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Lista lateral desktop (Dark Mode) */}
      <div className="hidden md:block p-0 w-1/4">
        <h3 className="text-white font-semibold text-lg tracking-wide uppercase mb-4 pb-3 border-b border-[rgba(255,255,255,0.1)]">
          Categorias
        </h3>
        <div className="pt-2">
          <ul className="space-y-1">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex justify-between items-center px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${selectedCategory === category.id
                  ? "bg-[rgba(209,252,146,0.1)] text-[#d1fc92] font-semibold border border-[rgba(209,252,146,0.2)]"
                  : "text-[#aeb4bc] hover:bg-[rgba(255,255,255,0.05)] hover:text-white border border-transparent"
                  }`}
              >
                <span className="text-sm truncate mr-2">{category.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === category.id
                  ? "bg-[rgba(209,252,146,0.2)] text-[#d1fc92]"
                  : "bg-[rgba(255,255,255,0.1)] text-[#aeb4bc]"
                  }`}>
                  {category.id === null
                    ? categoryCounts["all"] || 0
                    : categoryCounts[category.id] || 0}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grid de ferramentas */}
      <div className="flex flex-col md:w-3/4 w-full">

        {/* Mobile grid (Ajustado o scroll para modo Dark) */}
        <div className="md:hidden p-0 max-h-[500px] overflow-y-auto overflow-x-hidden w-full custom-scrollbar pr-2">
          <div className="grid grid-cols-2 gap-4">
            {renderTools()}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:block p-0">
          <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">{renderTools()}</div>
        </div>

        {/* Footer box (CTA FiqOn) */}
        <div className="container-border p-6 rounded-xl mt-8 flex flex-col items-center text-center sm:text-left sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <p className="font-['brutaslime-bold'] text-xl text-white tracking-wide">
              Não encontrou a ferramenta que procura?
            </p>
            <p className="text-[#aeb4bc] text-sm mt-1">
              Podemos criar uma integração personalizada ou te ajudar a usar webhooks.
            </p>
          </div>
          <a
            href="https://doc.clickup.com/31083618/d/h/xmk32-86893/760bc715a491aac"
            className="whitespace-nowrap bg-[#d1fc92] text-[#0A0F0D] font-bold text-[14px] px-6 py-3 rounded-lg flex items-center transition-all hover:bg-[#bbf070] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(209,252,146,0.3)]"
            target="_blank"
          >
            Sugerir ferramenta <ArrowRight className="ml-2" size={16} />
          </a>
        </div>
      </div>

      {/* Adicionar esse estilo globalmente se ainda não tiver no seu CSS para a barra de rolagem */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(209, 252, 146, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(209, 252, 146, 0.4);
        }
      `}} />
    </div>
  );
};

export default ToolGridWithCategoryFilter;