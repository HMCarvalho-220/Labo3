"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Coins, ArrowLeft } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function CadastroAluno() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    confirmarSenha: "",
    rg: "",
    endereco: "",
    instituicaoId: "",
    curso: "",
  })
  const [instituicoes, setInstituicoes] = useState([
    { id: "1", nome: "Universidade Federal" },
    { id: "2", nome: "Universidade Estadual" },
    { id: "3", nome: "Faculdade Particular" },
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.senha !== formData.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      })
      return
    }

    if (formData.cpf.length !== 11) {
      toast({
        title: "Erro",
        description: "CPF deve conter 11 dígitos",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Em produção, conectaria com o backend real
      const payload = {
        nome: formData.nome,
        email: formData.email,
        cpf: formData.cpf,
        senha: formData.senha,
        rg: formData.rg,
        endereco: formData.endereco,
        instituicaoId: Number.parseInt(formData.instituicaoId),
        curso: formData.curso,
      }

      // Simulação de cadastro
      setTimeout(() => {
        toast({
          title: "Sucesso",
          description: "Cadastro realizado com sucesso!",
        })
        router.push("/")
        setLoading(false)
      }, 1500)

      // Código para API real:
      // await api.post("/api/alunos", payload);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao realizar cadastro. Tente novamente.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center">
              <div className="bg-blue-500 p-2 rounded-full mr-2">
                <Coins className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-xl">Cadastro de Aluno</CardTitle>
            </div>
          </div>
          <CardDescription>Preencha os dados abaixo para criar sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF (apenas números)</Label>
                <Input id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} maxLength={11} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rg">RG</Label>
                <Input id="rg" name="rg" value={formData.rg} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                <Input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instituicao">Instituição</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("instituicaoId", value)}
                  value={formData.instituicaoId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma instituição" />
                  </SelectTrigger>
                  <SelectContent>
                    {instituicoes.map((inst) => (
                      <SelectItem key={inst.id} value={inst.id}>
                        {inst.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="curso">Curso</Label>
                <Input id="curso" name="curso" value={formData.curso} onChange={handleChange} required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="endereco">Endereço Completo</Label>
                <Input id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Já possui uma conta?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Faça login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
