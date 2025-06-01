"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Building, FocusIcon as Foundation, Layers, Hammer } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const reportTypes = [
  {
    id: "vigas",
    title: "Inspección de Vigas",
    description: "Reporte para inspección de vigas (entrepiso, corona, medianera, cargadores)",
    icon: Building,
    href: "/reportes/vigas",
  },
  {
    id: "entrepiso",
    title: "Inspección de Entrepiso",
    description: "Reporte para inspección de viguetas, bloques y mallas electrosoldadas",
    icon: Layers,
    href: "/reportes/entrepiso",
  },
  {
    id: "cimientos",
    title: "Excavación y Cimientos",
    description: "Reporte para inspección de excavación, fundaciones y placas",
    icon: Foundation,
    href: "/reportes/cimientos",
  },
  {
    id: "paredes",
    title: "Levantamiento de Paredes",
    description: "Reporte para inspección de bloques, bastones y refuerzos",
    icon: Hammer,
    href: "/reportes/paredes",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Image src="/images/armabloque-logo.jpeg" alt="ARMABLOQUE" width={80} height={80} className="rounded-lg" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Sistema de Reportes de Inspección</h1>
              <p className="text-xl text-gray-600 mb-1">ARMABLOQUE SISTEMAS DE CONSTRUCCION</p>
            </div>
          </div>
        </div>

        {/* Report Type Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTypes.map((report) => {
            const IconComponent = report.icon
            return (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                    <div>
                      <CardTitle className="text-xl">{report.title}</CardTitle>
                      <CardDescription className="mt-2">{report.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={report.href}>
                    <Button className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Crear Reporte
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
