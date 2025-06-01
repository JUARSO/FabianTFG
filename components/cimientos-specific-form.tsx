"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export interface CimientosConfig {
  tipoFundacion: "placa-corrida" | "losa-flotante" | null
}

interface CimientosSpecificFormProps {
  config: CimientosConfig
  onChange: (config: CimientosConfig) => void
}

export function CimientosSpecificForm({ config, onChange }: CimientosSpecificFormProps) {
  const handleTipoFundacionChange = (value: "placa-corrida" | "losa-flotante") => {
    onChange({
      ...config,
      tipoFundacion: value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración Específica - Cimientos</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="tipoFundacion">Tipo de Fundación</Label>
          <Select value={config.tipoFundacion || ""} onValueChange={handleTipoFundacionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione el tipo de fundación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="placa-corrida">Placa Corrida</SelectItem>
              <SelectItem value="losa-flotante">Losa Flotante</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
