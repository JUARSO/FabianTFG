"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProjectInfoForm } from "@/components/project-info-form"
import { MobileFriendlyChecklist } from "@/components/mobile-friendly-checklist"
import { SuggestionsWithImages, type SuggestionWithImages } from "@/components/suggestions-with-images"
import { ObservationsForm } from "@/components/observations-form"
import { EntrepisoSpecificForm, type EntrepisoConfig } from "@/components/entrepiso-specific-form"
import type { ProjectInfo, ChecklistItem } from "@/types/report-types"
import { ImageUpload, type ImageAttachment } from "@/components/image-upload"
import { ClientPDFGenerator } from "@/components/client-pdf-generator"
import { ReportSummaryModal } from "@/components/report-summary-modal"
import { LiveReportPreview } from "@/components/live-report-preview"

const entrepisoChecklistItems: ChecklistItem[] = [
  {
    id: 1,
    descripcion: "Nivel por inspeccionar (ver configuración arriba)",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 2,
    descripcion: "Tipo de Vigueta de acuerdo con planos.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 3,
    descripcion: "Tipo de Bloque para entrepiso (ver configuración arriba)",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 4,
    descripcion: "Viguetas colocadas según planos (no deben ir topadas ni quebradas).",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 5,
    descripcion: "Empotramiento de Viguetas 7cm mínimo.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 6,
    descripcion: "Separación de Viguetas.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 7,
    descripcion: "Revisión de Diafragmas y Doble Viguetas (donde se indique).",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 8,
    descripcion: "Tipo de Apuntalamiento: ☐ Metal ☐ Madera",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 9,
    descripcion: "Apuntalamiento de acuerdo con la separación máxima: ☐1.2m Metal ☐1.0m Madera",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 10,
    descripcion: "Traslape de Mallas Electrosoldadas de 30cm (2 cuadros).",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 11,
    descripcion: "Fondos de mallas limpios para colar.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 12,
    descripcion: "Colocación de separadores (helados) para recubrimiento.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 13,
    descripcion: "Revisión de espesores de losa (se cumple con el recubrimiento min. de 5cm y máx. de 7cm).",
    aceptado: "",
    observaciones: "",
  },
]

export default function EntrepisoReportPage() {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    modelo: "",
    direccion: "",
    empresa: "",
    encargado: "",
    fecha: new Date().toISOString().split("T")[0],
  })

  const [entrepisoConfig, setEntrepisoConfig] = useState<EntrepisoConfig>({
    nivel: null,
    tipoBloque: null,
  })

  const [checklist, setChecklist] = useState<ChecklistItem[]>(entrepisoChecklistItems)
  const [suggestions, setSuggestions] = useState<SuggestionWithImages[]>([])
  const [observations, setObservations] = useState<string[]>([])
  const [images, setImages] = useState<ImageAttachment[]>([])

  // Check completion status
  const isProjectInfoComplete =
    projectInfo.modelo && projectInfo.direccion && projectInfo.empresa && projectInfo.encargado
  const isConfigComplete = entrepisoConfig.nivel && entrepisoConfig.tipoBloque
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
      component: <EntrepisoSpecificForm config={entrepisoConfig} onChange={setEntrepisoConfig} />,
    },
    {
      id: "checklist",
      title: "Lista de Verificación",
      completed: !!isChecklistComplete,
      component: (
        <MobileFriendlyChecklist
          title="1) Puntos por revisar en la etapa de entrepiso"
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
        reportTitle="Informe de Inspección - Entrepiso"
        projectInfo={projectInfo}
        specificConfig={entrepisoConfig}
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
            <h1 className="text-3xl font-bold text-gray-900">Informe de Inspección - Entrepiso</h1>
          </div>
          <div className="flex items-center gap-2">
            <ReportSummaryModal
              reportTitle="Informe de Inspección - Entrepiso"
              projectInfo={projectInfo}
              specificConfig={entrepisoConfig}
              checklist={checklist}
              suggestions={suggestions}
              observations={observations}
              images={images}
            />
            <ClientPDFGenerator
              reportTitle="Informe de Inspección - Entrepiso"
              projectInfo={projectInfo}
              specificConfig={entrepisoConfig}
              checklist={checklist}
              suggestions={suggestions}
              observations={observations}
              images={images}
              returnUrl="/reportes/entrepiso"
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
            reportTitle="Informe de Inspección - Entrepiso"
            projectInfo={projectInfo}
            specificConfig={entrepisoConfig}
            checklist={checklist}
            suggestions={suggestions}
            observations={observations}
            images={images}
          />
          <ClientPDFGenerator
            reportTitle="Informe de Inspección - Entrepiso"
            projectInfo={projectInfo}
            specificConfig={entrepisoConfig}
            checklist={checklist}
            suggestions={suggestions}
            observations={observations}
            images={images}
            returnUrl="/reportes/entrepiso"
          />
        </div>
      </div>
    </div>
  )
}
