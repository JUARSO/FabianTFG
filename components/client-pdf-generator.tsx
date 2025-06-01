"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle, Eye } from "lucide-react"
import type { ProjectInfo, ChecklistItem } from "@/types/report-types"
import type { SuggestionWithImages } from "./suggestions-with-images"
import type { ImageAttachment } from "./image-upload"

interface ClientPDFGeneratorProps {
  reportTitle: string
  projectInfo: ProjectInfo
  specificConfig?: any
  checklist: ChecklistItem[]
  suggestions: SuggestionWithImages[]
  observations: string[]
  images: ImageAttachment[]
  returnUrl?: string
}

export function ClientPDFGenerator({
  reportTitle,
  projectInfo,
  specificConfig,
  checklist,
  suggestions,
  observations,
  images,
  returnUrl,
}: ClientPDFGeneratorProps) {
  const [isClient, setIsClient] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleViewFullReport = () => {
    try {
      // Guardar datos en localStorage para recuperarlos en la página de reporte completo
      const reportData = {
        reportTitle,
        projectInfo,
        specificConfig,
        checklist,
        suggestions,
        observations,
        images,
        returnUrl: returnUrl || window.location.pathname,
      }

      // Convertir las URLs de imágenes a strings para evitar problemas de serialización
      const processedData = JSON.stringify(reportData, (key, value) => {
        // Asegurarse de que las URLs de las imágenes se guarden correctamente
        if (key === "file" && value instanceof File) {
          return null // No intentar serializar el objeto File
        }
        return value
      })

      localStorage.setItem("reportData", processedData)

      // Navegar a la página de reporte completo
      router.push("/reporte-completo")
    } catch (err) {
      console.error("Error preparing report data:", err)
      setError("Error al preparar los datos del reporte")
    }
  }

  const handleGeneratePDF = async () => {
    if (!isClient) return

    setIsGenerating(true)
    setError(null)

    try {
      // Aquí iría la lógica para generar el PDF
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Por ahora, simplemente redirigimos a la vista completa
      handleViewFullReport()
    } catch (err) {
      console.error("Error generating PDF:", err)
      setError(err instanceof Error ? err.message : "Error desconocido al generar PDF")
    } finally {
      setIsGenerating(false)
    }
  }

  // Si no estamos en el cliente, mostrar loading
  if (!isClient) {
    return (
      <Button disabled className="bg-gray-400 w-full sm:w-auto">
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Cargando...
      </Button>
    )
  }

  // Si hay error, mostrar botón de error
  if (error) {
    return (
      <Button variant="destructive" onClick={() => setError(null)} className="w-full sm:w-auto">
        <AlertCircle className="h-4 w-4 mr-2" />
        Error: {error}
      </Button>
    )
  }

  // Botón para ver reporte completo
  return (
    <Button onClick={handleViewFullReport} className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
      <Eye className="h-4 w-4 mr-2" />
      Ver Reporte Completo
    </Button>
  )
}
