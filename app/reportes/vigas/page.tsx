"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProjectInfoForm } from "@/components/project-info-form"
import { MobileFriendlyChecklist } from "@/components/mobile-friendly-checklist"
import { SuggestionsWithImages, type SuggestionWithImages } from "@/components/suggestions-with-images"
import { ObservationsForm } from "@/components/observations-form"
import { VigasSpecificForm, type VigasConfig } from "@/components/vigas-specific-form"
import { ClientPDFGenerator } from "@/components/client-pdf-generator"
import { ReportSummaryModal } from "@/components/report-summary-modal"
import { LiveReportPreview } from "@/components/live-report-preview"
import type { ProjectInfo, ChecklistItem } from "@/types/report-types"
import { ImageUpload, type ImageAttachment } from "@/components/image-upload"
import { useMediaQuery } from "@/hooks/use-media-query"

const vigasChecklistItems: ChecklistItem[] = [
  {
    id: 1,
    descripcion: "Tipo de viga a inspeccionar (ver configuración arriba)",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 2,
    descripcion: "Colocación de separadores (helados) para recubrimiento (armadura no debe quedar sobre block).",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 3,
    descripcion: "Acero según planos (no hay aros cortados, soldados y doblados).",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 4,
    descripcion: "Traslape de armadura según lo especificado (mínimo 60cm).",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 5,
    descripcion: "Armadura con sus respectivos cierres correctamente.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 6,
    descripcion: "Formaleta alineada, amarrada y bien apuntalada.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 7,
    descripcion: "Banquinas de ventanas con 30cm dentro de la pared.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 8,
    descripcion: "Cargadores de puertas y ventanas con 30cm dentro de la pared.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 9,
    descripcion: "Pasantes mecánicos perfectamente colocados con tubería PVC.",
    aceptado: "",
    observaciones: "",
  },
  {
    id: 10,
    descripcion: "Fondos de vigas completamente limpios para colar.",
    aceptado: "",
    observaciones: "",
  },
]

export default function VigasReportPage() {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    modelo: "",
    direccion: "",
    empresa: "",
    encargado: "",
    fecha: new Date().toISOString().split("T")[0],
  })

  const [vigasConfig, setVigasConfig] = useState<VigasConfig>({
    tipoViga: {
      entrepiso: false,
      corona: false,
      medianera: false,
      cargadores: false,
    },
  })

  const [checklist, setChecklist] = useState<ChecklistItem[]>(vigasChecklistItems)
  const [suggestions, setSuggestions] = useState<SuggestionWithImages[]>([])
  const [observations, setObservations] = useState<string[]>([])
  const [images, setImages] = useState<ImageAttachment[]>([])

  // Detectar si estamos en móvil
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const formSections = [
    {
      id: "project-info",
      title: "Información del Proyecto",
      component: <ProjectInfoForm projectInfo={projectInfo} onChange={setProjectInfo} />,
    },
    {
      id: "config",
      title: "Configuración",
      component: <VigasSpecificForm config={vigasConfig} onChange={setVigasConfig} />,
    },
    {
      id: "checklist",
      title: "Lista de Verificación",
      component: (
        <MobileFriendlyChecklist
          title="1) Puntos por revisar en la etapa de vigas"
          items={checklist}
          onChange={setChecklist}
        />
      ),
    },
    {
      id: "suggestions",
      title: "Sugerencias",
      component: <SuggestionsWithImages suggestions={suggestions} onChange={setSuggestions} />,
    },
    {
      id: "observations",
      title: "Observaciones",
      component: <ObservationsForm observations={observations} onChange={setObservations} />,
    },
    {
      id: "attachments",
      title: "Anexos Generales",
      component: <ImageUpload images={images} onChange={setImages} />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Live Preview Panel - Solo visible en desktop */}
      {isDesktop && (
        <LiveReportPreview
          reportTitle="Informe de Inspección - Vigas"
          projectInfo={projectInfo}
          specificConfig={vigasConfig}
          checklist={checklist}
          suggestions={suggestions}
          observations={observations}
          images={images}
        />
      )}

      <div className={`max-w-6xl mx-auto ${isDesktop ? "pr-80" : ""}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Informe de Inspección - Vigas</h1>
          </div>
          <div className="flex items-center gap-2">
            <ReportSummaryModal
              reportTitle="Informe de Inspección - Vigas"
              projectInfo={projectInfo}
              specificConfig={vigasConfig}
              checklist={checklist}
              suggestions={suggestions}
              observations={observations}
              images={images}
            />
            <ClientPDFGenerator
              reportTitle="Informe de Inspección - Vigas"
              projectInfo={projectInfo}
              specificConfig={vigasConfig}
              checklist={checklist}
              suggestions={suggestions}
              observations={observations}
              images={images}
              returnUrl="/reportes/vigas"
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
              <h2 className="text-xl sm:text-2xl font-bold mb-4">{section.title}</h2>
              {section.component}
            </div>
          ))}
        </div>

        {/* Bottom actions */}
        <div className="mt-8 mb-16 flex flex-col sm:flex-row justify-center gap-4">
          <ReportSummaryModal
            reportTitle="Informe de Inspección - Vigas"
            projectInfo={projectInfo}
            specificConfig={vigasConfig}
            checklist={checklist}
            suggestions={suggestions}
            observations={observations}
            images={images}
          />
          <ClientPDFGenerator
            reportTitle="Informe de Inspección - Vigas"
            projectInfo={projectInfo}
            specificConfig={vigasConfig}
            checklist={checklist}
            suggestions={suggestions}
            observations={observations}
            images={images}
            returnUrl="/reportes/vigas"
          />
        </div>
      </div>
    </div>
  )
}
