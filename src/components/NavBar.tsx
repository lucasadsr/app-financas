import React from "react";
import { Plus, LogOut } from "lucide-react";

type Props = {
  user: string;
  openModal: () => void;
  onLogout: () => void;
};

const Navbar: React.FC<Props> = ({ user, openModal, onLogout }) => {
  return (
    <nav className="w-full flex items-center justify-between py-5 px-6 bg-white shadow z-10 relative">
      <div className="flex items-center gap-3">
        <span className="text-blue-600 font-bold text-xl">Finanças</span>
        <span className="text-gray-400 ml-2 text-sm hidden sm:inline">
          Olá, <span className="font-medium">{user}</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition text-white px-4 py-2 rounded flex items-center gap-2 shadow"
        >
          <Plus size={18} />
          Novo Gasto
        </button>
        <button
          className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition"
          title="Sair"
          onClick={onLogout}
        >
          <LogOut size={20} />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
