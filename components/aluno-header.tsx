"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Coins, LogOut } from "lucide-react"

interface AlunoHeaderProps {
  aluno: {
    nome: string
    saldoMoedas: number
  }
  onLogout: () => void
}

export default function AlunoHeader({ aluno, onLogout }: AlunoHeaderProps) {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-500 p-2 rounded-full mr-2">
              <Coins className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Sistema Monetário</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                <Coins className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-medium">{aluno.saldoMoedas.toFixed(1)} moedas</span>
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {aluno.nome
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium hidden sm:inline">{aluno.nome}</span>
            </div>

            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
