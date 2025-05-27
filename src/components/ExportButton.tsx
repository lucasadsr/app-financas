import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Transaction } from "@/hooks/useTransactions";

type Props = {
  transactions: Transaction[];
};

function exportJSON(transactions: Transaction[]) {
  const json = JSON.stringify(transactions, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "finance-gastos.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const ExportButton: React.FC<Props> = ({ transactions }) => (
  <Button
    variant="outline"
    onClick={() => exportJSON(transactions)}
    className="flex items-center gap-2"
    title="Exportar dados"
  >
    <Download />
    Exportar Dados
  </Button>
);

export default ExportButton;
