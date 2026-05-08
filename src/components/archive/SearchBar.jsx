import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
    return (
        <div className="flex items-center border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] rounded-full px-5 py-4 w-full shadow-sm focus-within:border-[#d1fc92]/50 focus-within:shadow-[0_0_15px_rgba(209,252,146,0.1)] transition-all duration-300 backdrop-blur-sm">
            <Search className="text-[#aeb4bc]" size={20} />
            <input
                type="text"
                placeholder="Buscar ferramenta..."
                className="w-full bg-transparent outline-none px-3 text-white placeholder-[#aeb4bc] border-none font-['Poppins',sans-serif]"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;