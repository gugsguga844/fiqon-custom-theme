import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const ConnectTools = () => {
  const [tools, setTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState([]);
  const [appName, setAppName] = useState("a ferramenta");
  const [appLogo, setAppLogo] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fiqon.com.br/wp-json/wp/v2/apps?per_page=100");
        const data = await res.json();

        const slug = window.location.pathname.split("/").filter(Boolean).pop();
        const matchingApp = data.find((app) => app.slug === slug);

        if (matchingApp) {
          const name = matchingApp.acf?.app_title || matchingApp.title?.rendered || slug;
          const logo = matchingApp.acf?.app_logo?.url || "https://placehold.co/80";

          setAppName(name);
          setAppLogo(logo);
        }

        const formattedTools = data
          .map((app) => ({
            name: app.acf?.app_title || app.title?.rendered || "Sem nome",
            icon: app.acf?.app_logo?.url || "https://placehold.co/64",
            link: app.link || "#",
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setTools(formattedTools);
        setFilteredTools(formattedTools);
      } catch (error) {
        console.error("Erro ao buscar ferramentas:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = tools.filter((tool) =>
      tool.name.toLowerCase().includes(query)
    );
    setFilteredTools(filtered);
  }, [searchQuery, tools]);

  return (
    <div className="text-center font-['Poppins',sans-serif] mt-12 w-full">
      <h2 className="font-['brutaslime-bold'] text-white text-3xl md:text-4xl mb-12">
        Conecte qualquer ferramenta ao <span className="text-[#d1fc92]">{appName}</span>
      </h2>

      {/* Conexão Visual com as duas Logos */}
      <div className="flex justify-center items-center gap-4 md:gap-8 mb-12">

        {/* Box da Logo Base */}
        <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl flex items-center justify-center p-4 md:p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <img
            src={appLogo || "https://placehold.co/80"}
            alt={appName}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Seta */}
        <img
          className="w-12 md:w-24 opacity-60"
          src="https://fiqon.com.br/wp-content/uploads/2025/03/Group-48095517.png"
          alt="Seta de conexão"
        />

        {/* Box da Logo Selecionada ou Placeholder */}
        <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl flex items-center justify-center p-4 md:p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          {selectedTool ? (
            <a href={selectedTool.link} className="w-full h-full flex items-center justify-center" target="_blank" rel="noopener noreferrer">
              <img
                src={selectedTool.icon}
                alt={selectedTool.name}
                className="w-full h-full object-contain transition-transform duration-300 ease-out scale-100 group-hover:scale-110"
              />
            </a>
          ) : (
            <img
              src="https://fiqon.com.br/wp-content/uploads/2025/03/Mask-group.png"
              alt="Adicionar ferramenta"
              className="w-full h-full object-contain opacity-40"
            />
          )}
        </div>

      </div>

      {/* Barra de busca (Padrão Dark) */}
      <div className="flex justify-center mb-10 max-w-2xl mx-auto w-full">
        <div className="flex items-center border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] rounded-full px-5 py-4 w-full shadow-sm focus-within:border-[#d1fc92]/50 focus-within:shadow-[0_0_15px_rgba(209,252,146,0.1)] transition-all duration-300 backdrop-blur-sm">
          <Search className="text-[#aeb4bc]" size={20} />
          <input
            type="text"
            placeholder="Buscar ferramenta..."
            className="w-full bg-transparent outline-none px-3 text-white placeholder-[#aeb4bc] border-none"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>
      </div>

      {/* Lista de ferramentas para escolher */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-5">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool, index) => (
            <div
              key={index}
              onClick={() => setSelectedTool(tool)}
              className="flex flex-col items-center justify-center p-4 text-center hover:opacity-90 transition-all hover:scale-105 container-border cursor-pointer group"
            >
              <div className="w-[70px] h-[70px] flex items-center justify-center mb-3 bg-[rgba(255,255,255,0.05)] rounded-lg p-2 border border-[rgba(255,255,255,0.05)] group-hover:border-[#d1fc92]/30 transition-colors">
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-[#d1d5db] text-xs sm:text-sm font-medium group-hover:text-white transition-colors line-clamp-1">
                {tool.name}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-[#aeb4bc]">
            Nenhuma ferramenta encontrada
          </p>
        )}
      </div>
    </div>
  );
};

export { ConnectTools };