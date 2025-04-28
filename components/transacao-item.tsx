import { ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface TransacaoItemProps {
  transacao: {
    id: number
    tipo: string
    valor: number
    descricao: string
    data: string
  }
}

export default function TransacaoItem({ transacao }: TransacaoItemProps) {
  const isCredito = transacao.tipo === "credito"

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isCredito ? "bg-green-100" : "bg-red-100"}`}>
            {isCredito ? (
              <ArrowUpCircle className="h-5 w-5 text-green-600" />
            ) : (
              <ArrowDownCircle className="h-5 w-5 text-red-600" />
            )}
          </div>
          <div>
            <p className="font-medium">{transacao.descricao}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(transacao.data).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        <p className={`font-bold ${isCredito ? "text-green-600" : "text-red-600"}`}>
          {isCredito ? "+" : "-"}
          {transacao.valor.toFixed(1)} moedas
        </p>
      </div>
      <Separator className="my-3" />
    </div>
  )
}
