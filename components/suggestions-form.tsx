"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

interface SuggestionsFormProps {
  suggestions: string[]
  onChange: (suggestions: string[]) => void
}

export function SuggestionsForm({ suggestions, onChange }: SuggestionsFormProps) {
  const addSuggestion = () => {
    onChange([...suggestions, ""])
  }

  const removeSuggestion = (index: number) => {
    const newSuggestions = suggestions.filter((_, i) => i !== index)
    onChange(newSuggestions)
  }

  const updateSuggestion = (index: number, value: string) => {
    const newSuggestions = [...suggestions]
    newSuggestions[index] = value
    onChange(newSuggestions)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Sugerencias para tener en cuenta</CardTitle>
          <Button onClick={addSuggestion} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Sugerencia
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex space-x-2">
            <div className="flex-1">
              <Textarea
                value={suggestion}
                onChange={(e) => updateSuggestion(index, e.target.value)}
                placeholder={`${String.fromCharCode(97 + index)}) Escriba la sugerencia...`}
                className="min-h-[80px]"
              />
            </div>
            <Button variant="outline" size="sm" onClick={() => removeSuggestion(index)} className="mt-2">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {suggestions.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No hay sugerencias. Haga clic en "Agregar Sugerencia" para comenzar.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
