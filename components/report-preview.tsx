"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { ImageSummary } from "./image-summary"
import type { ProjectInfo, ChecklistItem } from "@/types/report-types"
import type { ImageAttachment } from "./image-upload"

interface ReportPreviewProps {
  title: string
  projectInfo: ProjectInfo
  checklist: ChecklistItem[]
  suggestions: string[]
  observations: string[]
  images: ImageAttachment[]
}

export function ReportPreview({
  title,
  projectInfo,
  checklist,
  suggestions,
  observations,
  images,
}: ReportPreviewProps) {
  const acceptedItems = checklist.filter((item) => item.aceptado === "si").length
  const rejectedItems = checklist.filter((item) => item.aceptado === "no").length
  const pendingItems = checklist.filter((item) => item.aceptado === "").length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vista Previa del Reporte</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Title */}
        <div className="text-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-600">ARMABLOQUE</p>
        </div>

        {/* Project Info Summary */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Modelo:</strong> {projectInfo.modelo || "No especificado"}
          </div>
          <div>
            <strong>Dirección:</strong> {projectInfo.direccion || "No especificada"}
          </div>
          <div>
            <strong>Empresa:</strong> {projectInfo.empresa || "No especificada"}
          </div>
          <div>
            <strong>Encargado:</strong> {projectInfo.encargado || "No especificado"}
          </div>
          <div className="col-span-2">
            <strong>Fecha:</strong> {projectInfo.fecha || "No especificada"}
          </div>
        </div>

        {/* Checklist Summary */}
        <div>
          <h3 className="font-semibold mb-3">Resumen de Inspección</h3>
          <div className="flex space-x-4">
            <Badge variant="default" className="bg-green-100 text-green-800">
              <CheckCircle className="h-4 w-4 mr-1" />
              Aceptados: {acceptedItems}
            </Badge>
            <Badge variant="destructive">
              <XCircle className="h-4 w-4 mr-1" />
              Rechazados: {rejectedItems}
            </Badge>
            <Badge variant="secondary">
              <AlertCircle className="h-4 w-4 mr-1" />
              Pendientes: {pendingItems}
            </Badge>
          </div>
        </div>

        {/* Suggestions Summary */}
        <div>
          <h3 className="font-semibold mb-2">Sugerencias</h3>
          <p className="text-sm text-gray-600">
            {suggestions.length > 0
              ? `${suggestions.length} sugerencia${suggestions.length !== 1 ? "s" : ""} registrada${suggestions.length !== 1 ? "s" : ""}`
              : "No hay sugerencias registradas"}
          </p>
        </div>

        {/* Observations Summary */}
        <div>
          <h3 className="font-semibold mb-2">Observaciones</h3>
          <p className="text-sm text-gray-600">
            {observations.length > 0
              ? `${observations.length} observación${observations.length !== 1 ? "es" : ""} registrada${observations.length !== 1 ? "s" : ""}`
              : "No hay observaciones registradas"}
          </p>
        </div>

        {/* Images Summary */}
        <ImageSummary images={images} />
      </CardContent>
    </Card>
  )
}
