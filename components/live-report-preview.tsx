"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react"
import type { ProjectInfo, ChecklistItem } from "@/types/report-types"
import type { SuggestionWithImages } from "./suggestions-with-images"
import type { ImageAttachment } from "./image-upload"

interface LiveReportPreviewProps {
  reportTitle: string
  projectInfo: ProjectInfo
  specificConfig?: any
  checklist: ChecklistItem[]
  suggestions: SuggestionWithImages[]
  observations: string[]
  images: ImageAttachment[]
}

export function LiveReportPreview({
  reportTitle,
  projectInfo,
  specificConfig,
  checklist,
  suggestions,
  observations,
  images,
}: LiveReportPreviewProps) {
  // Calcular estadísticas
  const totalItems = checklist.length
  const completedItems = checklist.filter((item) => item.aceptado !== "").length
  const acceptedItems = checklist.filter((item) => item.aceptado === "si").length
  const rejectedItems = checklist.filter((item) => item.aceptado === "no").length
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  return (
    <div className="fixed right-6 top-6 bottom-6 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0 pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Eye className="h-4 w-4" />
            Vista Previa del Reporte
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-4">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {/* Título del reporte */}
              <div className="text-center">
                <h3 className="font-bold text-sm text-gray-900">{reportTitle}</h3>
                <p className="text-xs text-gray-500 mt-1">ARMABLOQUE</p>
              </div>

              {/* Progreso general */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progreso del reporte</span>
                  <span>{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>

              {/* Estadísticas rápidas */}
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="text-lg font-bold text-green-700">{acceptedItems}</div>
                  <div className="text-xs text-green-600">Aceptados</div>
                </div>
                <div className="text-center p-2 bg-red-50 rounded">
                  <div className="text-lg font-bold text-red-700">{rejectedItems}</div>
                  <div className="text-xs text-red-600">Rechazados</div>
                </div>
              </div>

              {/* Información del proyecto */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Información del Proyecto</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Modelo:</span>
                    <span className="font-medium">{projectInfo.modelo || "Sin especificar"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Empresa:</span>
                    <span className="font-medium">{projectInfo.empresa || "Sin especificar"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Encargado:</span>
                    <span className="font-medium">{projectInfo.encargado || "Sin especificar"}</span>
                  </div>
                </div>
              </div>

              {/* Estado de la lista de verificación */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Lista de Verificación</h4>
                <div className="space-y-1">
                  {checklist.slice(0, 5).map((item) => {
                    let icon = <AlertCircle className="h-3 w-3 text-yellow-500" />
                    let statusColor = "text-yellow-600"

                    if (item.aceptado === "si") {
                      icon = <CheckCircle className="h-3 w-3 text-green-500" />
                      statusColor = "text-green-600"
                    } else if (item.aceptado === "no") {
                      icon = <XCircle className="h-3 w-3 text-red-500" />
                      statusColor = "text-red-600"
                    }

                    return (
                      <div key={item.id} className="flex items-start gap-2">
                        {icon}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-700 truncate">{item.descripcion}</p>
                          {item.aceptado && (
                            <Badge
                              variant={item.aceptado === "si" ? "default" : "destructive"}
                              className="text-xs mt-1"
                            >
                              {item.aceptado === "si" ? "Aceptado" : "Rechazado"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  {checklist.length > 5 && (
                    <p className="text-xs text-gray-500 text-center">... y {checklist.length - 5} elementos más</p>
                  )}
                </div>
              </div>

              {/* Sugerencias */}
              {suggestions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Sugerencias ({suggestions.length})</h4>
                  <div className="space-y-1">
                    {suggestions.slice(0, 3).map((suggestion, index) => (
                      <div key={suggestion.id} className="p-2 bg-blue-50 rounded text-xs">
                        <p className="font-medium">Sugerencia {String.fromCharCode(65 + index)}</p>
                        <p className="text-gray-600 truncate">{suggestion.text}</p>
                        {suggestion.images.length > 0 && (
                          <p className="text-blue-600 mt-1">{suggestion.images.length} imagen(es)</p>
                        )}
                      </div>
                    ))}
                    {suggestions.length > 3 && (
                      <p className="text-xs text-gray-500 text-center">
                        ... y {suggestions.length - 3} sugerencias más
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Observaciones */}
              {observations.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Observaciones ({observations.length})</h4>
                  <div className="space-y-1">
                    {observations.slice(0, 2).map((observation, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded text-xs">
                        <p className="text-gray-700 truncate">{observation}</p>
                      </div>
                    ))}
                    {observations.length > 2 && (
                      <p className="text-xs text-gray-500 text-center">
                        ... y {observations.length - 2} observaciones más
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Anexos */}
              {images.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Anexos ({images.length})</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {images.slice(0, 4).map((image) => (
                      <div
                        key={image.id}
                        className="aspect-square bg-gray-100 rounded text-xs flex items-center justify-center"
                      >
                        <span className="text-gray-500">IMG</span>
                      </div>
                    ))}
                  </div>
                  {images.length > 4 && (
                    <p className="text-xs text-gray-500 text-center">... y {images.length - 4} imágenes más</p>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
