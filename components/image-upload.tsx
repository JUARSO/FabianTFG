"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X, Eye, Download } from "lucide-react"
import Image from "next/image"

export interface ImageAttachment {
  id: string
  file: File
  url: string
  description: string
  title: string
}

interface ImageUploadProps {
  images: ImageAttachment[]
  onChange: (images: ImageAttachment[]) => void
}

export function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const newImages: ImageAttachment[] = []

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const id = Math.random().toString(36).substr(2, 9)
        const url = URL.createObjectURL(file)

        newImages.push({
          id,
          file,
          url,
          description: "",
          title: file.name.split(".")[0],
        })
      }
    })

    onChange([...images, ...newImages])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const removeImage = (id: string) => {
    const imageToRemove = images.find((img) => img.id === id)
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.url)
    }
    onChange(images.filter((img) => img.id !== id))
  }

  const updateImageData = (id: string, field: "title" | "description", value: string) => {
    onChange(images.map((img) => (img.id === id ? { ...img, [field]: value } : img)))
  }

  const downloadImage = (image: ImageAttachment) => {
    const link = document.createElement("a")
    link.href = image.url
    link.download = `${image.title}.${image.file.name.split(".").pop()}`
    link.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>4) Anexos - Imágenes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Arrastra las imágenes aquí o haz clic para seleccionar
          </p>
          <p className="text-sm text-gray-500 mb-4">Formatos soportados: JPG, PNG, GIF (máx. 10MB por imagen)</p>
          <Button onClick={() => fileInputRef.current?.click()} variant="outline">
            Seleccionar Imágenes
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </div>

        {/* Images Grid */}
        {images.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Imágenes Adjuntas ({images.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => downloadImage(image)}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeImage(image.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <Label htmlFor={`title-${image.id}`} className="text-sm font-medium">
                        Título
                      </Label>
                      <Input
                        id={`title-${image.id}`}
                        value={image.title}
                        onChange={(e) => updateImageData(image.id, "title", e.target.value)}
                        placeholder="Título de la imagen"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`desc-${image.id}`} className="text-sm font-medium">
                        Descripción
                      </Label>
                      <Textarea
                        id={`desc-${image.id}`}
                        value={image.description}
                        onChange={(e) => updateImageData(image.id, "description", e.target.value)}
                        placeholder="Describe lo que muestra esta imagen..."
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="text-xs text-gray-500">Tamaño: {(image.file.size / 1024 / 1024).toFixed(2)} MB</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {images.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Eye className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p>No hay imágenes adjuntas</p>
            <p className="text-sm">Las imágenes ayudan a documentar visualmente la inspección</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
