"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProjectInfoForm } from "@/components/project-info-form"
import { MobileFriendlyChecklist } from "@/components/mobile-friendly-checklist"
import { SuggestionsWithImages, type SuggestionWithImages } from "@/components/suggestions-with-images"
import { ObservationsForm } from "@/components/observations-form"
import { ParedesSpecificForm, type ParedesConfig } from "@/components/paredes-specific-form"
import type { ProjectInfo, ChecklistItem } from "@/types/report-types"
import { ImageUpload, type ImageAttachment } from "@/components/image-upload"
import { ClientPDFGenerator } from "@/components/client-pdf-generator"
import { ReportSummaryModal } from "@/components/report-summary-modal"
import { LiveReportPreview } from "@/components/live-report-preview"

const paredesChecklistItems: ChecklistItem[] = [
  {
    id: 1,
    descripcion: "Nivel por inspeccionar (ver configuración arriba)",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 2,
    descripcion: "Revisión de Codales a Plomo",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 3,
    descripcion: "Tipo de Varilla para Bastones: ☒#3 ☐#4 ☐#5",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 4,
    descripcion: "Colocación de Bastones según plano de taller.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 5,
    descripcion: "Colocación de bloques según modulación.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 6,
    descripcion: "No se doblan varillas.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 7,
    descripcion: "Colocación de mortero adecuadamente.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 8,
    descripcion: "Sisa Vertical y Horizontal max. 1.5cm.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 9,
    descripcion: "Block sisado correctamente.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 10,
    descripcion: "Colocación de acero horizontal según planos y con su respectivo traslape.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 11,
    descripcion: "Colocación de ganchos debidamente amarrados.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 12,
    descripcion: "Relleno de celdas correctamente @ 2 hiladas máximo y 5cm por debajo del tope del block.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 13,
    descripcion: "Revisión de relleno de celdas con Cámara Térmica.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 14,
    descripcion: "Se revisa anchos de puertas y ventanas al llevar 4 hiladas colocadas.",
    aceptado: "",
    observaciones: "",
  },
]

export default function ParedesReportPage() {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    modelo: "",
    direccion: "",
    empresa: "",
    encargado: "",
    fecha: new Date().toISOString().split("T")[0],
  })

  const [paredesConfig, setParedesConfig] = useState<ParedesConfig>({
    nivel: null,
  })

  const [checklist, setChecklist] = useState<ChecklistItem[]>(paredesChecklistItems)
  const [suggestions, setSuggestions] = useState<SuggestionWithImages[]>([])
  const [observations, setObservations] = useState<string[]>([])
  const [images, setImages] = useState<ImageAttachment[]>([])

  // Check completion status
  const isProjectInfoComplete =
    projectInfo.modelo && projectInfo.direccion && projectInfo.empresa && projectInfo.encargado
  const isConfigComplete = !!paredesConfig.nivel
  const isChecklistComplete = checklist.every((item) => item.aceptado !== "")

  const formSections = [
    {
      id: "project-info",
      title: "Información del Proyecto",
      completed: !!isProjectInfoComplete,
      component: <ProjectInfoForm projectInfo={projectInfo} onChange={setProjectInfo} />,
    },
    {
      id: "config",
      title: "Configuración",
      completed: !!isConfigComplete,
      component: <ParedesSpecificForm config={paredesConfig} onChange={setParedesConfig} />,
    },
    {
      id: "checklist",
      title: "Lista de Verificación",
      completed: !!isChecklistComplete,
      component: (
        <MobileFriendlyChecklist
          title="1) Puntos por revisar en la etapa de levantamiento de paredes"
          items={checklist}
          onChange={setChecklist}
        />
      ),
    },
    {
      id: "suggestions",
      title: "Sugerencias",
      completed: suggestions.length > 0,
      component: <SuggestionsWithImages suggestions={suggestions} onChange={setSuggestions} />,
    },
    {
      id: "observations",
      title: "Observaciones",
      completed: observations.length > 0,
      component: <ObservationsForm observations={observations} onChange={setObservations} />,
    },
    {
      id: "attachments",
      title: "Anexos Generales",
      completed: images.length > 0,
      component: <ImageUpload images={images} onChange={setImages} />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Live Preview Panel */}
      <LiveReportPreview
        reportTitle="Informe de Inspección - Levantamiento de Paredes"
        projectInfo={projectInfo}
        specificConfig={paredesConfig}
        checklist={checklist}
        suggestions={suggestions}
        observations={observations}
        images={images}
      />

      <div className="max-w-6xl mx-auto pr-96">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Informe de Inspección - Levantamiento de Paredes</h1>
          </div>
          <div className="flex items-center gap-2">
            <ReportSummaryModal
              reportTitle="Informe de Inspección - Levantamiento de Paredes"
              projectInfo={projectInfo}
              specificConfig={paredesConfig}
              checklist={checklist}
              suggestions={suggestions}
              observations={observations}
              images={images}
            />
            <ClientPDFGenerator
              reportTitle="Informe de Inspección - Levantamiento de Paredes"
              projectInfo={projectInfo}
              specificConfig={paredesConfig}
              checklist={checklist}
              suggestions={suggestions}
              observations={observations}
              images={images}
              returnUrl="/reportes/paredes"
            />
          </div>
        </div>

        <div className="text-center mb-8 p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600">Belén-Heredia, Costa Rica. T: +(506) 40 00 13 10</p>
        </div>

        {/* Desktop view - show all sections */}
        <div className="space-y-6">
          {formSections.map((section) => (
            <div key={section.id} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              {section.component}
            </div>
          ))}
        </div>

        {/* Bottom actions */}
        <div className="mt-8 mb-16 flex justify-center gap-4">
          <ReportSummaryModal
            reportTitle="Informe de Inspección - Levantamiento de Paredes"
            projectInfo={projectInfo}
            specificConfig={paredesConfig}
            checklist={checklist}
            suggestions={suggestions}
            observations={observations}
            images={images}
          />
          <ClientPDFGenerator
            reportTitle="Informe de Inspección - Levantamiento de Paredes"
            projectInfo={projectInfo}
            specificConfig={paredesConfig}
            checklist={checklist}
            suggestions={suggestions}
            observations={observations}
            images={images}
            returnUrl="/reportes/paredes"
          />
        </div>
      </div>
    </div>
  )
}
