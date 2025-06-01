export interface ProjectInfo {
  modelo: string
  direccion: string
  empresa: string
  encargado: string
  fecha: string
}

export interface ChecklistItem {
  id: number
  descripcion: string
  aceptado: "si" | "no" | ""
  observaciones: string
}

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

export interface ReportData {
  projectInfo: ProjectInfo
  checklist: ChecklistItem[]
  suggestions: SuggestionWithImages[]
  observations: string[]
  images: ImageAttachment[]
}

export interface VigasChecklistItem extends ChecklistItem {
  tipoViga?: {
    entrepiso: boolean
    corona: boolean
    medianera: boolean
    cargadores: boolean
  }
}

export interface EntrepisoChecklistItem extends ChecklistItem {
  nivel?: number
  tipoVigueta?: string
  tipoBloque?: "estereofon" | "concreto"
  tipoApuntalamiento?: "metal" | "madera"
}

export interface CimientosChecklistItem extends ChecklistItem {
  tipoFundacion?: "placa-corrida" | "losa-flotante"
}

export interface ParedesChecklistItem extends ChecklistItem {
  nivel?: number
  tipoVarilla?: "#3" | "#4" | "#5"
}

export interface ImageAttachment {
  id: string
  file: File
  url: string
  description: string
  title: string
}
