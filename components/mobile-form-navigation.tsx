"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, CheckCircle, AlertCircle, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormSection {
  id: string
  title: string
  completed: boolean
  component: React.ReactNode
}

interface MobileFormNavigationProps {
  sections: FormSection[]
  onComplete: () => void
}

export function MobileFormNavigation({ sections, onComplete }: MobileFormNavigationProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Mínima distancia para considerar un swipe
  const minSwipeDistance = 50

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
      scrollToTop()
    } else {
      onComplete()
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
      scrollToTop()
    }
  }

  const goToSection = (index: number) => {
    setCurrentSection(index)
    scrollToTop()
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Manejo de gestos táctiles para swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentSection < sections.length - 1) {
      nextSection()
    }
    if (isRightSwipe && currentSection > 0) {
      prevSection()
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator - Sticky en móvil */}
      <div className="sticky top-16 z-20 bg-gray-50 pt-2 pb-3 -mx-3 px-3 lg:static lg:bg-transparent lg:p-0 lg:m-0">
        <Card className="lg:hidden shadow-sm">
          <CardContent className="p-3">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-sm">
                  Sección {currentSection + 1} de {sections.length}
                </h3>
                <span className="text-xs text-gray-500 font-medium">
                  {Math.round(((currentSection + 1) / sections.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {sections.map((section, index) => (
                  <Button
                    key={section.id}
                    variant={index === currentSection ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToSection(index)}
                    className={cn(
                      "text-xs p-1.5 h-auto min-h-[40px] flex flex-col items-center justify-center",
                      section.completed && index !== currentSection ? "border-green-500 text-green-700" : "",
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {section.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <span className="hidden sm:inline text-[10px] leading-tight text-center">{section.title}</span>
                      <span className="sm:hidden">{index + 1}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current section content with touch events */}
      <div
        ref={contentRef}
        className="lg:hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="mb-4">
          <h2 className="text-xl font-bold">{sections[currentSection]?.title}</h2>
        </div>
        {sections[currentSection]?.component}
      </div>

      {/* Desktop view - show all sections */}
      <div className="hidden lg:block space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            {section.component}
          </div>
        ))}
      </div>

      {/* Navigation buttons for mobile - Sticky bottom */}
      <div className="lg:hidden sticky bottom-20 left-0 right-0 bg-gray-50 pt-3 pb-3 -mx-3 px-3 z-20 shadow-[0_-1px_2px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center gap-4">
          <Button
            variant="outline"
            onClick={prevSection}
            disabled={currentSection === 0}
            className="flex-1 h-14 text-base"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Anterior
          </Button>

          {currentSection === sections.length - 1 ? (
            <Button onClick={onComplete} className="flex-1 h-14 text-base bg-red-600 hover:bg-red-700">
              <FileText className="h-5 w-5 mr-2" />
              Generar PDF
            </Button>
          ) : (
            <Button onClick={nextSection} className="flex-1 h-14 text-base">
              Siguiente
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
