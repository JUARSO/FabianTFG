"use client"

import { useState } from "react"
import type { ProjectInfo, ChecklistItem } from "@/types/report-types"
import type { SuggestionWithImages } from "@/components/suggestions-with-images"
import type { ImageAttachment } from "@/components/image-upload"

interface UsePDFGeneratorProps {
  reportTitle: string
  projectInfo: ProjectInfo
  specificConfig?: any
  checklist: ChecklistItem[]
  suggestions: SuggestionWithImages[]
  observations: string[]
  images: ImageAttachment[]
}

export function usePDFGenerator({
  reportTitle,
  projectInfo,
  specificConfig,
  checklist,
  suggestions,
  observations,
  images,
}: UsePDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateData = () => {
    const errors: string[] = []

    if (!projectInfo.modelo) errors.push("Modelo del proyecto")
    if (!projectInfo.direccion) errors.push("Dirección")
    if (!projectInfo.empresa) errors.push("Empresa")
    if (!projectInfo.encargado) errors.push("Encargado")
    if (!projectInfo.fecha) errors.push("Fecha")

    const incompleteItems = checklist.filter((item) => item.aceptado === "")
    if (incompleteItems.length > 0) {
      errors.push(`${incompleteItems.length} elementos de la lista de verificación sin completar`)
    }

    return errors
  }

  const generatePDF = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const validationErrors = validateData()
      if (validationErrors.length > 0) {
        throw new Error(`Faltan los siguientes campos:\n• ${validationErrors.join("\n• ")}`)
      }

      // Aquí se podría agregar lógica adicional como subir imágenes a un servidor
      // o procesar los datos antes de generar el PDF

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
      return false
    } finally {
      setIsGenerating(false)
    }
  }

  const getReportStats = () => {
    const totalItems = checklist.length
    const completedItems = checklist.filter((item) => item.aceptado !== "").length
    const acceptedItems = checklist.filter((item) => item.aceptado === "si").length
    const rejectedItems = checklist.filter((item) => item.aceptado === "no").length
    const pendingItems = checklist.filter((item) => item.aceptado === "").length

    return {
      totalItems,
      completedItems,
      acceptedItems,
      rejectedItems,
      pendingItems,
      completionPercentage: Math.round((completedItems / totalItems) * 100),
    }
  }

  return {
    isGenerating,
    error,
    generatePDF,
    getReportStats,
    validateData,
  }
}
