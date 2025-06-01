"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ProjectInfo } from "@/types/report-types"

interface ProjectInfoFormProps {
  projectInfo: ProjectInfo
  onChange: (info: ProjectInfo) => void
}

export function ProjectInfoForm({ projectInfo, onChange }: ProjectInfoFormProps) {
  const handleChange = (field: keyof ProjectInfo, value: string) => {
    onChange({
      ...projectInfo,
      [field]: value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Información del Proyecto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="modelo" className="text-sm font-medium">
              Modelo
            </Label>
            <Input
              id="modelo"
              value={projectInfo.modelo}
              onChange={(e) => handleChange("modelo", e.target.value)}
              placeholder="Ingrese el modelo"
              className="h-12 text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="direccion" className="text-sm font-medium">
              Dirección
            </Label>
            <Input
              id="direccion"
              value={projectInfo.direccion}
              onChange={(e) => handleChange("direccion", e.target.value)}
              placeholder="Ingrese la dirección"
              className="h-12 text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="empresa" className="text-sm font-medium">
              Empresa
            </Label>
            <Input
              id="empresa"
              value={projectInfo.empresa}
              onChange={(e) => handleChange("empresa", e.target.value)}
              placeholder="Ingrese la empresa"
              className="h-12 text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="encargado" className="text-sm font-medium">
              Encargado
            </Label>
            <Input
              id="encargado"
              value={projectInfo.encargado}
              onChange={(e) => handleChange("encargado", e.target.value)}
              placeholder="Ingrese el encargado"
              className="h-12 text-base"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="fecha" className="text-sm font-medium">
              Fecha
            </Label>
            <Input
              id="fecha"
              type="date"
              value={projectInfo.fecha}
              onChange={(e) => handleChange("fecha", e.target.value)}
              className="h-12 text-base"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
