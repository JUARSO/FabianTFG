"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface ObservationsFormProps {
  observations: string[]
  onChange: (observations: string[]) => void
}

export function ObservationsForm({ observations, onChange }: ObservationsFormProps) {
  const defaultObservations = [
    "Se recomienda que, en las reparaciones de: pasantes, relleno de celdas vacías, hormigueros en elementos de concreto como vigas y columnas, se reparen con mortero expansivo tipo Maxibed Grout Standard de Intaco o similar.",
    "Se recomienda que, en los anclajes de pernos y varillas, se utilice un adhesivo epóxico tipo Anchormax 590 de Intaco o similar.",
  ]

  const currentObservations = observations.length > 0 ? observations : defaultObservations

  const updateObservation = (index: number, value: string) => {
    const newObservations = [...currentObservations]
    newObservations[index] = value
    onChange(newObservations)
  }

  const addObservation = () => {
    onChange([...currentObservations, ""])
  }

  const removeObservation = (index: number) => {
    const newObservations = [...currentObservations]
    newObservations.splice(index, 1)
    onChange(newObservations.length > 0 ? newObservations : [])
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>3) Observaciones</CardTitle>
          <Button onClick={addObservation} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Observación
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentObservations.map((observation, index) => (
          <div key={index} className="flex space-x-2">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium mr-2">{String.fromCharCode(97 + index)}.</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeObservation(index)}
                  className="ml-auto h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={observation}
                onChange={(e) => updateObservation(index, e.target.value)}
                className="min-h-[100px]"
                placeholder="Escriba la observación..."
              />
            </div>
          </div>
        ))}
        {currentObservations.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No hay observaciones. Haga clic en "Agregar Observación" para comenzar.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
