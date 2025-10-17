import React from "react";
import { Menu } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex justify-between items-center bg-gray-900 p-4 shadow-md md:shadow-sm rounded-b-lg border-b border-gray-700">
      <button
        className="md:hidden text-gray-400 hover:text-cyan-400 transition"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
      <h1 className="hidden md:block text-lg font-semibold text-cyan-400 tracking-wide">Dashboard</h1>
      <button className="bg-cyan-500 hover:bg-cyan-600 text-black px-5 py-2 rounded-lg shadow-[0_0_10px_cyan] font-bold transition transform hover:scale-105">
        Add User
      </button>
    </header>
  );
};

export default Header;
