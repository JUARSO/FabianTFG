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
import { useMediaQuery } from "@/hooks/use-media-query"
import { MobileFormNavigation } from "@/components/mobile-form-navigation"
import Image from "next/image"

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
  const [currentSection, setCurrentSection] = useState(0)

  const isMobile = useMediaQuery("(max-width: 1024px)")

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

  const completedSections = formSections.filter((section) => section.completed).length
  const progressPercentage = Math.round((completedSections / formSections.length) * 100)

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Live Preview Panel - Solo visible en desktop */}
      <div className="hidden lg:block">
        <LiveReportPreview
          reportTitle="Informe de Inspección - Entrepiso"
          projectInfo={projectInfo}
          specificConfig={entrepisoConfig}
          checklist={checklist}
          suggestions={suggestions}
          observations={observations}
          images={images}
        />
      </div>

      <div className="max-w-6xl mx-auto lg:pr-80">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Image src="/images/armabloque-logo.jpeg" alt="ARMABLOQUE" width={40} height={40} className="rounded" />
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  Informe de Inspección - Entrepiso
                </h1>
                <p className="text-sm text-gray-500">ARMABLOQUE</p>
                <div className="flex flex-col sm:flex-row items-center gap-2">
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
          </div>
        </div>

        <div className="text-center mb-8 p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600">ARMABLOQUE</p>
        </div>

        {isMobile ? (
          <>
            {/* Barra de progreso para móvil */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progreso del reporte</span>
                <span>
                  {completedSections}/{formSections.length} secciones
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>

            {/* Navegación móvil */}
            <MobileFormNavigation
              sections={formSections}
              currentSection={currentSection}
              onSectionChange={setCurrentSection}
            />

            {/* Sección actual */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-20">
              <h2 className="text-xl font-bold mb-4">{formSections[currentSection].title}</h2>
              {formSections[currentSection].component}
            </div>

            {/* Botones de navegación fijos */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
              <div className="container mx-auto flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentSection(Math.min(formSections.length - 1, currentSection + 1))}
                    disabled={currentSection === formSections.length - 1}
                  >
                    Siguiente
                  </Button>
                </div>
                <div className="flex gap-2">
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
          </>
        ) : (
          /* Vista desktop - mostrar todas las secciones */
          <div className="space-y-6">
            {formSections.map((section) => (
              <div key={section.id} className="mb-8">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">{section.title}</h2>
                {section.component}
              </div>
            ))}

            {/* Botones de acción en desktop */}
            <div className="mt-8 mb-16 flex flex-col sm:flex-row justify-center gap-4">
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
        )}
      </div>
    </div>
  )
}
