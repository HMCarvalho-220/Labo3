"use client"

import { Button } from "@/components/ui/button"
import { Shield, LogOut } from "lucide-react"

interface AdminHeaderProps {
  onLogout: () => void
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-500 p-2 rounded-full mr-2">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Sistema Monetário - Administração</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
