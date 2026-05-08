import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const ToolGrid = ({ selectedCategory, searchQuery }) => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTools = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://fiqon.com.br/wp-json/wp/v2/apps?per_page=100");
                const data = await res.json();

                let filteredTools = data;

                // FILTRO POR CATEGORIA
                if (selectedCategory && selectedCategory !== "Todas") {
                    filteredTools = filteredTools.filter(app =>
                        app.categories && app.categories.includes(selectedCategory)
                    );
                }

                // FILTRO POR BUSCA
                if (searchQuery.trim() !== "") {
                    filteredTools = filteredTools.filter(app =>
                        (app.title?.rendered?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                        (app.acf?.app_title?.toLowerCase() || "").includes(searchQuery.toLowerCase())
                    );
                }

                setTools(filteredTools);
            } catch (error) {
                console.error("Erro ao buscar ferramentas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTools();
    }, [selectedCategory, searchQuery]);

    return (
        <div className="flex flex-col w-full md:w-3/4 mx-auto font-['Poppins',sans-serif]">
            {/* Grid de Ferramentas ajustado para ser responsivo */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 w-full">
                {loading ? (
                    <p className="col-span-full text-center text-[#aeb4bc]">Carregando ferramentas...</p>
                ) : tools.length > 0 ? (
                    tools.map((tool, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center p-4 text-center hover:opacity-90 transition-all hover:scale-105 container-border cursor-pointer group"
                        >
                            <div className="w-[80px] h-[80px] flex items-center justify-center mb-3 bg-[rgba(255,255,255,0.05)] rounded-lg p-2 border border-[rgba(255,255,255,0.05)] group-hover:border-[#d1fc92]/30 transition-colors">
                                <img
                                    src={tool.acf?.app_logo?.url || "https://placehold.co/122"}
                                    alt={tool.acf?.app_title || tool.title || "Ferramenta"}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                            <p className="text-[#d1d5db] text-xs sm:text-sm font-medium group-hover:text-white transition-colors line-clamp-1">
                                {tool.acf?.app_title || tool.title}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-[#aeb4bc]">Nenhuma ferramenta encontrada</p>
                )}
            </div>

            {/* Footer de Call to Action */}
            <div className="container-border p-6 rounded-xl mt-8 flex flex-col sm:flex-row sm:justify-between items-center text-center sm:text-left gap-4 w-full">
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
                    rel="noopener noreferrer"
                >
                    Sugerir ferramenta <ArrowRight className="ml-2" size={16} />
                </a>
            </div>
        </div>
    );
};

export default ToolGrid;