"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileDown, Printer } from "lucide-react"
import { CompleteReportView } from "@/components/complete-report-view"
import Link from "next/link"
import type { ProjectInfo, ChecklistItem } from "@/types/report-types"
import type { SuggestionWithImages } from "@/components/suggestions-with-images"
import type { ImageAttachment } from "@/components/image-upload"

export default function ReporteCompletoPage() {
  const router = useRouter()
  const [reportData, setReportData] = useState<{
    reportTitle: string
    projectInfo: ProjectInfo
    specificConfig: any
    checklist: ChecklistItem[]
    suggestions: SuggestionWithImages[]
    observations: string[]
    images: ImageAttachment[]
    returnUrl: string
  } | null>(null)

  useEffect(() => {
    // Recuperar datos del localStorage
    const storedData = localStorage.getItem("reportData")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setReportData(parsedData)
      } catch (error) {
        console.error("Error parsing report data:", error)
        router.push("/")
      }
    } else {
      // Si no hay datos, redirigir a la página principal
      router.push("/")
    }
  }, [router])

  const handlePrint = () => {
    window.print()
  }

  if (!reportData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Cargando reporte...</h2>
          <p className="text-gray-500">Por favor espere mientras se prepara la visualización.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header fijo con acciones */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm print:hidden">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={reportData.returnUrl || "/"}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-xl font-bold truncate">{reportData.reportTitle}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handlePrint} variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" size="sm">
              <FileDown className="h-4 w-4 mr-2" />
              Descargar PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto py-8 px-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <CompleteReportView
            reportTitle={reportData.reportTitle}
            projectInfo={reportData.projectInfo}
            specificConfig={reportData.specificConfig}
            checklist={reportData.checklist}
            suggestions={reportData.suggestions}
            observations={reportData.observations}
            images={reportData.images}
          />
        </div>
      </main>

      {/* Estilos para impresión */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
