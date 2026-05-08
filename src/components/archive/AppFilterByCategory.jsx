import React, { useState, useEffect } from "react";

const AppFilterByCategory = () => {
    const [categories, setCategories] = useState([]);
    const [apps, setApps] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); // Categoria selecionada

    // Buscar categorias
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("https://fiqon.com.br/wp-json/wp/v2/app-category?per_page=100");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };
        fetchCategories();
    }, []);

    // Buscar apps filtrados por categoria
    useEffect(() => {
        if (selectedCategory) {
            const fetchAppsByCategory = async () => {
                try {
                    const res = await fetch(`https://fiqon.com.br/wp-json/wp/v2/apps?per_page=100`);
                    const data = await res.json();

                    // Filtra os apps que possuem a categoria selecionada
                    const filteredApps = data.filter(app =>
                        app["app-category"] && app["app-category"].includes(selectedCategory)
                    );

                    setApps(filteredApps);
                } catch (error) {
                    console.error("Erro ao buscar apps:", error);
                }
            };

            fetchAppsByCategory();
        }
    }, [selectedCategory]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Categorias</h2>
            <div className="flex flex-wrap gap-3 mb-6">
                {categories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 
                        ${selectedCategory === category.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"}`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedCategory ? "Apps da categoria selecionada" : "Selecione uma categoria"}
            </h2>

            {selectedCategory ? (
                apps.length > 0 ? (
                    <ul className="space-y-4">
                        {apps.map(app => (
                            <li key={app.id} className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{app.title.rendered}</h3>
                                    <p className="text-gray-600">{app.acf?.app_title}</p>
                                </div>
                                <a
                                    href={app.link}
                                    className="px-4 py-2 mt-2 md:mt-0 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Acessar
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-center mt-4">Nenhum app encontrado para esta categoria.</p>
                )
            ) : (
                <p className="text-gray-600 text-center mt-4">Clique em uma categoria acima para ver os apps.</p>
            )}
        </div>
    );
};

export default AppFilterByCategory;
