"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Menu, X, Home, Check, AlertCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { MobileFormNavigation } from "@/components/mobile-form-navigation"
import { ReportSummaryModal } from "@/components/report-summary-modal"
import { ClientPDFGenerator } from "@/components/client-pdf-generator"
import Image from "next/image"

interface FormSection {
  id: string
  title: string
  completed: boolean
  component: React.ReactNode
}

interface ReportData {
  reportTitle: string
  projectInfo: any
  specificConfig: any
  checklist: any[]
  suggestions: any[]
  observations: string[]
  images: any[]
  returnUrl: string
}

interface MobileLayoutProps {
  title: string
  sections: FormSection[]
  reportData: ReportData
}

export function MobileLayout({ title, sections, reportData }: MobileLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)

  // Detectar scroll para cambiar el estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const completedSections = sections.filter((section) => section.completed).length
  const progressPercentage = (completedSections / sections.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fijo */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          isScrolled ? "bg-white shadow-md py-2" : "bg-white py-3 shadow-sm",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Image src="/images/armabloque-logo.jpeg" alt="ARMABLOQUE" width={32} height={32} className="rounded" />
                <div>
                  <h1
                    className={cn(
                      "font-bold transition-all duration-200 leading-tight",
                      isScrolled ? "text-sm text-gray-900" : "text-base text-gray-800",
                    )}
                  >
                    {title}
                  </h1>
                  <p className="text-xs text-gray-500">ARMABLOQUE</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-10 w-10 rounded-full"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Barra de progreso */}
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Progreso del reporte</span>
              <span>
                {completedSections}/{sections.length} completadas
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="pt-20 px-6">
          <div className="space-y-6">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-gray-100">
                <Home className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Inicio</span>
              </div>
            </Link>

            {/* Secciones del reporte */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700 px-4">Secciones del Reporte</h3>
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setCurrentSection(index)
                    setIsMobileMenuOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 p-4 rounded-lg text-left transition-colors",
                    currentSection === index ? "bg-blue-100 border-l-4 border-blue-600" : "hover:bg-gray-100",
                  )}
                >
                  {section.completed ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-gray-400" />
                  )}
                  <span className={cn("font-medium", section.completed ? "text-green-700" : "text-gray-700")}>
                    {section.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Acciones rápidas */}
            <div className="space-y-2 pt-4 border-t">
              <ReportSummaryModal
                reportTitle={reportData.reportTitle}
                projectInfo={reportData.projectInfo}
                specificConfig={reportData.specificConfig}
                checklist={reportData.checklist}
                suggestions={reportData.suggestions}
                observations={reportData.observations}
                images={reportData.images}
              />
              <ClientPDFGenerator
                reportTitle={reportData.reportTitle}
                projectInfo={reportData.projectInfo}
                specificConfig={reportData.specificConfig}
                checklist={reportData.checklist}
                suggestions={reportData.suggestions}
                observations={reportData.observations}
                images={reportData.images}
                returnUrl={reportData.returnUrl}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="pt-28 pb-32">
        <div className="container mx-auto px-4">
          {/* Navegación entre secciones */}
          <MobileFormNavigation
            sections={sections}
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
          />

          {/* Contenido de la sección actual */}
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">{sections[currentSection]?.title}</h2>
              {sections[currentSection]?.component}
            </div>
          </div>
        </div>
      </main>

      {/* Footer fijo para acciones principales */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
        <div className="container mx-auto">
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                className="flex-1"
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                disabled={currentSection === sections.length - 1}
                className="flex-1"
              >
                Siguiente
              </Button>
            </div>
            <div className="flex gap-2">
              <ReportSummaryModal
                reportTitle={reportData.reportTitle}
                projectInfo={reportData.projectInfo}
                specificConfig={reportData.specificConfig}
                checklist={reportData.checklist}
                suggestions={reportData.suggestions}
                observations={reportData.observations}
                images={reportData.images}
              />
              <ClientPDFGenerator
                reportTitle={reportData.reportTitle}
                projectInfo={reportData.projectInfo}
                specificConfig={reportData.specificConfig}
                checklist={reportData.checklist}
                suggestions={reportData.suggestions}
                observations={reportData.observations}
                images={reportData.images}
                returnUrl={reportData.returnUrl}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
