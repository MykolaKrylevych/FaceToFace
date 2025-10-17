import React from "react";
import { User, Home, Settings, X } from "lucide-react";

const Sidebar = ({ open, setOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-900 shadow-xl transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:shadow-none`}
    >
      <div className="flex justify-between items-center p-6 border-b border-gray-700 md:hidden">
        <span className="font-bold text-xl text-cyan-400 tracking-wide">Admin Panel</span>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-cyan-400 transition"
        >
          <X size={24} />
        </button>
      </div>
      <nav className="flex flex-col p-6 space-y-4">
        {[
          { label: "Dashboard", icon: <Home size={20} /> },
          { label: "Users", icon: <User size={20} /> },
          { label: "Settings", icon: <Settings size={20} /> },
        ].map((item) => (
          <a
            key={item.label}
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:shadow-[0_0_10px_cyan] transition"
          >
            {item.icon} {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
