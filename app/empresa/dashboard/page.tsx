"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Building, Plus, Package, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import EmpresaHeader from "@/components/empresa-header"
import VantagemForm from "@/components/vantagem-form"

// Dados simulados
const mockEmpresa = {
  id: 1,
  nome: "Tech Solutions",
  email: "contato@techsolutions.com",
  cnpj: "12345678901234",
  ramo: "Tecnologia",
  descricao: "Empresa especializada em soluções tecnológicas para o mercado educacional.",
}

const mockVantagens = [
  {
    id: 1,
    titulo: "Desconto em Software",
    descricao: "50% de desconto em licença anual",
    valor: 120,
    quantidadeResgatada: 15,
  },
  { id: 2, titulo: "Curso Online", descricao: "Acesso a curso de programação", valor: 80, quantidadeResgatada: 23 },
  { id: 3, titulo: "Mentoria", descricao: "1 hora de mentoria com profissional", valor: 150, quantidadeResgatada: 5 },
]

const mockResgatadores = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    instituicao: "Universidade Federal",
    vantagem: "Curso Online",
    data: "2023-05-15T14:30:00",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    email: "maria@email.com",
    instituicao: "Universidade Estadual",
    vantagem: "Desconto em Software",
    data: "2023-05-10T09:15:00",
  },
  {
    id: 3,
    nome: "Pedro Santos",
    email: "pedro@email.com",
    instituicao: "Faculdade Particular",
    vantagem: "Mentoria",
    data: "2023-05-05T16:45:00",
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana@email.com",
    instituicao: "Universidade Federal",
    vantagem: "Curso Online",
    data: "2023-04-28T11:20:00",
  },
]

export default function EmpresaDashboard() {
  const router = useRouter()
  const [empresa, setEmpresa] = useState(mockEmpresa)
  const [vantagens, setVantagens] = useState(mockVantagens)
  const [resgatadores, setResgatadores] = useState(mockResgatadores)
  const [showVantagemForm, setShowVantagemForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Em produção, buscaria dados do backend
    // const fetchData = async () => {
    //   try {
    //     const empresaResponse = await api.get("/api/empresas/me");
    //     setEmpresa(empresaResponse.data);
    //
    //     const vantagensResponse = await api.get("/api/empresas/me/vantagens");
    //     setVantagens(vantagensResponse.data);
    //
    //     const resgatadoresResponse = await api.get("/api/empresas/me/resgatadores");
    //     setResgatadores(resgatadoresResponse.data);
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

  const handleAddVantagem = (novaVantagem) => {
    // Em produção, enviaria para o backend
    // api.post("/api/empresas/me/vantagens", novaVantagem)

    // Simulação de adição
    const vantagemComId = {
      ...novaVantagem,
      id: vantagens.length + 1,
      quantidadeResgatada: 0,
    }

    setVantagens([...vantagens, vantagemComId])
    setShowVantagemForm(false)
  }

  const handleDeleteVantagem = (vantagemId) => {
    // Em produção, enviaria para o backend
    // api.delete(`/api/empresas/me/vantagens/${vantagemId}`)

    // Simulação de remoção
    setVantagens(vantagens.filter((v) => v.id !== vantagemId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EmpresaHeader empresa={empresa} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Informações da empresa */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Informações da Empresa</CardTitle>
              <CardDescription>Seus dados cadastrais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                    {empresa.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-medium text-lg">{empresa.nome}</h3>
                  <p className="text-sm text-muted-foreground">{empresa.email}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-blue-50">
                      {empresa.ramo}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50">
                      CNPJ: {empresa.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}
                    </Badge>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <p className="text-sm">{empresa.descricao}</p>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Estatísticas</CardTitle>
              <CardDescription>Resumo de atividades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-500 p-2 rounded-full mr-3">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Vantagens</p>
                      <p className="text-xl font-bold">{vantagens.length}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-500 p-2 rounded-full mr-3">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Resgatadores</p>
                      <p className="text-xl font-bold">{resgatadores.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="vantagens">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="vantagens">Vantagens Oferecidas</TabsTrigger>
                <TabsTrigger value="resgatadores">Alunos Resgatadores</TabsTrigger>
              </TabsList>

              {!showVantagemForm && (
                <Button onClick={() => setShowVantagemForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Vantagem
                </Button>
              )}
            </div>

            <TabsContent value="vantagens" className="space-y-4">
              {showVantagemForm && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Nova Vantagem</CardTitle>
                    <CardDescription>Preencha os dados da vantagem a ser oferecida</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VantagemForm onSubmit={handleAddVantagem} onCancel={() => setShowVantagemForm(false)} />
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vantagens.map((vantagem) => (
                  <Card key={vantagem.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{vantagem.titulo}</CardTitle>
                        <Badge>{vantagem.valor} moedas</Badge>
                      </div>
                      <CardDescription>{vantagem.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Resgatada</p>
                          <p className="font-medium">{vantagem.quantidadeResgatada} vezes</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteVantagem(vantagem.id)}>
                          Remover
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {vantagens.length === 0 && !showVantagemForm && (
                <div className="text-center py-12">
                  <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhuma vantagem cadastrada</h3>
                  <p className="text-muted-foreground mb-4">
                    Adicione vantagens para que os alunos possam resgatá-las com suas moedas.
                  </p>
                  <Button onClick={() => setShowVantagemForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Vantagem
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="resgatadores">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Alunos Resgatadores</CardTitle>
                  <CardDescription>Alunos que resgataram suas vantagens</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Aluno</th>
                          <th className="text-left py-3 px-2">Instituição</th>
                          <th className="text-left py-3 px-2">Vantagem</th>
                          <th className="text-left py-3 px-2">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resgatadores.map((resgatador) => (
                          <tr key={resgatador.id} className="border-b">
                            <td className="py-3 px-2">
                              <div>
                                <p className="font-medium">{resgatador.nome}</p>
                                <p className="text-sm text-muted-foreground">{resgatador.email}</p>
                              </div>
                            </td>
                            <td className="py-3 px-2">{resgatador.instituicao}</td>
                            <td className="py-3 px-2">{resgatador.vantagem}</td>
                            <td className="py-3 px-2">{new Date(resgatador.data).toLocaleDateString("pt-BR")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {resgatadores.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Nenhum aluno resgatou suas vantagens ainda.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
