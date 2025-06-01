"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Actualizar el estado inicialmente
    setMatches(media.matches)

    // Definir callback para actualizar el estado cuando cambie
    const listener = () => {
      setMatches(media.matches)
    }

    // Agregar listener
    media.addEventListener("change", listener)

    // Limpiar listener
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
