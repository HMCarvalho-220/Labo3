"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Building } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function CadastroEmpresa() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cnpj: "",
    senha: "",
    confirmarSenha: "",
    ramo: "",
    descricao: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
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

    if (formData.cnpj.length !== 14) {
      toast({
        title: "Erro",
        description: "CNPJ deve conter 14 dígitos",
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
        cnpj: formData.cnpj,
        senha: formData.senha,
        ramo: formData.ramo,
        descricao: formData.descricao,
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
      // await api.post("/api/empresas", payload);
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
                <Building className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-xl">Cadastro de Empresa Parceira</CardTitle>
            </div>
          </div>
          <CardDescription>Preencha os dados abaixo para cadastrar sua empresa</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Empresa</Label>
                <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Corporativo</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ (apenas números)</Label>
                <Input id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} maxLength={14} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ramo">Ramo de Atividade</Label>
                <Input id="ramo" name="ramo" value={formData.ramo} onChange={handleChange} required />
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
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="descricao">Descrição da Empresa</Label>
                <Textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows={4} />
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
