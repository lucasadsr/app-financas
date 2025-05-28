import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "Preencha seu nome!" });
      return;
    }
    localStorage.setItem("finance_user", name);
    navigate("/");
    toast({ title: `Bem-vindo, ${name.split(" ")[0]}!` });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-emerald-50 to-white">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 rounded-2xl shadow-2xl px-8 py-12 w-full max-w-md space-y-8 flex flex-col items-center animate-fade-in"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="bg-blue-600 text-white rounded-full p-3 shadow-lg mb-2">
            <User size={32} />
          </span>
          <h1 className="text-3xl font-bold mb-0 text-center tracking-tight">
            Finanças Pessoais
          </h1>
          <p className="text-md text-gray-500 text-center font-medium mt-0 mb-1">
            Gerencie seus gastos mensais com facilidade.
          </p>
        </div>
        <div className="w-full space-y-3 mt-2">
          <Label htmlFor="name-input" className="text-base">
            Seu nome
          </Label>
          <Input
            id="name-input"
            type="text"
            value={name}
            autoFocus
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            placeholder="ex: Ana"
            className="text-lg py-4 px-5 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-inner transition"
          />
        </div>
        <Button
          type="submit"
          className="w-full mt-2 text-lg h-12 font-bold bg-blue-600 hover:bg-blue-700 transition hover:scale-105 shadow-lg"
        >
          Entrar
        </Button>
        <div className="text-xs text-muted-foreground mt-3 text-center">
          Seus dados são salvos apenas neste navegador.
        </div>
      </form>
    </div>
  );
};

export default Login;
