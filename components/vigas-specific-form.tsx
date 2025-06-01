"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export interface VigasConfig {
  tipoViga: {
    entrepiso: boolean
    corona: boolean
    medianera: boolean
    cargadores: boolean
  }
}

interface VigasSpecificFormProps {
  config: VigasConfig
  onChange: (config: VigasConfig) => void
}

export function VigasSpecificForm({ config, onChange }: VigasSpecificFormProps) {
  const handleTipoVigaChange = (tipo: keyof VigasConfig["tipoViga"], checked: boolean) => {
    onChange({
      ...config,
      tipoViga: {
        ...config.tipoViga,
        [tipo]: checked,
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración Específica - Vigas</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="text-base font-medium mb-4 block">Tipo de viga a inspeccionar:</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="entrepiso"
                checked={config.tipoViga.entrepiso}
                onCheckedChange={(checked) => handleTipoVigaChange("entrepiso", checked as boolean)}
              />
              <Label htmlFor="entrepiso">Entrepiso</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="corona"
                checked={config.tipoViga.corona}
                onCheckedChange={(checked) => handleTipoVigaChange("corona", checked as boolean)}
              />
              <Label htmlFor="corona">Corona</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="medianera"
                checked={config.tipoViga.medianera}
                onCheckedChange={(checked) => handleTipoVigaChange("medianera", checked as boolean)}
              />
              <Label htmlFor="medianera">Medianera</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cargadores"
                checked={config.tipoViga.cargadores}
                onCheckedChange={(checked) => handleTipoVigaChange("cargadores", checked as boolean)}
              />
              <Label htmlFor="cargadores">Cargadores</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
