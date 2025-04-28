"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Building, LogOut } from "lucide-react"

interface EmpresaHeaderProps {
  empresa: {
    nome: string
  }
  onLogout: () => void
}

export default function EmpresaHeader({ empresa, onLogout }: EmpresaHeaderProps) {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-500 p-2 rounded-full mr-2">
              <Building className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Sistema Monetário - Empresas</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {empresa.nome
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium hidden sm:inline">{empresa.nome}</span>
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
