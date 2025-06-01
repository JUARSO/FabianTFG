"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Menu, X, Home } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MobileLayoutProps {
  title: string
  children: React.ReactNode
}

export function MobileLayout({ title, children }: MobileLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Detectar scroll para cambiar el estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fijo */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-3",
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
              <h1
                className={cn(
                  "font-bold transition-all duration-200",
                  isScrolled ? "text-lg text-gray-900" : "text-xl text-gray-800",
                )}
              >
                {title}
              </h1>
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
            <Link href="/reportes/vigas" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-100">
                <span className="font-medium">Reporte de Vigas</span>
              </div>
            </Link>
            <Link href="/reportes/entrepiso" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-100">
                <span className="font-medium">Reporte de Entrepiso</span>
              </div>
            </Link>
            <Link href="/reportes/cimientos" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-100">
                <span className="font-medium">Reporte de Cimientos</span>
              </div>
            </Link>
            <Link href="/reportes/paredes" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-100">
                <span className="font-medium">Reporte de Paredes</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Contenido principal con padding para el header fijo */}
      <main className="pt-16 pb-20">{children}</main>

      {/* Footer fijo para acciones principales */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-30">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Button variant="outline" className="w-24 h-12 text-sm">
                Cancelar
              </Button>
            </Link>
            <Button className="w-36 h-12 bg-blue-600 hover:bg-blue-700 text-sm">Guardar Reporte</Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
