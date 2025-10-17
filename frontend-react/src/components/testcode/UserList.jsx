import React from "react";
import { Edit, Trash2 } from "lucide-react";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Viewer" },
];

const roleColors = {
  Admin: "bg-red-700 text-red-200 shadow-[0_0_8px_red]",
  Editor: "bg-yellow-600 text-yellow-200 shadow-[0_0_8px_yellow]",
  Viewer: "bg-green-600 text-green-200 shadow-[0_0_8px_green]",
};

const UserList = () => {
  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-cyan-400 font-bold tracking-wide">Name</th>
              <th className="px-6 py-3 text-left text-cyan-400 font-bold tracking-wide">Email</th>
              <th className="px-6 py-3 text-left text-cyan-400 font-bold tracking-wide">Role</th>
              <th className="px-6 py-3 text-left text-cyan-400 font-bold tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700 transition">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleColors[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button className="text-cyan-400 hover:text-cyan-500 transition">
                    <Edit size={18} />
                  </button>
                  <button className="text-pink-400 hover:text-pink-500 transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-gray-800 rounded-lg p-4 flex flex-col space-y-2 hover:shadow-[0_0_15px_cyan] transition transform hover:scale-105"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-cyan-400">{user.name}</h2>
              <div className="flex gap-2">
                <button className="text-cyan-400 hover:text-cyan-500 transition">
                  <Edit size={18} />
                </button>
                <button className="text-pink-400 hover:text-pink-500 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="text-gray-300 text-sm">{user.email}</p>
            <span className={`px-2 py-1 inline-block rounded-full text-xs font-semibold ${roleColors[user.role]}`}>
              {user.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
