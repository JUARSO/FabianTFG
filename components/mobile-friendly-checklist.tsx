"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import type { ChecklistItem } from "@/types/report-types"
import { cn } from "@/lib/utils"

interface MobileFriendlyChecklistProps {
  title: string
  items: ChecklistItem[]
  onChange: (items: ChecklistItem[]) => void
}

export function MobileFriendlyChecklist({ title, items, onChange }: MobileFriendlyChecklistProps) {
  const [expandedItem, setExpandedItem] = useState<number | null>(null)

  const handleItemChange = (index: number, field: keyof ChecklistItem, value: any) => {
    const newItems = [...items]
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    }
    onChange(newItems)
  }

  const toggleItem = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index)
  }

  // Calcular estadísticas
  const totalItems = items.length
  const completedItems = items.filter((item) => item.aceptado !== "").length
  const acceptedItems = items.filter((item) => item.aceptado === "si").length
  const rejectedItems = items.filter((item) => item.aceptado === "no").length

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {completedItems} de {totalItems} completados
          </div>
          <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{acceptedItems} aceptados</div>
          <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">{rejectedItems} rechazados</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item, index) => {
            const isExpanded = expandedItem === index
            const hasObservations = item.observaciones.trim().length > 0

            return (
              <Card
                key={item.id}
                className={cn(
                  "border-l-4 transition-all",
                  item.aceptado === "si"
                    ? "border-l-green-500"
                    : item.aceptado === "no"
                      ? "border-l-red-500"
                      : "border-l-gray-300",
                )}
              >
                <CardContent className="p-3 sm:p-4">
                  {/* Header row with item number, status and expand button */}
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleItem(index)}>
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={cn(
                          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                          item.aceptado === "si"
                            ? "bg-green-100 text-green-800"
                            : item.aceptado === "no"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800",
                        )}
                      >
                        {item.id}
                      </div>
                      <p className="text-sm sm:text-base line-clamp-2">{item.descripcion}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Status indicators visible even when collapsed */}
                  <div className="mt-3 flex items-center gap-2">
                    <Button
                      variant={item.aceptado === "si" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleItemChange(index, "aceptado", item.aceptado === "si" ? "" : "si")}
                      className={cn(
                        "h-10 flex-1",
                        item.aceptado === "si" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50",
                      )}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      SÍ
                    </Button>
                    <Button
                      variant={item.aceptado === "no" ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => handleItemChange(index, "aceptado", item.aceptado === "no" ? "" : "no")}
                      className="h-10 flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      NO
                    </Button>
                    <Button
                      variant={item.aceptado === "" ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => handleItemChange(index, "aceptado", "")}
                      className="h-10 flex-1"
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Pendiente
                    </Button>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="mt-3 space-y-3 pt-3 border-t">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Observaciones:</label>
                        <Textarea
                          value={item.observaciones}
                          onChange={(e) => handleItemChange(index, "observaciones", e.target.value)}
                          placeholder="Escriba sus observaciones aquí..."
                          className="min-h-[100px] text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  )}

                  {/* Indicator that there are observations */}
                  {!isExpanded && hasObservations && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 italic">Tiene observaciones. Toque para ver/editar.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
