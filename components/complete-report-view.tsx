"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, AlertCircle, Calendar, MapPin, Building, User } from "lucide-react"
import Image from "next/image"
import type { ProjectInfo, ChecklistItem } from "@/types/report-types"
import type { SuggestionWithImages } from "./suggestions-with-images"
import type { ImageAttachment } from "./image-upload"

interface CompleteReportViewProps {
  reportTitle: string
  projectInfo: ProjectInfo
  specificConfig?: any
  checklist: ChecklistItem[]
  suggestions: SuggestionWithImages[]
  observations: string[]
  images: ImageAttachment[]
}

export function CompleteReportView({
  reportTitle,
  projectInfo,
  specificConfig,
  checklist,
  suggestions,
  observations,
  images,
}: CompleteReportViewProps) {
  // Calcular estadísticas
  const totalItems = checklist.length
  const acceptedItems = checklist.filter((item) => item.aceptado === "si").length
  const rejectedItems = checklist.filter((item) => item.aceptado === "no").length
  const pendingItems = checklist.filter((item) => item.aceptado === "").length

  // Función para renderizar la configuración específica
  const renderSpecificConfig = () => {
    if (!specificConfig) return "No hay configuración específica para este tipo de reporte."

    if (specificConfig.tipoViga) {
      const tipos = Object.entries(specificConfig.tipoViga)
        .filter(([_, selected]) => selected)
        .map(([tipo, _]) => tipo.charAt(0).toUpperCase() + tipo.slice(1))

      if (tipos.length === 0) return "No se ha seleccionado ningún tipo de viga."
      return `Tipos de viga seleccionados: ${tipos.join(", ")}`
    }

    if (specificConfig.nivel && specificConfig.tipoBloque) {
      const tipoBloque = specificConfig.tipoBloque === "estereofon" ? "Estereofón" : "Concreto"
      return `Nivel por inspeccionar: ${specificConfig.nivel}, Tipo de bloque: ${tipoBloque}`
    }

    if (specificConfig.nivel) {
      const nivelText = specificConfig.nivel === "tapichel" ? "Tapichel" : `Nivel ${specificConfig.nivel}`
      return `Nivel por inspeccionar: ${nivelText}`
    }

    if (specificConfig.tipoFundacion) {
      const tipoText = specificConfig.tipoFundacion === "placa-corrida" ? "Placa Corrida" : "Losa Flotante"
      return `Tipo de fundación: ${tipoText}`
    }

    return "Configuración específica no reconocida."
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6 bg-white">
      {/* Encabezado del reporte */}
      <div className="text-center space-y-4 border-b pb-6">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Belén-Heredia, Costa Rica. T: +(506) 40 00 13 10</p>
          <h1 className="text-3xl font-bold text-gray-900">{reportTitle}</h1>
          <p className="text-sm text-gray-500">
            Fecha de generación:{" "}
            {new Date().toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Resumen ejecutivo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-800">{totalItems}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-700">{acceptedItems}</div>
            <div className="text-sm text-green-700">Aceptados</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-700">{rejectedItems}</div>
            <div className="text-sm text-red-700">Rechazados</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-700">{pendingItems}</div>
            <div className="text-sm text-yellow-700">Pendientes</div>
          </div>
        </div>
      </div>

      {/* Información del Proyecto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Información del Proyecto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Modelo del Proyecto</p>
                  <p className="text-gray-900">{projectInfo.modelo || "No especificado"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Dirección</p>
                  <p className="text-gray-900">{projectInfo.direccion || "No especificada"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Empresa</p>
                  <p className="text-gray-900">{projectInfo.empresa || "No especificada"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Encargado del Proyecto</p>
                  <p className="text-gray-900">{projectInfo.encargado || "No especificado"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Fecha de Inspección</p>
                  <p className="text-gray-900">
                    {projectInfo.fecha
                      ? new Date(projectInfo.fecha).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "No especificada"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuración Específica */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración Específica de la Inspección</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-gray-800">{renderSpecificConfig()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Verificación Detallada */}
      <Card>
        <CardHeader>
          <CardTitle>1. Lista de Verificación - Resultados Detallados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checklist.map((item, index) => {
              let statusIcon = <AlertCircle className="h-5 w-5 text-yellow-500" />
              let statusText = "PENDIENTE"
              let statusColor = "bg-yellow-50 border-yellow-200"
              let badgeVariant: "default" | "destructive" | "secondary" = "secondary"

              if (item.aceptado === "si") {
                statusIcon = <CheckCircle className="h-5 w-5 text-green-500" />
                statusText = "ACEPTADO"
                statusColor = "bg-green-50 border-green-200"
                badgeVariant = "default"
              } else if (item.aceptado === "no") {
                statusIcon = <XCircle className="h-5 w-5 text-red-500" />
                statusText = "RECHAZADO"
                statusColor = "bg-red-50 border-red-200"
                badgeVariant = "destructive"
              }

              return (
                <div key={item.id} className={`border rounded-lg p-4 ${statusColor}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center font-bold text-sm">
                        {item.id}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-2">{item.descripcion}</p>
                        <div className="flex items-center gap-2">
                          {statusIcon}
                          <Badge variant={badgeVariant} className="font-medium">
                            {statusText}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {item.observaciones && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-1">Observaciones del Inspector:</p>
                      <div className="bg-white p-3 rounded border">
                        <p className="text-gray-800 whitespace-pre-line">{item.observaciones}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sugerencias */}
      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>2. Sugerencias para Tener en Cuenta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {suggestions.map((suggestion, index) => (
                <div key={suggestion.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-blue-50 p-4 border-b">
                    <h3 className="font-bold text-lg text-blue-900">Sugerencia {String.fromCharCode(65 + index)}</h3>
                  </div>
                  <div className="p-4">
                    <div className="prose max-w-none">
                      <p className="text-gray-800 whitespace-pre-line leading-relaxed">{suggestion.text}</p>
                    </div>

                    {suggestion.images.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Imágenes de Apoyo ({suggestion.images.length})
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {suggestion.images.map((image) => (
                            <div key={image.id} className="border rounded-lg overflow-hidden bg-white">
                              <div className="relative aspect-video">
                                <Image
                                  src={image.url || "/placeholder.svg"}
                                  alt={image.description || "Imagen de sugerencia"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              {image.description && (
                                <div className="p-3">
                                  <p className="text-sm text-gray-600">{image.description}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Observaciones */}
      {observations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>3. Observaciones Generales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {observations.map((observation, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 whitespace-pre-line leading-relaxed">{observation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Anexos - Imágenes */}
      {images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>4. Anexos - Documentación Fotográfica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <div key={image.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="relative aspect-video">
                    <Image src={image.url || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                    <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-medium">
                      Imagen {index + 1}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 mb-2">{image.title}</h4>
                    {image.description && <p className="text-sm text-gray-600 leading-relaxed">{image.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pie del reporte */}
      <div className="text-center pt-8 border-t">
        <Separator className="mb-6" />
        <div className="space-y-2 text-sm text-gray-500">
          <p className="font-medium">--- Fin del Reporte de Inspección ---</p>
          <p>Documento generado por el Sistema de Reportes de Inspección</p>
          <p>Belén-Heredia, Costa Rica. T: +(506) 40 00 13 10</p>
          <p>
            Generado el{" "}
            {new Date().toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
