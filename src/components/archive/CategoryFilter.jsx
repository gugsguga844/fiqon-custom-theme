import React, { useEffect, useState } from "react";

const CategoryFilter = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      const fetchCategories = async () => {
          try {
              const res = await fetch("https://fiqon.com.br/wp-json/wp/v2/app-category?per_page=100");
              const data = await res.json();
              setCategories([{ id: null, name: "Todas" }, ...data]);
          } catch (error) {
              console.error("Erro ao buscar categorias:", error);
          }
      };
      fetchCategories();
  }, []);

  return (
      <div className="p-4 border rounded-lg w-1/4">
          <h3 className="text-gray-600 font-semibold mb-2 border-b pb-2">POR CATEGORIA</h3>
          <div className="px-2">
              <ul className="space-y-2">
                  {categories.map((category, index) => (
                      <li
                          key={index}
                          onClick={() => onSelectCategory(category.id)}
                          className="flex justify-between items-center text-gray-700 cursor-pointer hover:text-green-600"
                      >
                          <span>{category.name}</span>
                      </li>
                  ))}
              </ul>
          </div>
      </div>
  );
};

export default CategoryFilter;