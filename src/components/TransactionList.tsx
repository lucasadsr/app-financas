import React from "react";
import { FileMinus } from "lucide-react";
import type { Transaction } from "@/hooks/useTransactions";

type Props = {
  transactions: Transaction[];
  onRemove: (id: string) => void;
};

function formatDate(dateStr: string) {
  const dt = new Date(dateStr);
  return dt.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export const TransactionList: React.FC<Props> = ({
  transactions,
  onRemove,
}) => {
  if (transactions.length === 0) {
    return (
      <div className="w-full py-16 text-center text-gray-400">
        Nenhum gasto encontrado.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      {transactions.map((t) => (
        <div
          key={t.id}
          className="flex items-center justify-between bg-gray-50 border rounded px-4 py-3 hover:shadow-md transition group"
        >
          <div>
            <div className="font-bold text-gray-800">{t.title}</div>
            <div className="text-gray-500 text-xs">{t.description}</div>
            <div className="text-gray-400 text-xs mt-1">
              {formatDate(t.date)}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-green-600 font-mono font-bold text-lg">
              R$ {t.price.toFixed(2)}
            </span>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
              {t.category}
            </span>
            <button
              className="ml-2 text-gray-300 hover:text-red-500 focus:outline-none transition"
              onClick={() => onRemove(t.id)}
              title="Excluir"
            >
              <FileMinus size={22} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
