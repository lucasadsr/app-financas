import { useState, useEffect } from "react";
import TransactionModal from "@/components/TransactionModal";
import { useTransactions } from "@/hooks/useTransactions";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import Navbar from "@/components/NavBar";
import FinanceCharts from "@/components/FinancesCharts";
import { ExportButton } from "@/components/ExportButton";
import { TransactionList } from "@/components/TransactionList";

function formatPriceBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const navigate = useNavigate();
  const { transactions, addTransaction, removeTransaction } = useTransactions();
  const categories = useCategories();

  useEffect(() => {
    const savedName = localStorage.getItem("finance_user");
    if (!savedName) {
      navigate("/login");
    } else {
      setUser(savedName);
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("finance_user");
    window.location.href = "/login";
  }

  // Stats
  const total = transactions.reduce((sum, t) => sum + t.price, 0);
  const bigCategory = transactions.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.price;
    return acc;
  }, {});
  const mainCategory =
    Object.entries(bigCategory).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Nenhum";

  // Filtragem por categoria
  const filteredTransactions =
    selectedCategory === "Todas"
      ? transactions
      : transactions.filter((t) => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-emerald-50 flex flex-col">
      <Navbar
        user={user || ""}
        openModal={() => setShowModal(true)}
        onLogout={handleLogout}
      />
      <main className="w-full flex-1 max-w-3xl mx-auto px-2 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-7">
          <div className="bg-white shadow rounded-xl px-5 py-7 flex flex-col items-center">
            <span className="font-bold text-gray-500 text-xs uppercase mb-2">
              Total Gasto
            </span>
            <span className="text-3xl font-bold text-emerald-600">
              {formatPriceBRL(total)}
            </span>
          </div>
          <div className="bg-white shadow rounded-xl px-5 py-7 flex flex-col items-center">
            <span className="font-bold text-gray-500 text-xs uppercase mb-2">
              Quantidade Gastos
            </span>
            <span className="text-3xl font-bold text-blue-600">
              {transactions.length}
            </span>
          </div>
          <div className="bg-white shadow rounded-xl px-5 py-7 flex flex-col items-center">
            <span className="font-bold text-gray-500 text-xs uppercase mb-2">
              Categoria Principal
            </span>
            <span className="text-2xl font-bold text-orange-600">
              {mainCategory}
            </span>
          </div>
        </div>
        <FinanceCharts transactions={transactions} />

        <div className="flex items-center justify-between mt-7 mb-3">
          <h2 className="text-xl font-bold">Gastos do Mês</h2>
          <div className="flex gap-3">
            <ExportButton transactions={transactions} />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 hover:bg-blue-700 shadow transition"
              onClick={() => setShowModal(true)}
            >
              + Novo Gasto
            </button>
          </div>
        </div>

        {/* Filtro de categoria */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">Filtrar por categoria:</span>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todas">Todas</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <TransactionList
          transactions={filteredTransactions}
          onRemove={removeTransaction}
        />
      </main>
      <TransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={addTransaction}
      />
    </div>
  );
};

export default Index;
