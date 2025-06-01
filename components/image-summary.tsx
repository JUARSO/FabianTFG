"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import type { ImageAttachment } from "./image-upload"

interface ImageSummaryProps {
  images: ImageAttachment[]
}

export function ImageSummary({ images }: ImageSummaryProps) {
  if (images.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5" />
            <span>Resumen de Imágenes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">No hay imágenes adjuntas</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5" />
            <span>Resumen de Imágenes</span>
          </div>
          <Badge variant="secondary">
            {images.length} imagen{images.length !== 1 ? "es" : ""}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="space-y-2">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image src={image.url || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
              </div>
              <div className="text-xs">
                <p className="font-medium truncate" title={image.title}>
                  {image.title}
                </p>
                {image.description && (
                  <p className="text-gray-500 truncate" title={image.description}>
                    {image.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
