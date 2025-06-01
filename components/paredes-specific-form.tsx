"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export interface ParedesConfig {
  nivel: number | "tapichel" | null
}

interface ParedesSpecificFormProps {
  config: ParedesConfig
  onChange: (config: ParedesConfig) => void
}

export function ParedesSpecificForm({ config, onChange }: ParedesSpecificFormProps) {
  const handleNivelChange = (value: string) => {
    if (value === "tapichel") {
      onChange({
        ...config,
        nivel: "tapichel",
      })
    } else {
      onChange({
        ...config,
        nivel: Number.parseInt(value),
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración Específica - Paredes</CardTitle>
      </CardHeader>
      <CardContent>
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
              <SelectItem value="6">Nivel 6</SelectItem>
              <SelectItem value="tapichel">Tapichel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
