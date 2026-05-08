import React, { useEffect, useState } from "react";

const Possibilities = () => {
  const [activeTab, setActiveTab] = useState("triggers");
  const [appName, setAppName] = useState("");
  const [triggers, setTriggers] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppData = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://fiqon.com.br/wp-json/wp/v2/apps?per_page=100");
        const data = await res.json();

        const slug = window.location.pathname.split("/").filter(Boolean).pop();
        const matchingApp = data.find((app) => app.slug === slug);
        if (!matchingApp) return;

        const appTitle =
          matchingApp.acf?.app_title ||
          matchingApp.title?.rendered ||
          "Aplicativo";

        const appTriggers = matchingApp.app_trigger || [];
        const appActions = matchingApp.app_actions || [];

        const appIcon =
          matchingApp.acf?.app_logo?.url || "https://placehold.co/48";

        const formattedTriggers = appTriggers.map((item) => ({
          icon: appIcon,
          title: item.title,
          description: item.description,
          app_name: appTitle,
        }));

        const formattedActions = appActions.map((item) => ({
          icon: appIcon,
          title: item.title,
          description: item.description,
          app_name: appTitle,
        }));

        if (formattedTriggers.length > 0) {
          setActiveTab("triggers");
        } else if (formattedActions.length > 0) {
          setActiveTab("actions");
        }

        setAppName(appTitle);
        setTriggers(formattedTriggers);
        setActions(formattedActions);
      } catch (error) {
        console.error("Erro ao buscar dados do app:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppData();
  }, []);

  const showTriggers = triggers.length > 0;
  const showActions = actions.length > 0;

  return (
    <div className="text-center font-['Poppins',sans-serif]">
      {/* Títulos com identidade visual */}
      <h2 className="text-white font-['brutaslime-bold'] text-3xl md:text-4xl">
        Veja todas as possibilidades
      </h2>
      <p className="text-[#aeb4bc] mt-4 text-lg">
        Confira o que é possível fazer unindo{" "}
        <span className="font-semibold text-[#d1fc92]">{appName}</span> e{" "}
        <span className="font-semibold text-[#d1fc92]">FiqOn</span>
      </p>

      {/* Tabs */}
      {(showTriggers || showActions) && (
        <div className="relative flex justify-center items-center mt-10 pb-2">
          {/* Linha Tracejada Translúcida */}
          <div className="absolute w-full h-[1px] border-t border-dashed border-[rgba(255,255,255,0.1)]"></div>

          <div
            className={`relative z-10 flex px-2 ${showTriggers && showActions
              ? "space-x-4"
              : "justify-center w-full"
              }`}
          >
            {showTriggers && (
              <button
                className={`text-sm md:text-base flex justify-center items-center cursor-pointer px-6 py-2.5 rounded-xl transition-all font-medium ${activeTab === "triggers"
                  ? "bg-[#d1fc92] text-[#0A0F0D] font-bold border-transparent shadow-[0_0_15px_rgba(209,252,146,0.2)]"
                  : "bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#aeb4bc] hover:text-white hover:border-[#d1fc92]/50 outline-none"
                  }`}
                onClick={() => setActiveTab("triggers")}
              >
                GATILHOS ({triggers.length})
              </button>
            )}
            {showActions && (
              <button
                className={`text-sm md:text-base flex justify-center items-center cursor-pointer px-6 py-2.5 rounded-xl transition-all font-medium ${activeTab === "actions"
                  ? "bg-[#d1fc92] text-[#0A0F0D] font-bold border-transparent shadow-[0_0_15px_rgba(209,252,146,0.2)]"
                  : "bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#aeb4bc] hover:text-white hover:border-[#d1fc92]/50 outline-none"
                  }`}
                onClick={() => setActiveTab("actions")}
              >
                AÇÕES ({actions.length})
              </button>
            )}
          </div>
        </div>
      )}

      {/* Cards de Gatilhos/Ações (Aplicado Glassmorphism e Hover Effects) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 text-left">
        {loading ? (
          <p className="col-span-full text-center text-[#aeb4bc]">Carregando possibilidades...</p>
        ) : (
          (activeTab === "triggers" ? triggers : actions).map((item, index) => (
            <div
              key={index}
              className="container-border p-5 rounded-xl flex items-start gap-5 hover:bg-[rgba(255,255,255,0.02)] transition-colors group"
            >
              {/* Box da Logo */}
              <div className="w-[70px] h-[70px] flex-shrink-0 flex justify-center items-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] rounded-lg p-2 group-hover:border-[#d1fc92]/30 transition-colors">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Textos */}
              <div className="flex-1">
                <p className="text-white font-semibold text-[1.05rem] leading-tight mb-1.5">{item.title}</p>
                <p className="text-[#aeb4bc] text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export { Possibilities };