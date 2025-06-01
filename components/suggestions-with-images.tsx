"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Upload, X, ChevronDown, ChevronUp, ImageIcon } from "lucide-react"
import Image from "next/image"

export interface SuggestionWithImages {
  id: string
  text: string
  images: {
    id: string
    file: File
    url: string
    description: string
  }[]
}

interface SuggestionsWithImagesProps {
  suggestions: SuggestionWithImages[]
  onChange: (suggestions: SuggestionWithImages[]) => void
}

export function SuggestionsWithImages({ suggestions, onChange }: SuggestionsWithImagesProps) {
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null)
  const [expandedImageSection, setExpandedImageSection] = useState<string | null>(null)

  const addSuggestion = () => {
    const newSuggestion: SuggestionWithImages = {
      id: Math.random().toString(36).substr(2, 9),
      text: "",
      images: [],
    }
    onChange([...suggestions, newSuggestion])
    // Auto-expand the new suggestion
    setExpandedSuggestion(newSuggestion.id)
  }

  const removeSuggestion = (id: string) => {
    // Limpiar URLs de las imágenes
    const suggestionToRemove = suggestions.find((s) => s.id === id)
    if (suggestionToRemove) {
      suggestionToRemove.images.forEach((img) => URL.revokeObjectURL(img.url))
    }
    onChange(suggestions.filter((s) => s.id !== id))
  }

  const updateSuggestionText = (id: string, text: string) => {
    onChange(suggestions.map((s) => (s.id === id ? { ...s, text } : s)))
  }

  const addImageToSuggestion = (suggestionId: string, files: FileList | null) => {
    if (!files) return

    const newImages = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        url: URL.createObjectURL(file),
        description: "",
      }))

    onChange(suggestions.map((s) => (s.id === suggestionId ? { ...s, images: [...s.images, ...newImages] } : s)))
  }

  const removeImageFromSuggestion = (suggestionId: string, imageId: string) => {
    onChange(
      suggestions.map((s) => {
        if (s.id === suggestionId) {
          const imageToRemove = s.images.find((img) => img.id === imageId)
          if (imageToRemove) {
            URL.revokeObjectURL(imageToRemove.url)
          }
          return { ...s, images: s.images.filter((img) => img.id !== imageId) }
        }
        return s
      }),
    )
  }

  const updateImageDescription = (suggestionId: string, imageId: string, description: string) => {
    onChange(
      suggestions.map((s) =>
        s.id === suggestionId
          ? {
              ...s,
              images: s.images.map((img) => (img.id === imageId ? { ...img, description } : img)),
            }
          : s,
      ),
    )
  }

  const toggleSuggestion = (id: string) => {
    setExpandedSuggestion(expandedSuggestion === id ? null : id)
  }

  const toggleImageSection = (id: string) => {
    setExpandedImageSection(expandedImageSection === id ? null : id)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg sm:text-xl">Sugerencias para tener en cuenta</CardTitle>
          <Button onClick={addSuggestion} size="sm" className="w-full sm:w-auto h-12 sm:h-10">
            <Plus className="h-5 w-5 mr-2" />
            Agregar Sugerencia
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion, index) => {
          const isExpanded = expandedSuggestion === suggestion.id
          const isImageSectionExpanded = expandedImageSection === suggestion.id
          const hasImages = suggestion.images.length > 0

          return (
            <Card key={suggestion.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                {/* Header with letter and expand/collapse */}
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSuggestion(suggestion.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(97 + index)}
                    </div>
                    <h3 className="font-medium">Sugerencia {index + 1}</h3>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Preview of text when collapsed */}
                {!isExpanded && suggestion.text && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 line-clamp-2">{suggestion.text}</p>
                  </div>
                )}

                {/* Expanded content */}
                {isExpanded && (
                  <div className="mt-4 space-y-4">
                    {/* Texto de la sugerencia */}
                    <div>
                      <Textarea
                        value={suggestion.text}
                        onChange={(e) => updateSuggestionText(suggestion.id, e.target.value)}
                        placeholder="Escriba la sugerencia..."
                        className="min-h-[120px] text-sm sm:text-base"
                      />
                    </div>

                    {/* Sección de imágenes */}
                    <div className="space-y-3">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleImageSection(suggestion.id)}
                      >
                        <div className="flex items-center gap-2">
                          <ImageIcon className="h-4 w-4 text-blue-600" />
                          <Label className="text-sm font-medium cursor-pointer">
                            Imágenes de apoyo {hasImages ? `(${suggestion.images.length})` : ""}
                          </Label>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          {isImageSectionExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      {/* Botón de agregar imágenes siempre visible */}
                      <div className="relative">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => addImageToSuggestion(suggestion.id, e.target.files)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Button variant="outline" size="sm" className="w-full h-12 border-dashed">
                          <Upload className="h-4 w-4 mr-2" />
                          {hasImages ? "Agregar más imágenes" : "Agregar imágenes"}
                        </Button>
                      </div>

                      {/* Grid de imágenes expandible */}
                      {hasImages && isImageSectionExpanded && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 gap-3">
                            {suggestion.images.map((image) => (
                              <div key={image.id} className="relative border rounded-lg overflow-hidden">
                                <div className="relative aspect-video">
                                  <Image
                                    src={image.url || "/placeholder.svg"}
                                    alt={image.description || "Imagen de sugerencia"}
                                    fill
                                    className="object-cover"
                                  />
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      removeImageFromSuggestion(suggestion.id, image.id)
                                    }}
                                    className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="p-3">
                                  <Input
                                    value={image.description}
                                    onChange={(e) => updateImageDescription(suggestion.id, image.id, e.target.value)}
                                    placeholder="Descripción de la imagen..."
                                    className="text-sm"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Indicador de imágenes cuando está colapsado */}
                      {hasImages && !isImageSectionExpanded && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {suggestion.images.slice(0, 3).map((image) => (
                            <div
                              key={image.id}
                              className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200"
                            >
                              <Image
                                src={image.url || "/placeholder.svg"}
                                alt={image.description || "Imagen de sugerencia"}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {suggestion.images.length > 3 && (
                            <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">+{suggestion.images.length - 3}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Botón de eliminar */}
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeSuggestion(suggestion.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full h-10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar esta sugerencia
                      </Button>
                    </div>
                  </div>
                )}

                {/* Indicador de imágenes cuando la sugerencia está colapsada */}
                {!isExpanded && hasImages && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 flex items-center">
                      <ImageIcon className="h-3 w-3 mr-1" />
                      {suggestion.images.length} imagen{suggestion.images.length !== 1 ? "es" : ""}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}

        {suggestions.length === 0 && (
          <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
            <Plus className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-sm sm:text-base text-gray-500">
              No hay sugerencias. Toque "Agregar Sugerencia" para comenzar.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
