"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { PDFGenerator } from "./pdf-generator"
import { usePDFGenerator } from "@/hooks/use-pdf-generator"
import type { ProjectInfo, ChecklistItem } from "@/types/report-types"
import type { SuggestionWithImages } from "./suggestions-with-images"
import type { ImageAttachment } from "./image-upload"

interface PDFPreviewModalProps {
  reportTitle: string
  projectInfo: ProjectInfo
  specificConfig?: any
  checklist: ChecklistItem[]
  suggestions: SuggestionWithImages[]
  observations: string[]
  images: ImageAttachment[]
}

export function PDFPreviewModal({
  reportTitle,
  projectInfo,
  specificConfig,
  checklist,
  suggestions,
  observations,
  images,
}: PDFPreviewModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { isGenerating, error, generatePDF, getReportStats, validateData } = usePDFGenerator({
    reportTitle,
    projectInfo,
    specificConfig,
    checklist,
    suggestions,
    observations,
    images,
  })

  const stats = getReportStats()
  const validationErrors = validateData()
  const canGenerate = validationErrors.length === 0

  const handleGeneratePDF = async () => {
    const success = await generatePDF()
    if (success) {
      // El PDF se generará automáticamente por el PDFDownloadLink
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 w-full sm:w-auto h-12 sm:h-10">
          <Eye className="h-4 w-4 mr-2" />
          Vista Previa y Generar PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Vista Previa del Reporte</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>{reportTitle}</span>
                {canGenerate ? (
                  <Badge variant="default" className="bg-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Listo
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Incompleto
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalItems}</div>
                  <div className="text-gray-600">Total Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.acceptedItems}</div>
                  <div className="text-gray-600">Aceptados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.rejectedItems}</div>
                  <div className="text-gray-600">Rechazados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.pendingItems}</div>
                  <div className="text-gray-600">Pendientes</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progreso de completitud</span>
                  <span>{stats.completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${stats.completionPercentage}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información del Proyecto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Modelo:</strong> {projectInfo.modelo || <span className="text-red-500">Faltante</span>}
                </div>
                <div>
                  <strong>Dirección:</strong> {projectInfo.direccion || <span className="text-red-500">Faltante</span>}
                </div>
                <div>
                  <strong>Empresa:</strong> {projectInfo.empresa || <span className="text-red-500">Faltante</span>}
                </div>
                <div>
                  <strong>Encargado:</strong> {projectInfo.encargado || <span className="text-red-500">Faltante</span>}
                </div>
                <div className="col-span-2">
                  <strong>Fecha:</strong> {projectInfo.fecha || <span className="text-red-500">Faltante</span>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sugerencias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{suggestions.length}</div>
                <div className="text-sm text-gray-600">
                  {suggestions.reduce((total, s) => total + s.images.length, 0)} imágenes asociadas
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Observaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{observations.length}</div>
                <div className="text-sm text-gray-600">Observaciones generales</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Anexos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{images.length}</div>
                <div className="text-sm text-gray-600">Imágenes generales</div>
              </CardContent>
            </Card>
          </div>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Campos Requeridos Faltantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-red-600">
                      {error}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Error Display */}
          {error && (
            <Card className="border-red-200">
              <CardContent className="pt-6">
                <div className="text-red-600 text-sm">{error}</div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Continuar Editando
            </Button>
            {canGenerate ? (
              <PDFGenerator
                reportTitle={reportTitle}
                projectInfo={projectInfo}
                specificConfig={specificConfig}
                checklist={checklist}
                suggestions={suggestions}
                observations={observations}
                images={images}
              >
                <Button className="flex-1 bg-red-600 hover:bg-red-700" disabled={isGenerating}>
                  <Download className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generando..." : "Descargar PDF"}
                </Button>
              </PDFGenerator>
            ) : (
              <Button disabled className="flex-1">
                <XCircle className="h-4 w-4 mr-2" />
                Completar campos requeridos
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
