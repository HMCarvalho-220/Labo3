"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface VantagemFormProps {
  onSubmit: (vantagem: any) => void
  onCancel: () => void
}

export default function VantagemForm({ onSubmit, onCancel }: VantagemFormProps) {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    valor: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      titulo: formData.titulo,
      descricao: formData.descricao,
      valor: Number.parseInt(formData.valor),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="titulo">Título da Vantagem</Label>
        <Input id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="valor">Valor em Moedas</Label>
        <Input id="valor" name="valor" type="number" min="1" value={formData.valor} onChange={handleChange} required />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Adicionar Vantagem</Button>
      </div>
    </form>
  )
}
