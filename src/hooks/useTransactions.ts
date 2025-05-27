import { useCallback, useEffect, useState } from "react";

export type Transaction = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  date: string;
};

const STORAGE_KEY = "finance_transactions";

function getSaved(): Transaction[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function save(transactions: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(getSaved());
  }, []);

  const addTransaction = useCallback(
    (transaction: Omit<Transaction, "id" | "date">) => {
      const ts: Transaction = {
        ...transaction,
        id: Math.random().toString(36).slice(2),
        date: new Date().toISOString(),
      };
      const updated = [ts, ...getSaved()];
      setTransactions(updated);
      save(updated);
    },
    []
  );

  const removeTransaction = useCallback((id: string) => {
    const updated = getSaved().filter((t) => t.id !== id);
    setTransactions(updated);
    save(updated);
  }, []);

  return {
    transactions,
    addTransaction,
    removeTransaction,
  };
}
