import type { Transaction } from "@/hooks/useTransactions";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const CATEGORIES_COLORS: Record<string, string> = {
  Alimentação: "#06b6d4",
  Transporte: "#6366f1",
  Lazer: "#f43f5e",
  Contas: "#f59e42",
  Educação: "#10b981",
  Saúde: "#eab308",
  Outros: "#64748b",
};

type Props = {
  transactions: Transaction[];
};

function getGroupedByCategory(transactions: Transaction[]) {
  const result: Record<string, number> = {};
  transactions.forEach((tx) => {
    if (!result[tx.category]) result[tx.category] = 0;
    result[tx.category] += tx.price;
  });
  return Object.entries(result).map(([category, value]) => ({
    name: category,
    value,
  }));
}

function getPerDay(transactions: Transaction[]) {
  const days: Record<string, number> = {};
  transactions.forEach((tx) => {
    const day = new Date(tx.date).toLocaleDateString("pt-BR");
    days[day] = (days[day] || 0) + tx.price;
  });
  return Object.entries(days).map(([day, value]) => ({
    day,
    value,
  }));
}

const FinanceCharts: React.FC<Props> = ({ transactions }) => {
  const byCategory = getGroupedByCategory(transactions);
  const byDay = getPerDay(transactions);

  return (
    <div className="grid md:grid-cols-2 gap-8 my-6 w-full">
      <div className="bg-white shadow rounded p-5">
        <div className="font-bold mb-3 text-lg">Gastos por Categoria</div>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={byCategory}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              isAnimationActive
            >
              {byCategory.map((entry, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={CATEGORIES_COLORS[entry.name] || "#8884d8"}
                />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `R$ ${(v as number).toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white shadow rounded p-5">
        <div className="font-bold mb-3 text-lg">Gastos por Dia</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={byDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(v) => `R$ ${(v as number).toFixed(2)}`} />
            <Legend />
            <Bar dataKey="value" fill="#06b6d4" name="Gastos" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceCharts;
