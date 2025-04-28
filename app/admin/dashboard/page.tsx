"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building, GraduationCap, Plus, School } from "lucide-react"
import { useRouter } from "next/navigation"
import AdminHeader from "@/components/admin-header"
import { toast } from "@/hooks/use-toast"

// Dados simulados
const mockInstituicoes = [
  { id: 1, nome: "Universidade Federal", endereco: "Av. Principal, 1000" },
  { id: 2, nome: "Universidade Estadual", endereco: "Rua das Flores, 500" },
  { id: 3, nome: "Faculdade Particular", endereco: "Av. Central, 250" },
]

const mockAlunos = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    instituicao: "Universidade Federal",
    curso: "Ciência da Computação",
    saldoMoedas: 150.5,
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    email: "maria@email.com",
    instituicao: "Universidade Estadual",
    curso: "Engenharia",
    saldoMoedas: 80.0,
  },
  {
    id: 3,
    nome: "Pedro Santos",
    email: "pedro@email.com",
    instituicao: "Faculdade Particular",
    curso: "Administração",
    saldoMoedas: 200.0,
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana@email.com",
    instituicao: "Universidade Federal",
    curso: "Medicina",
    saldoMoedas: 120.5,
  },
]

const mockEmpresas = [
  { id: 1, nome: "Tech Solutions", email: "contato@techsolutions.com", cnpj: "12345678901234", ramo: "Tecnologia" },
  { id: 2, nome: "Livraria Técnica", email: "contato@livrariatecnica.com", cnpj: "98765432109876", ramo: "Educação" },
  { id: 3, nome: "CertificaEdu", email: "contato@certificaedu.com", cnpj: "45678901234567", ramo: "Educação" },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [instituicoes, setInstituicoes] = useState(mockInstituicoes)
  const [alunos, setAlunos] = useState(mockAlunos)
  const [empresas, setEmpresas] = useState(mockEmpresas)
  const [novaInstituicao, setNovaInstituicao] = useState({ nome: "", endereco: "" })
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Em produção, buscaria dados do backend
    // const fetchData = async () => {
    //   try {
    //     const instituicoesResponse = await api.get("/api/instituicoes");
    //     setInstituicoes(instituicoesResponse.data);
    //
    //     const alunosResponse = await api.get("/api/alunos");
    //     setAlunos(alunosResponse.data);
    //
    //     const empresasResponse = await api.get("/api/empresas");
    //     setEmpresas(empresasResponse.data);
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

  const handleAddInstituicao = async (e) => {
    e.preventDefault()

    if (!novaInstituicao.nome || !novaInstituicao.endereco) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Em produção, enviaria para o backend
      // const response = await api.post("/api/instituicoes", novaInstituicao);

      // Simulação de adição
      const novaInst = {
        ...novaInstituicao,
        id: instituicoes.length + 1,
      }

      setInstituicoes([...instituicoes, novaInst])
      setNovaInstituicao({ nome: "", endereco: "" })
      setOpenDialog(false)

      toast({
        title: "Sucesso",
        description: "Instituição adicionada com sucesso",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao adicionar instituição",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteInstituicao = async (id) => {
    try {
      // Em produção, enviaria para o backend
      // await api.delete(`/api/instituicoes/${id}`);

      // Simulação de remoção
      setInstituicoes(instituicoes.filter((inst) => inst.id !== id))

      toast({
        title: "Sucesso",
        description: "Instituição removida com sucesso",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao remover instituição",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card de estatísticas - Instituições */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Instituições</CardTitle>
              <CardDescription>Total cadastrado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 rounded-full mr-3">
                    <School className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{instituicoes.length}</p>
                  </div>
                </div>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Instituição</DialogTitle>
                      <DialogDescription>Preencha os dados da nova instituição</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddInstituicao} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome da Instituição</Label>
                        <Input
                          id="nome"
                          value={novaInstituicao.nome}
                          onChange={(e) => setNovaInstituicao({ ...novaInstituicao, nome: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input
                          id="endereco"
                          value={novaInstituicao.endereco}
                          onChange={(e) => setNovaInstituicao({ ...novaInstituicao, endereco: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit" disabled={loading}>
                          {loading ? "Adicionando..." : "Adicionar"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Card de estatísticas - Alunos */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Alunos</CardTitle>
              <CardDescription>Total cadastrado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="bg-green-500 p-2 rounded-full mr-3">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{alunos.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card de estatísticas - Empresas */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Empresas Parceiras</CardTitle>
              <CardDescription>Total cadastrado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="bg-purple-500 p-2 rounded-full mr-3">
                  <Building className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{empresas.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="instituicoes">
          <TabsList className="mb-4">
            <TabsTrigger value="instituicoes">Instituições</TabsTrigger>
            <TabsTrigger value="alunos">Alunos</TabsTrigger>
            <TabsTrigger value="empresas">Empresas Parceiras</TabsTrigger>
          </TabsList>

          <TabsContent value="instituicoes">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instituições Cadastradas</CardTitle>
                <CardDescription>Gerencie as instituições de ensino</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">ID</th>
                        <th className="text-left py-3 px-2">Nome</th>
                        <th className="text-left py-3 px-2">Endereço</th>
                        <th className="text-left py-3 px-2">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {instituicoes.map((instituicao) => (
                        <tr key={instituicao.id} className="border-b">
                          <td className="py-3 px-2">{instituicao.id}</td>
                          <td className="py-3 px-2">{instituicao.nome}</td>
                          <td className="py-3 px-2">{instituicao.endereco}</td>
                          <td className="py-3 px-2">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteInstituicao(instituicao.id)}
                            >
                              Remover
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {instituicoes.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Nenhuma instituição cadastrada.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alunos">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Alunos Cadastrados</CardTitle>
                <CardDescription>Lista de todos os alunos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Nome</th>
                        <th className="text-left py-3 px-2">Email</th>
                        <th className="text-left py-3 px-2">Instituição</th>
                        <th className="text-left py-3 px-2">Curso</th>
                        <th className="text-left py-3 px-2">Saldo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alunos.map((aluno) => (
                        <tr key={aluno.id} className="border-b">
                          <td className="py-3 px-2">{aluno.nome}</td>
                          <td className="py-3 px-2">{aluno.email}</td>
                          <td className="py-3 px-2">{aluno.instituicao}</td>
                          <td className="py-3 px-2">{aluno.curso}</td>
                          <td className="py-3 px-2">
                            <Badge variant="outline" className="bg-blue-50">
                              {aluno.saldoMoedas.toFixed(1)} moedas
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {alunos.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Nenhum aluno cadastrado.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="empresas">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Empresas Parceiras</CardTitle>
                <CardDescription>Lista de todas as empresas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Nome</th>
                        <th className="text-left py-3 px-2">Email</th>
                        <th className="text-left py-3 px-2">CNPJ</th>
                        <th className="text-left py-3 px-2">Ramo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empresas.map((empresa) => (
                        <tr key={empresa.id} className="border-b">
                          <td className="py-3 px-2">{empresa.nome}</td>
                          <td className="py-3 px-2">{empresa.email}</td>
                          <td className="py-3 px-2">
                            {empresa.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}
                          </td>
                          <td className="py-3 px-2">{empresa.ramo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {empresas.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Nenhuma empresa cadastrada.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
