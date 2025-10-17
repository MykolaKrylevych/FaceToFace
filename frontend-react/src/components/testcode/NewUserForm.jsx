import React, { useState } from "react";

const NewUserForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", role: "Viewer" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("User created!");
    setFormData({ name: "", email: "", role: "Viewer" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-[0_0_15px_cyan] max-w-md mx-auto space-y-4"
    >
      <h3 className="text-xl font-bold text-cyan-400 drop-shadow-md">Create New User</h3>

      <div>
        <label className="block text-gray-300 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-cyan-500 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-cyan-500 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-1">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-cyan-500 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-black py-2 rounded-lg font-bold shadow-[0_0_10px_cyan] transition transform hover:scale-105"
      >
        Create User
      </button>
    </form>
  );
};

export default NewUserForm;
