"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  User,
  Calendar,
  MapPin,
  Building,
  Settings,
  MessageSquare,
  ImageIcon,
  Eye,
  EyeOff,
} from "lucide-react"
import { cn } from "@/lib/utils"
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
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")

  // Calcular estadísticas
  const totalItems = checklist.length
  const completedItems = checklist.filter((item) => item.aceptado !== "").length
  const acceptedItems = checklist.filter((item) => item.aceptado === "si").length
  const rejectedItems = checklist.filter((item) => item.aceptado === "no").length
  const pendingItems = checklist.filter((item) => item.aceptado === "").length
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  // Verificar completitud de secciones
  const isProjectInfoComplete = !!(
    projectInfo.modelo &&
    projectInfo.direccion &&
    projectInfo.empresa &&
    projectInfo.encargado &&
    projectInfo.fecha
  )

  const isConfigComplete = (() => {
    if (!specificConfig) return false
    if (specificConfig.tipoViga) {
      return Object.values(specificConfig.tipoViga).some(Boolean)
    }
    if (specificConfig.nivel !== undefined && specificConfig.tipoBloque) {
      return specificConfig.nivel !== null && specificConfig.tipoBloque !== null
    }
    if (specificConfig.nivel !== undefined) {
      return specificConfig.nivel !== null
    }
    if (specificConfig.tipoFundacion) {
      return specificConfig.tipoFundacion !== null
    }
    return false
  })()

  const sections = [
    {
      id: "overview",
      title: "Resumen",
      icon: FileText,
      completed: completionPercentage > 0,
      progress: completionPercentage,
    },
    {
      id: "project",
      title: "Proyecto",
      icon: Building,
      completed: isProjectInfoComplete,
      progress: isProjectInfoComplete ? 100 : 0,
    },
    {
      id: "config",
      title: "Configuración",
      icon: Settings,
      completed: isConfigComplete,
      progress: isConfigComplete ? 100 : 0,
    },
    {
      id: "checklist",
      title: "Verificación",
      icon: CheckCircle,
      completed: completionPercentage === 100,
      progress: completionPercentage,
    },
    {
      id: "suggestions",
      title: "Sugerencias",
      icon: MessageSquare,
      completed: suggestions.length > 0,
      progress: suggestions.length > 0 ? 100 : 0,
    },
    {
      id: "images",
      title: "Imágenes",
      icon: ImageIcon,
      completed: images.length > 0,
      progress: images.length > 0 ? 100 : 0,
    },
  ]

  const renderOverview = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-700">{completionPercentage}%</div>
          <div className="text-xs text-blue-600">Completado</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold text-gray-700">{totalItems}</div>
          <div className="text-xs text-gray-600">Total Items</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progreso general</span>
          <span>{completionPercentage}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 bg-green-50 rounded">
          <div className="text-sm font-bold text-green-700">{acceptedItems}</div>
          <div className="text-xs text-green-600">✓ Sí</div>
        </div>
        <div className="p-2 bg-red-50 rounded">
          <div className="text-sm font-bold text-red-700">{rejectedItems}</div>
          <div className="text-xs text-red-600">✗ No</div>
        </div>
        <div className="p-2 bg-yellow-50 rounded">
          <div className="text-sm font-bold text-yellow-700">{pendingItems}</div>
          <div className="text-xs text-yellow-600">⚠ Pendiente</div>
        </div>
      </div>
    </div>
  )

  const renderProjectInfo = () => (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Building className="h-3 w-3 text-gray-500" />
          <span className="text-xs font-medium">Modelo:</span>
        </div>
        <p className="text-sm pl-5 text-gray-700">
          {projectInfo.modelo || <span className="text-gray-400 italic">No especificado</span>}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3 text-gray-500" />
          <span className="text-xs font-medium">Dirección:</span>
        </div>
        <p className="text-sm pl-5 text-gray-700">
          {projectInfo.direccion || <span className="text-gray-400 italic">No especificada</span>}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <User className="h-3 w-3 text-gray-500" />
          <span className="text-xs font-medium">Encargado:</span>
        </div>
        <p className="text-sm pl-5 text-gray-700">
          {projectInfo.encargado || <span className="text-gray-400 italic">No especificado</span>}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3 text-gray-500" />
          <span className="text-xs font-medium">Fecha:</span>
        </div>
        <p className="text-sm pl-5 text-gray-700">
          {projectInfo.fecha || <span className="text-gray-400 italic">No especificada</span>}
        </p>
      </div>
    </div>
  )

  const renderConfig = () => {
    if (!specificConfig) {
      return <p className="text-sm text-gray-400 italic">No hay configuración específica</p>
    }

    if (specificConfig.tipoViga) {
      const selectedTypes = Object.entries(specificConfig.tipoViga)
        .filter(([_, selected]) => selected)
        .map(([tipo, _]) => tipo)

      return (
        <div className="space-y-2">
          <p className="text-xs font-medium">Tipos de viga:</p>
          {selectedTypes.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedTypes.map((tipo) => (
                <Badge key={tipo} variant="outline" className="text-xs">
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">Ningún tipo seleccionado</p>
          )}
        </div>
      )
    }

    if (specificConfig.nivel !== undefined) {
      return (
        <div className="space-y-2">
          <p className="text-xs font-medium">Nivel:</p>
          <p className="text-sm">
            {specificConfig.nivel !== null ? (
              specificConfig.nivel === "tapichel" ? (
                "Tapichel"
              ) : (
                `Nivel ${specificConfig.nivel}`
              )
            ) : (
              <span className="text-gray-400 italic">No seleccionado</span>
            )}
          </p>
          {specificConfig.tipoBloque && (
            <>
              <p className="text-xs font-medium">Tipo de bloque:</p>
              <p className="text-sm">
                {specificConfig.tipoBloque ? (
                  specificConfig.tipoBloque === "estereofon" ? (
                    "Estereofón"
                  ) : (
                    "Concreto"
                  )
                ) : (
                  <span className="text-gray-400 italic">No seleccionado</span>
                )}
              </p>
            </>
          )}
        </div>
      )
    }

    if (specificConfig.tipoFundacion !== undefined) {
      return (
        <div className="space-y-2">
          <p className="text-xs font-medium">Tipo de fundación:</p>
          <p className="text-sm">
            {specificConfig.tipoFundacion ? (
              specificConfig.tipoFundacion === "placa-corrida" ? (
                "Placa Corrida"
              ) : (
                "Losa Flotante"
              )
            ) : (
              <span className="text-gray-400 italic">No seleccionado</span>
            )}
          </p>
        </div>
      )
    }

    return <p className="text-sm text-gray-400 italic">Configuración no reconocida</p>
  }

  const renderChecklist = () => (
    <div className="space-y-2">
      <div className="text-xs text-gray-600 mb-2">
        {completedItems} de {totalItems} completados
      </div>
      <ScrollArea className="h-32">
        <div className="space-y-1">
          {checklist.slice(0, 5).map((item) => {
            let statusIcon = <AlertCircle className="h-3 w-3 text-yellow-500" />
            let statusColor = "text-yellow-600"

            if (item.aceptado === "si") {
              statusIcon = <CheckCircle className="h-3 w-3 text-green-500" />
              statusColor = "text-green-600"
            } else if (item.aceptado === "no") {
              statusIcon = <XCircle className="h-3 w-3 text-red-500" />
              statusColor = "text-red-600"
            }

            return (
              <div key={item.id} className="flex items-start gap-2 p-1 text-xs">
                {statusIcon}
                <div className="flex-1">
                  <span className="font-medium">{item.id}.</span>
                  <span className="ml-1 text-gray-600 line-clamp-2">{item.descripcion.substring(0, 50)}...</span>
                </div>
              </div>
            )
          })}
          {checklist.length > 5 && (
            <p className="text-xs text-gray-400 text-center pt-1">+{checklist.length - 5} items más</p>
          )}
        </div>
      </ScrollArea>
    </div>
  )

  const renderSuggestions = () => (
    <div className="space-y-2">
      <div className="text-xs text-gray-600">
        {suggestions.length} sugerencia{suggestions.length !== 1 ? "s" : ""} registrada
        {suggestions.length !== 1 ? "s" : ""}
      </div>
      {suggestions.length > 0 ? (
        <ScrollArea className="h-32">
          <div className="space-y-2">
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <div key={suggestion.id} className="p-2 bg-gray-50 rounded text-xs">
                <div className="font-medium mb-1">{String.fromCharCode(97 + index).toUpperCase()}.</div>
                <p className="text-gray-600 line-clamp-2">{suggestion.text.substring(0, 80)}...</p>
                {suggestion.images.length > 0 && (
                  <div className="flex items-center gap-1 mt-1 text-gray-500">
                    <ImageIcon className="h-3 w-3" />
                    <span>
                      {suggestion.images.length} imagen{suggestion.images.length !== 1 ? "es" : ""}
                    </span>
                  </div>
                )}
              </div>
            ))}
            {suggestions.length > 3 && (
              <p className="text-xs text-gray-400 text-center">+{suggestions.length - 3} más</p>
            )}
          </div>
        </ScrollArea>
      ) : (
        <p className="text-xs text-gray-400 italic">No hay sugerencias</p>
      )}
    </div>
  )

  const renderImages = () => (
    <div className="space-y-2">
      <div className="text-xs text-gray-600">
        {images.length} imagen{images.length !== 1 ? "es" : ""} adjunta{images.length !== 1 ? "s" : ""}
      </div>
      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-1">
          {images.slice(0, 4).map((image) => (
            <div key={image.id} className="aspect-square bg-gray-100 rounded text-xs flex items-center justify-center">
              <ImageIcon className="h-4 w-4 text-gray-400" />
            </div>
          ))}
          {images.length > 4 && (
            <div className="aspect-square bg-gray-100 rounded text-xs flex items-center justify-center">
              <span className="text-gray-500">+{images.length - 4}</span>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-gray-400 italic">No hay imágenes</p>
      )}
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview()
      case "project":
        return renderProjectInfo()
      case "config":
        return renderConfig()
      case "checklist":
        return renderChecklist()
      case "suggestions":
        return renderSuggestions()
      case "images":
        return renderImages()
      default:
        return renderOverview()
    }
  }

  if (isCollapsed) {
    return (
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
        <Button
          onClick={() => setIsCollapsed(false)}
          size="sm"
          className="h-12 w-12 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
        >
          <Eye className="h-5 w-5" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed right-4 top-20 bottom-4 w-80 z-40">
      <Card className="h-full flex flex-col shadow-lg border-2">
        <CardHeader className="pb-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Vista en Tiempo Real</CardTitle>
            <Button onClick={() => setIsCollapsed(true)} size="sm" variant="ghost" className="h-6 w-6 p-0">
              <EyeOff className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 truncate">{reportTitle}</p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-3 space-y-3">
          {/* Navigation */}
          <div className="grid grid-cols-3 gap-1">
            {sections.map((section) => {
              const IconComponent = section.icon
              return (
                <Button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  variant={activeSection === section.id ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-auto p-2 flex flex-col items-center gap-1",
                    activeSection === section.id ? "bg-blue-600" : "",
                  )}
                >
                  <div className="flex items-center gap-1">
                    <IconComponent className="h-3 w-3" />
                    {section.completed && <CheckCircle className="h-2 w-2 text-green-500" />}
                  </div>
                  <span className="text-xs leading-tight text-center">{section.title}</span>
                </Button>
              )
            })}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">{renderContent()}</ScrollArea>
          </div>

          {/* Progress indicator */}
          <div className="flex-shrink-0 pt-2 border-t">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progreso total</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-1.5" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
