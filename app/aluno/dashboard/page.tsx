"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Coins, History } from "lucide-react"
import { useRouter } from "next/navigation"
import AlunoHeader from "@/components/aluno-header"
import TransacaoItem from "@/components/transacao-item"
import VantagemCard from "@/components/vantagem-card"

// Dados simulados
const mockAluno = {
  id: 1,
  nome: "João Silva",
  email: "joao.silva@aluno.com",
  saldoMoedas: 150.5,
  instituicaoNome: "Universidade Federal",
  curso: "Ciência da Computação",
}

const mockTransacoes = [
  { id: 1, tipo: "credito", valor: 50, descricao: "Participação em evento", data: "2023-05-15T14:30:00" },
  { id: 2, tipo: "debito", valor: 20, descricao: "Compra de certificado", data: "2023-05-10T09:15:00" },
  { id: 3, tipo: "credito", valor: 30, descricao: "Monitoria", data: "2023-05-05T16:45:00" },
  { id: 4, tipo: "debito", valor: 15, descricao: "Desconto em livro", data: "2023-04-28T11:20:00" },
  { id: 5, tipo: "credito", valor: 100, descricao: "Projeto de pesquisa", data: "2023-04-20T13:10:00" },
]

const mockVantagens = [
  {
    id: 1,
    titulo: "Desconto em Livros",
    descricao: "15% de desconto em livros técnicos",
    valor: 30,
    empresa: "Livraria Técnica",
  },
  { id: 2, titulo: "Curso Online", descricao: "Acesso a curso de programação", valor: 80, empresa: "Tech Cursos" },
  {
    id: 3,
    titulo: "Certificado Digital",
    descricao: "Certificado de participação em eventos",
    valor: 20,
    empresa: "CertificaEdu",
  },
  {
    id: 4,
    titulo: "Desconto em Software",
    descricao: "50% de desconto em licença anual",
    valor: 120,
    empresa: "SoftPro",
  },
]

export default function AlunoDashboard() {
  const router = useRouter()
  const [aluno, setAluno] = useState(mockAluno)
  const [transacoes, setTransacoes] = useState(mockTransacoes)
  const [vantagens, setVantagens] = useState(mockVantagens)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Em produção, buscaria dados do backend
    // const fetchData = async () => {
    //   try {
    //     const alunoResponse = await api.get("/api/alunos/me");
    //     setAluno(alunoResponse.data);
    //
    //     const transacoesResponse = await api.get("/api/transacoes");
    //     setTransacoes(transacoesResponse.data);
    //
    //     const vantagensResponse = await api.get("/api/vantagens");
    //     setVantagens(vantagensResponse.data);
    //   } catch (error) {
    //     console.error("Erro ao buscar dados:", error);
    //   }
    // };
    //
    // fetchData();
  }, [])

  const handleLogout = () => {
    router.push("/")
  }

  const handleResgatarVantagem = (vantagemId: number) => {
    // Em produção, enviaria para o backend
    // api.post(`/api/vantagens/${vantagemId}/resgatar`)

    // Simulação de resgate
    const vantagem = vantagens.find((v) => v.id === vantagemId)
    if (vantagem && aluno.saldoMoedas >= vantagem.valor) {
      setAluno({
        ...aluno,
        saldoMoedas: aluno.saldoMoedas - vantagem.valor,
      })

      const novaTransacao = {
        id: transacoes.length + 1,
        tipo: "debito",
        valor: vantagem.valor,
        descricao: `Resgate: ${vantagem.titulo}`,
        data: new Date().toISOString(),
      }

      setTransacoes([novaTransacao, ...transacoes])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AlunoHeader aluno={aluno} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cartão de saldo */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Seu Saldo</CardTitle>
              <CardDescription>Moedas disponíveis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 rounded-full mr-3">
                    <Coins className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{aluno.saldoMoedas.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">moedas</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <History className="h-4 w-4 mr-2" />
                  Histórico
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Informações do aluno */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Informações do Aluno</CardTitle>
              <CardDescription>Seus dados cadastrais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                    {aluno.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-medium text-lg">{aluno.nome}</h3>
                  <p className="text-sm text-muted-foreground">{aluno.email}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-blue-50">
                      {aluno.instituicaoNome}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50">
                      {aluno.curso}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="vantagens">
            <TabsList className="mb-4">
              <TabsTrigger value="vantagens">Vantagens Disponíveis</TabsTrigger>
              <TabsTrigger value="extrato">Extrato de Transações</TabsTrigger>
            </TabsList>

            <TabsContent value="vantagens" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {vantagens.map((vantagem) => (
                  <VantagemCard
                    key={vantagem.id}
                    vantagem={vantagem}
                    onResgatar={handleResgatarVantagem}
                    disabled={aluno.saldoMoedas < vantagem.valor}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="extrato">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Extrato de Transações</CardTitle>
                  <CardDescription>Histórico de créditos e débitos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transacoes.map((transacao) => (
                      <TransacaoItem key={transacao.id} transacao={transacao} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
