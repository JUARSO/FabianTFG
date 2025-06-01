"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, CheckCircle, XCircle, AlertCircle, FileText, ImageIcon, MessageSquare } from "lucide-react"
import Image from "next/image"
import type { ProjectInfo, ChecklistItem } from "@/types/report-types"
import type { SuggestionWithImages } from "./suggestions-with-images"
import type { ImageAttachment } from "./image-upload"

interface ReportSummaryModalProps {
  reportTitle: string
  projectInfo: ProjectInfo
  specificConfig?: any
  checklist: ChecklistItem[]
  suggestions: SuggestionWithImages[]
  observations: string[]
  images: ImageAttachment[]
}

export function ReportSummaryModal({
  reportTitle,
  projectInfo,
  specificConfig,
  checklist,
  suggestions,
  observations,
  images,
}: ReportSummaryModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Calcular estadísticas
  const totalItems = checklist.length
  const acceptedItems = checklist.filter((item) => item.aceptado === "si").length
  const rejectedItems = checklist.filter((item) => item.aceptado === "no").length
  const pendingItems = checklist.filter((item) => item.aceptado === "").length
  const completionPercentage = Math.round((checklist.filter((item) => item.aceptado !== "").length / totalItems) * 100)

  // Función para renderizar la configuración específica
  const renderSpecificConfig = () => {
    if (!specificConfig) return null

    if (specificConfig.tipoViga) {
      const tipos = Object.entries(specificConfig.tipoViga)
        .filter(([_, selected]) => selected)
        .map(([tipo, _]) => tipo.charAt(0).toUpperCase() + tipo.slice(1))

      if (tipos.length === 0) return <p className="text-gray-500">No se ha seleccionado ningún tipo de viga</p>

      return (
        <div className="space-y-2">
          <p className="font-medium">Tipos de viga seleccionados:</p>
          <div className="flex flex-wrap gap-2">
            {tipos.map((tipo) => (
              <Badge key={tipo} variant="outline" className="bg-blue-50">
                {tipo}
              </Badge>
            ))}
          </div>
        </div>
      )
    }

    if (specificConfig.nivel && specificConfig.tipoBloque) {
      return (
        <div className="space-y-2">
          <p>
            <span className="font-medium">Nivel:</span> {specificConfig.nivel}
          </p>
          <p>
            <span className="font-medium">Tipo de bloque:</span>{" "}
            {specificConfig.tipoBloque === "estereofon" ? "Estereofón" : "Concreto"}
          </p>
        </div>
      )
    }

    if (specificConfig.nivel) {
      const nivelText = specificConfig.nivel === "tapichel" ? "Tapichel" : `Nivel ${specificConfig.nivel}`
      return (
        <p>
          <span className="font-medium">Nivel por inspeccionar:</span> {nivelText}
        </p>
      )
    }

    if (specificConfig.tipoFundacion) {
      const tipoText = specificConfig.tipoFundacion === "placa-corrida" ? "Placa Corrida" : "Losa Flotante"
      return (
        <p>
          <span className="font-medium">Tipo de fundación:</span> {tipoText}
        </p>
      )
    }

    return <p className="text-gray-500">No hay configuración específica</p>
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-50 border-blue-200 hover:bg-blue-100 hover:text-blue-700">
          <Eye className="h-4 w-4 mr-2" />
          Ver Resumen del Reporte
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl">{reportTitle} - Resumen</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <div className="px-6">
            <TabsList className="w-full justify-start mb-2">
              <TabsTrigger value="general" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="checklist" className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>Verificación</span>
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>Sugerencias</span>
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-1">
                <ImageIcon className="h-4 w-4" />
                <span>Imágenes</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[70vh] rounded-md border">
            <TabsContent value="general" className="p-6 m-0">
              {/* Estadísticas */}
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Estadísticas del Reporte</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-800">{totalItems}</div>
                      <div className="text-sm text-gray-600">Total de Items</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">{acceptedItems}</div>
                      <div className="text-sm text-green-700">Aceptados</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-700">{rejectedItems}</div>
                      <div className="text-sm text-red-700">Rechazados</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-700">{pendingItems}</div>
                      <div className="text-sm text-yellow-700">Pendientes</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progreso de completitud</span>
                      <span>{completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Información del Proyecto */}
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Información del Proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Modelo</p>
                      <p className="font-medium">{projectInfo.modelo || "No especificado"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Dirección</p>
                      <p className="font-medium">{projectInfo.direccion || "No especificada"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Empresa</p>
                      <p className="font-medium">{projectInfo.empresa || "No especificada"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Encargado</p>
                      <p className="font-medium">{projectInfo.encargado || "No especificado"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Fecha</p>
                      <p className="font-medium">{projectInfo.fecha || "No especificada"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Configuración Específica */}
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Configuración Específica</CardTitle>
                </CardHeader>
                <CardContent>{renderSpecificConfig()}</CardContent>
              </Card>

              {/* Observaciones */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Observaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  {observations.length > 0 ? (
                    <div className="space-y-3">
                      {observations.map((observation, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-1">{String.fromCharCode(97 + index)}.</p>
                          <p className="text-gray-800">{observation}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No hay observaciones registradas</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="checklist" className="p-6 m-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Lista de Verificación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {checklist.map((item) => {
                      let statusBadge = null

                      if (item.aceptado === "si") {
                        statusBadge = (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            SÍ
                          </Badge>
                        )
                      } else if (item.aceptado === "no") {
                        statusBadge = (
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            NO
                          </Badge>
                        )
                      } else {
                        statusBadge = (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Pendiente
                          </Badge>
                        )
                      }

                      return (
                        <div
                          key={item.id}
                          className={`p-4 border rounded-lg ${
                            item.aceptado === "si"
                              ? "border-l-4 border-l-green-500"
                              : item.aceptado === "no"
                                ? "border-l-4 border-l-red-500"
                                : "border-l-4 border-l-yellow-500"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium">
                                {item.id}
                              </div>
                              <p className="font-medium">{item.descripcion}</p>
                            </div>
                            {statusBadge}
                          </div>

                          {item.observaciones && (
                            <div className="mt-3 pl-11">
                              <p className="text-sm text-gray-500 mb-1">Observaciones:</p>
                              <p className="text-gray-700 bg-gray-50 p-2 rounded">{item.observaciones}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suggestions" className="p-6 m-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Sugerencias</CardTitle>
                </CardHeader>
                <CardContent>
                  {suggestions.length > 0 ? (
                    <div className="space-y-6">
                      {suggestions.map((suggestion, index) => (
                        <div key={suggestion.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-blue-50 p-3 border-b">
                            <p className="font-medium">Sugerencia {String.fromCharCode(97 + index).toUpperCase()}</p>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-800 whitespace-pre-line">{suggestion.text}</p>

                            {suggestion.images.length > 0 && (
                              <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Imágenes asociadas:</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                  {suggestion.images.map((image) => (
                                    <div
                                      key={image.id}
                                      className="relative aspect-square rounded-md overflow-hidden border"
                                    >
                                      <Image
                                        src={image.url || "/placeholder.svg"}
                                        alt={image.description || "Imagen de sugerencia"}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No hay sugerencias registradas</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images" className="p-6 m-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Imágenes Adjuntas</CardTitle>
                </CardHeader>
                <CardContent>
                  {images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image) => (
                        <div key={image.id} className="border rounded-lg overflow-hidden">
                          <div className="relative aspect-video">
                            <Image
                              src={image.url || "/placeholder.svg"}
                              alt={image.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h4 className="font-medium text-gray-900 mb-1">{image.title}</h4>
                            {image.description && <p className="text-sm text-gray-600">{image.description}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No hay imágenes adjuntas</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
