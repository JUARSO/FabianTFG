"use client"

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import type { ProjectInfo, ChecklistItem } from "@/types/report-types"
import type { SuggestionWithImages } from "./suggestions-with-images"
import type { ImageAttachment } from "./image-upload"

// Estilos mejorados para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  companyInfo: {
    fontSize: 9,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  projectInfoGrid: {
    border: 1,
    borderColor: "#000",
    padding: 10,
    marginBottom: 15,
  },
  projectInfoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  projectInfoLabel: {
    fontWeight: "bold",
    width: "30%",
  },
  projectInfoValue: {
    width: "70%",
  },
  configSection: {
    backgroundColor: "#f9f9f9",
    padding: 8,
    marginBottom: 15,
    border: 1,
    borderColor: "#ddd",
  },
  configTitle: {
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 5,
  },
  configText: {
    fontSize: 9,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#e0e0e0",
    fontWeight: "bold",
  },
  tableCell: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 4,
    fontSize: 9,
  },
  colItem: {
    width: "8%",
    textAlign: "center",
  },
  colDescription: {
    width: "47%",
  },
  colStatus: {
    width: "15%",
    textAlign: "center",
  },
  colObservations: {
    width: "30%",
  },
  statusAccepted: {
    backgroundColor: "#d4edda",
    color: "#155724",
    fontWeight: "bold",
  },
  statusRejected: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    fontWeight: "bold",
  },
  statusPending: {
    backgroundColor: "#fff3cd",
    color: "#856404",
    fontWeight: "bold",
  },
  suggestionItem: {
    marginBottom: 12,
    padding: 8,
    border: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
  },
  suggestionHeader: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 10,
  },
  suggestionText: {
    lineHeight: 1.4,
    marginBottom: 5,
  },
  suggestionImages: {
    fontSize: 8,
    fontStyle: "italic",
    color: "#666",
  },
  observationItem: {
    marginBottom: 8,
    padding: 6,
    backgroundColor: "#f9f9f9",
    border: 1,
    borderColor: "#eee",
  },
  observationHeader: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  observationText: {
    lineHeight: 1.4,
  },
  summarySection: {
    backgroundColor: "#e8f4fd",
    padding: 10,
    marginBottom: 15,
    border: 1,
    borderColor: "#bee5eb",
  },
  summaryTitle: {
    fontWeight: "bold",
    fontSize: 11,
    marginBottom: 5,
  },
  summaryStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    textAlign: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 14,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 8,
  },
  attachmentsInfo: {
    backgroundColor: "#f8f9fa",
    padding: 8,
    border: 1,
    borderColor: "#dee2e6",
  },
})

interface SimplePDFDocumentProps {
  reportTitle: string
  projectInfo: ProjectInfo
  specificConfig?: any
  checklist: ChecklistItem[]
  suggestions: SuggestionWithImages[]
  observations: string[]
  images: ImageAttachment[]
}

// Componente del documento PDF mejorado
const SimplePDFDocument = ({
  reportTitle,
  projectInfo,
  specificConfig,
  checklist,
  suggestions,
  observations,
  images,
}: SimplePDFDocumentProps) => {
  // Función para renderizar la configuración específica
  const renderSpecificConfig = () => {
    if (!specificConfig) return null

    let configText = ""
    if (specificConfig.tipoViga) {
      const tipos = Object.entries(specificConfig.tipoViga)
        .filter(([_, selected]) => selected)
        .map(([tipo, _]) => tipo.charAt(0).toUpperCase() + tipo.slice(1))
      configText = `Tipos de viga seleccionados: ${tipos.join(", ")}`
    } else if (specificConfig.nivel && specificConfig.tipoBloque) {
      configText = `Nivel: ${specificConfig.nivel}, Tipo de bloque: ${specificConfig.tipoBloque}`
    } else if (specificConfig.nivel) {
      configText = `Nivel por inspeccionar: ${specificConfig.nivel}`
    } else if (specificConfig.tipoFundacion) {
      configText = `Tipo de fundación: ${specificConfig.tipoFundacion.replace("-", " ")}`
    }

    return configText
  }

  // Calcular estadísticas
  const totalItems = checklist.length
  const acceptedItems = checklist.filter((item) => item.aceptado === "si").length
  const rejectedItems = checklist.filter((item) => item.aceptado === "no").length
  const pendingItems = checklist.filter((item) => item.aceptado === "").length

  return (
    <Document>
      {/* Primera página: Información del proyecto y resumen */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyInfo}>ARMABLOQUE</Text>
          <Text style={styles.title}>{reportTitle}</Text>
          <Text style={styles.companyInfo}>Fecha de generación: {new Date().toLocaleDateString()}</Text>
        </View>

        {/* Información del proyecto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMACIÓN DEL PROYECTO</Text>
          <View style={styles.projectInfoGrid}>
            <View style={styles.projectInfoRow}>
              <Text style={styles.projectInfoLabel}>Modelo:</Text>
              <Text style={styles.projectInfoValue}>{projectInfo.modelo || "No especificado"}</Text>
            </View>
            <View style={styles.projectInfoRow}>
              <Text style={styles.projectInfoLabel}>Dirección:</Text>
              <Text style={styles.projectInfoValue}>{projectInfo.direccion || "No especificada"}</Text>
            </View>
            <View style={styles.projectInfoRow}>
              <Text style={styles.projectInfoLabel}>Empresa:</Text>
              <Text style={styles.projectInfoValue}>{projectInfo.empresa || "No especificada"}</Text>
            </View>
            <View style={styles.projectInfoRow}>
              <Text style={styles.projectInfoLabel}>Encargado:</Text>
              <Text style={styles.projectInfoValue}>{projectInfo.encargado || "No especificado"}</Text>
            </View>
            <View style={styles.projectInfoRow}>
              <Text style={styles.projectInfoLabel}>Fecha de inspección:</Text>
              <Text style={styles.projectInfoValue}>{projectInfo.fecha || "No especificada"}</Text>
            </View>
          </View>
        </View>

        {/* Configuración específica */}
        {renderSpecificConfig() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CONFIGURACIÓN ESPECÍFICA</Text>
            <View style={styles.configSection}>
              <Text style={styles.configText}>{renderSpecificConfig()}</Text>
            </View>
          </View>
        )}

        {/* Resumen de resultados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RESUMEN DE RESULTADOS</Text>
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Estadísticas de la Inspección</Text>
            <View style={styles.summaryStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalItems}</Text>
                <Text style={styles.statLabel}>Total Items</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: "#28a745" }]}>{acceptedItems}</Text>
                <Text style={styles.statLabel}>Aceptados</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: "#dc3545" }]}>{rejectedItems}</Text>
                <Text style={styles.statLabel}>Rechazados</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: "#ffc107" }]}>{pendingItems}</Text>
                <Text style={styles.statLabel}>Pendientes</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Lista de verificación */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LISTA DE VERIFICACIÓN - RESPUESTAS DEL USUARIO</Text>
          <View style={styles.table}>
            {/* Encabezado de la tabla */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCell, styles.colItem]}>
                <Text>ITEM</Text>
              </View>
              <View style={[styles.tableCell, styles.colDescription]}>
                <Text>DESCRIPCIÓN</Text>
              </View>
              <View style={[styles.tableCell, styles.colStatus]}>
                <Text>RESPUESTA</Text>
              </View>
              <View style={[styles.tableCell, styles.colObservations]}>
                <Text>OBSERVACIONES</Text>
              </View>
            </View>

            {/* Filas de la tabla */}
            {checklist.map((item) => {
              let statusStyle = {}
              let statusText = "PENDIENTE"

              if (item.aceptado === "si") {
                statusStyle = styles.statusAccepted
                statusText = "✓ SÍ"
              } else if (item.aceptado === "no") {
                statusStyle = styles.statusRejected
                statusText = "✗ NO"
              } else {
                statusStyle = styles.statusPending
                statusText = "⚠ PENDIENTE"
              }

              return (
                <View key={item.id} style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.colItem]}>
                    <Text>{item.id}</Text>
                  </View>
                  <View style={[styles.tableCell, styles.colDescription]}>
                    <Text>{item.descripcion}</Text>
                  </View>
                  <View style={[styles.tableCell, styles.colStatus, statusStyle]}>
                    <Text>{statusText}</Text>
                  </View>
                  <View style={[styles.tableCell, styles.colObservations]}>
                    <Text>{item.observaciones || "Sin observaciones"}</Text>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </Page>

      {/* Segunda página: Sugerencias y observaciones */}
      <Page size="A4" style={styles.page}>
        {/* Header de segunda página */}
        <View style={styles.header}>
          <Text style={styles.companyInfo}>ARMABLOQUE</Text>
          <Text style={styles.title}>{reportTitle} - Página 2</Text>
        </View>

        {/* Sugerencias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUGERENCIAS DEL USUARIO</Text>
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <View key={suggestion.id} style={styles.suggestionItem}>
                <Text style={styles.suggestionHeader}>Sugerencia {String.fromCharCode(97 + index).toUpperCase()}:</Text>
                <Text style={styles.suggestionText}>{suggestion.text}</Text>
                {suggestion.images.length > 0 && (
                  <Text style={styles.suggestionImages}>
                    📷 Esta sugerencia incluye {suggestion.images.length} imagen(es) de apoyo
                  </Text>
                )}
              </View>
            ))
          ) : (
            <View style={styles.suggestionItem}>
              <Text>El usuario no registró sugerencias para este reporte.</Text>
            </View>
          )}
        </View>

        {/* Observaciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OBSERVACIONES DEL USUARIO</Text>
          {observations.length > 0 ? (
            observations.map((observation, index) => (
              <View key={index} style={styles.observationItem}>
                <Text style={styles.observationHeader}>
                  Observación {String.fromCharCode(97 + index).toUpperCase()}:
                </Text>
                <Text style={styles.observationText}>{observation}</Text>
              </View>
            ))
          ) : (
            <View style={styles.observationItem}>
              <Text>El usuario no registró observaciones adicionales para este reporte.</Text>
            </View>
          )}
        </View>

        {/* Información de anexos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ANEXOS E IMÁGENES</Text>
          <View style={styles.attachmentsInfo}>
            {images.length > 0 ? (
              <View>
                <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                  📎 El usuario adjuntó {images.length} imagen(es) al reporte:
                </Text>
                {images.map((image, index) => (
                  <Text key={image.id} style={{ marginBottom: 3, fontSize: 9 }}>
                    • {image.title} {image.description && `- ${image.description}`}
                  </Text>
                ))}
              </View>
            ) : (
              <Text>El usuario no adjuntó imágenes adicionales a este reporte.</Text>
            )}
          </View>
        </View>

        {/* Pie de página */}
        <View style={{ marginTop: 30, textAlign: "center", fontSize: 8, color: "#666" }}>
          <Text>--- Fin del Reporte ---</Text>
          <Text>Documento generado automáticamente por el Sistema de Reportes de Inspección</Text>
        </View>
      </Page>
    </Document>
  )
}

interface SimplePDFGeneratorProps {
  reportTitle: string
  projectInfo: ProjectInfo
  specificConfig?: any
  checklist: ChecklistItem[]
  suggestions: SuggestionWithImages[]
  observations: string[]
  images: ImageAttachment[]
}

export function SimplePDFGenerator({
  reportTitle,
  projectInfo,
  specificConfig,
  checklist,
  suggestions,
  observations,
  images,
}: SimplePDFGeneratorProps) {
  const fileName = `${reportTitle.replace(/\s+/g, "_")}_${projectInfo.modelo || "Reporte"}_${
    new Date().toISOString().split("T")[0]
  }.pdf`

  return (
    <PDFDownloadLink
      document={
        <SimplePDFDocument
          reportTitle={reportTitle}
          projectInfo={projectInfo}
          specificConfig={specificConfig}
          checklist={checklist}
          suggestions={suggestions}
          observations={observations}
          images={images}
        />
      }
      fileName={fileName}
    >
      {({ blob, url, loading, error }) => (
        <Button disabled={loading} className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
          <FileDown className="h-4 w-4 mr-2" />
          {loading ? "Generando PDF..." : "Descargar PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  )
}
