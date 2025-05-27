import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    title: string;
    description: string;
    price: number;
    category: string;
  }) => void;
};

const CATEGORIES = [
  "Alimentação",
  "Transporte",
  "Lazer",
  "Contas",
  "Educação",
  "Saúde",
  "Outros",
];

const TransactionModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !price.trim() || isNaN(Number(price))) {
      toast({ title: "Preencha os campos obrigatórios!" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onAdd({
        title,
        description,
        price: Number(price),
        category,
      });
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory(CATEGORIES[0]);
      setLoading(false);
      onClose();
      toast({ title: "Gasto adicionado com sucesso!" });
    }, 400);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-2 animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md px-7 py-7 relative flex flex-col gap-5 animate-scale-in"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-red-500 text-xl"
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 className="text-2xl mb-2 font-bold text-gray-800 text-center">
          Novo Gasto
        </h2>

        <div>
          <label className="block mb-1 text-gray-700">Título*</label>
          <input
            className="w-full px-3 py-2 rounded border outline-none focus:ring-2 ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ex: Mercado"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Descrição</label>
          <input
            className="w-full px-3 py-2 rounded border outline-none focus:ring-2 ring-blue-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="opcional"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block mb-1 text-gray-700">Preço (R$)*</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 rounded border outline-none focus:ring-2 ring-green-400"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0,00"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-700">Categoria*</label>
            <select
              className="w-full px-3 py-2 rounded border focus:ring-2 ring-blue-300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="mt-6 py-2 rounded bg-emerald-600 text-white font-bold hover:bg-emerald-700 active:scale-95 transition shadow"
          type="submit"
          disabled={loading}
        >
          {loading ? "Adicionando..." : "Adicionar"}
        </button>
      </form>
    </div>
  );
};

export default TransactionModal;
