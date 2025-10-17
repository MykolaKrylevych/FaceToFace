import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import UserList from "./UserList";
import NewUserForm from "./NewUserForm";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState("all"); // "all" | "new"

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6 flex-1 overflow-auto">
          <h2 className="text-3xl font-extrabold text-cyan-400 mb-6 tracking-wide drop-shadow-lg">
            Users Management
          </h2>

          {/* Neon Switch */}
          <div className="flex gap-4 mb-6">
            <button
              className={`px-5 py-2 rounded-lg font-semibold transition transform ${
                view === "all"
                  ? "bg-cyan-500 text-black shadow-[0_0_10px_cyan] hover:scale-105"
                  : "bg-gray-800 text-gray-400 border border-cyan-600 hover:shadow-[0_0_8px_cyan] hover:text-cyan-400"
              }`}
              onClick={() => setView("all")}
            >
              All Users
            </button>
            <button
              className={`px-5 py-2 rounded-lg font-semibold transition transform ${
                view === "new"
                  ? "bg-pink-500 text-black shadow-[0_0_10px_fuchsia] hover:scale-105"
                  : "bg-gray-800 text-gray-400 border border-pink-600 hover:shadow-[0_0_8px_fuchsia] hover:text-pink-400"
              }`}
              onClick={() => setView("new")}
            >
              New User
            </button>
          </div>

          {/* Content */}
          {view === "all" ? <UserList /> : <NewUserForm />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
