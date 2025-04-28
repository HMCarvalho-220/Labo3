"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins } from "lucide-react"

interface VantagemCardProps {
  vantagem: {
    id: number
    titulo: string
    descricao: string
    valor: number
    empresa: string
  }
  onResgatar: (id: number) => void
  disabled: boolean
}

export default function VantagemCard({ vantagem, onResgatar, disabled }: VantagemCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{vantagem.titulo}</CardTitle>
        <CardDescription>{vantagem.empresa}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm">{vantagem.descricao}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <div className="flex items-center">
          <Coins className="h-4 w-4 text-blue-500 mr-1" />
          <span className="font-bold">{vantagem.valor}</span>
        </div>
        <Button onClick={() => onResgatar(vantagem.id)} disabled={disabled} size="sm">
          Resgatar
        </Button>
      </CardFooter>
    </Card>
  )
}
