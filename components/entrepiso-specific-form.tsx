"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export interface EntrepisoConfig {
  nivel: number | null
  tipoBloque: "estereofon" | "concreto" | null
}

interface EntrepisoSpecificFormProps {
  config: EntrepisoConfig
  onChange: (config: EntrepisoConfig) => void
}

export function EntrepisoSpecificForm({ config, onChange }: EntrepisoSpecificFormProps) {
  const handleNivelChange = (value: string) => {
    onChange({
      ...config,
      nivel: Number.parseInt(value),
    })
  }

  const handleTipoBloqueChange = (value: "estereofon" | "concreto") => {
    onChange({
      ...config,
      tipoBloque: value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración Específica - Entrepiso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nivel">Nivel por inspeccionar</Label>
            <Select value={config.nivel?.toString() || ""} onValueChange={handleNivelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Nivel 1</SelectItem>
                <SelectItem value="2">Nivel 2</SelectItem>
                <SelectItem value="3">Nivel 3</SelectItem>
                <SelectItem value="4">Nivel 4</SelectItem>
                <SelectItem value="5">Nivel 5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tipoBloque">Tipo de Bloque para entrepiso</Label>
            <Select value={config.tipoBloque || ""} onValueChange={handleTipoBloqueChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el tipo de bloque" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="estereofon">Estereofón</SelectItem>
                <SelectItem value="concreto">Concreto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
