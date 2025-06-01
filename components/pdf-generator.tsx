"use client"

import type React from "react"

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image as PDFImage, Font } from "@react-pdf/renderer"
import type { ProjectInfo, ChecklistItem } from "@/types/report-types"
import type { SuggestionWithImages } from "./suggestions-with-images"
import type { ImageAttachment } from "./image-upload"

// Registrar fuentes
Font.register({
  family: "Helvetica",
  src: "https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf",
})

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: "#000000",
    paddingBottom: 10,
  },
  companyInfo: {
    fontSize: 9,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
  projectInfoContainer: {
    marginBottom: 20,
    border: 1,
    borderColor: "#000000",
    padding: 10,
  },
  projectInfoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  projectInfoItem: {
    flexDirection: "row",
    width: "48%",
    marginBottom: 8,
  },
  projectInfoLabel: {
    fontWeight: "bold",
    width: "40%",
  },
  projectInfoValue: {
    width: "60%",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 20,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  tableColHeader1: {
    width: "8%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 5,
    textAlign: "center",
  },
  tableColHeader2: {
    width: "52%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 5,
  },
  tableColHeader3: {
    width: "15%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 5,
    textAlign: "center",
  },
  tableColHeader4: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 5,
  },
  tableCol1: {
    width: "8%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 5,
    textAlign: "center",
  },
  tableCol2: {
    width: "52%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 5,
  },
  tableCol3: {
    width: "15%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 5,
    textAlign: "center",
  },
  tableCol4: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  checkbox: {
    width: 10,
    height: 10,
    border: 1,
    borderColor: "#000000",
    textAlign: "center",
    fontSize: 8,
  },
  checkedBox: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
  },
  suggestionItem: {
    marginBottom: 15,
    padding: 10,
    border: 1,
    borderColor: "#cccccc",
  },
  suggestionText: {
    marginBottom: 10,
    lineHeight: 1.4,
  },
  suggestionImages: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  suggestionImage: {
    width: 120,
    height: 90,
    objectFit: "cover",
    border: 1,
    borderColor: "#cccccc",
  },
  imageDescription: {
    fontSize: 8,
    fontStyle: "italic",
    marginTop: 2,
    width: 120,
  },
  observationItem: {
    marginBottom: 10,
    lineHeight: 1.4,
  },
  attachmentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginTop: 10,
  },
  attachmentItem: {
    width: 150,
    marginBottom: 15,
  },
  attachmentImage: {
    width: 150,
    height: 112,
    objectFit: "cover",
    border: 1,
    borderColor: "#cccccc",
  },
  attachmentTitle: {
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 5,
  },
  attachmentDescription: {
    fontSize: 8,
    marginTop: 2,
    lineHeight: 1.3,
  },
})

interface PDFDocumentProps {
  reportTitle: string
  projectInfo: ProjectInfo
  specificConfig?: any
  checklist: ChecklistItem[]
  suggestions: SuggestionWithImages[]
  observations: string[]
  images: ImageAttachment[]
}

// Componente del documento PDF
const ReportPDFDocument = ({
  reportTitle,
  projectInfo,
  specificConfig,
  checklist,
  suggestions,
  observations,
  images,
}: PDFDocumentProps) => {
  const renderCheckbox = (value: string) => {
    if (value === "si") {
      return (
        <View style={styles.checkboxContainer}>
          <Text style={[styles.checkbox, styles.checkedBox]}>✓</Text>
          <Text>SÍ</Text>
          <Text style={styles.checkbox}>☐</Text>
          <Text>NO</Text>
        </View>
      )
    } else if (value === "no") {
      return (
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkbox}>☐</Text>
          <Text>SÍ</Text>
          <Text style={[styles.checkbox, styles.checkedBox]}>✓</Text>
          <Text>NO</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkbox}>☐</Text>
          <Text>SÍ</Text>
          <Text style={styles.checkbox}>☐</Text>
          <Text>NO</Text>
        </View>
      )
    }
  }

  const renderSpecificConfig = () => {
    if (!specificConfig) return null

    let configText = ""
    if (specificConfig.tipoViga) {
      const tipos = Object.entries(specificConfig.tipoViga)
        .filter(([_, selected]) => selected)
        .map(([tipo, _]) => tipo.charAt(0).toUpperCase() + tipo.slice(1))
      configText = `Tipos de viga: ${tipos.join(", ")}`
    } else if (specificConfig.nivel && specificConfig.tipoBloque) {
      configText = `Nivel: ${specificConfig.nivel}, Tipo de bloque: ${specificConfig.tipoBloque}`
    } else if (specificConfig.nivel) {
      configText = `Nivel: ${specificConfig.nivel}`
    } else if (specificConfig.tipoFundacion) {
      configText = `Tipo de fundación: ${specificConfig.tipoFundacion.replace("-", " ")}`
    }

    if (configText) {
      return (
        <View style={{ marginBottom: 15, padding: 8, backgroundColor: "#f9f9f9" }}>
          <Text style={{ fontWeight: "bold", fontSize: 10 }}>Configuración específica:</Text>
          <Text style={{ marginTop: 3 }}>{configText}</Text>
        </View>
      )
    }
    return null
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyInfo}>Belén-Heredia, Costa Rica. T: +(506) 40 00 13 10</Text>
          <Text style={styles.title}>{reportTitle}</Text>
        </View>

        {/* Project Information */}
        <View style={styles.projectInfoContainer}>
          <View style={styles.projectInfoGrid}>
            <View style={styles.projectInfoItem}>
              <Text style={styles.projectInfoLabel}>Modelo:</Text>
              <Text style={styles.projectInfoValue}>{projectInfo.modelo || "_____________"}</Text>
            </View>
            <View style={styles.projectInfoItem}>
              <Text style={styles.projectInfoLabel}>Dirección:</Text>
              <Text style={styles.projectInfoValue}>{projectInfo.direccion || "_____________"}</Text>
            </View>
            <View style={styles.projectInfoItem}>
              <Text style={styles.projectInfoLabel}>Empresa:</Text>
              <Text style={styles.projectInfoValue}>{projectInfo.empresa || "_____________"}</Text>
            </View>
            <View style={styles.projectInfoItem}>
              <Text style={styles.projectInfoLabel}>Encargado:</Text>
              <Text style={styles.projectInfoValue}>{projectInfo.encargado || "_____________"}</Text>
            </View>
            <View style={styles.projectInfoItem}>
              <Text style={styles.projectInfoLabel}>Fecha:</Text>
              <Text style={styles.projectInfoValue}>{projectInfo.fecha || "_____________"}</Text>
            </View>
          </View>
        </View>

        {/* Specific Configuration */}
        {renderSpecificConfig()}

        {/* Checklist Table */}
        <Text style={styles.sectionTitle}>1) Puntos por revisar</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableColHeader1}>ITEM</Text>
            <Text style={styles.tableColHeader2}>DESCRIPCIÓN</Text>
            <Text style={styles.tableColHeader3}>ACEPTADO</Text>
            <Text style={styles.tableColHeader4}>OBSERVACIONES</Text>
          </View>
          {/* Table Rows */}
          {checklist.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={styles.tableCol1}>{item.id}</Text>
              <Text style={styles.tableCol2}>{item.descripcion}</Text>
              <View style={styles.tableCol3}>{renderCheckbox(item.aceptado)}</View>
              <Text style={styles.tableCol4}>{item.observaciones || ""}</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* Segunda página para sugerencias */}
      {suggestions.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.companyInfo}>Belén-Heredia, Costa Rica. T: +(506) 40 00 13 10</Text>
          </View>

          <Text style={styles.sectionTitle}>2) Sugerencias para tener en cuenta</Text>
          {suggestions.map((suggestion, index) => (
            <View key={suggestion.id} style={styles.suggestionItem}>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                {String.fromCharCode(97 + index)}) {suggestion.text}
              </Text>
              {suggestion.images.length > 0 && (
                <View style={styles.suggestionImages}>
                  {suggestion.images.map((image) => (
                    <View key={image.id}>
                      <PDFImage style={styles.suggestionImage} src={image.url} />
                      {image.description && <Text style={styles.imageDescription}>{image.description}</Text>}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </Page>
      )}

      {/* Tercera página para observaciones */}
      {observations.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.companyInfo}>Belén-Heredia, Costa Rica. T: +(506) 40 00 13 10</Text>
          </View>

          <Text style={styles.sectionTitle}>3) Observaciones</Text>
          {observations.map((observation, index) => (
            <View key={index} style={styles.observationItem}>
              <Text>
                {String.fromCharCode(97 + index)}. {observation}
              </Text>
            </View>
          ))}
        </Page>
      )}

      {/* Cuarta página para anexos */}
      {images.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.companyInfo}>Belén-Heredia, Costa Rica. T: +(506) 40 00 13 10</Text>
          </View>

          <Text style={styles.sectionTitle}>4) Anexos</Text>
          <View style={styles.attachmentGrid}>
            {images.map((image) => (
              <View key={image.id} style={styles.attachmentItem}>
                <PDFImage style={styles.attachmentImage} src={image.url} />
                <Text style={styles.attachmentTitle}>{image.title}</Text>
                {image.description && <Text style={styles.attachmentDescription}>{image.description}</Text>}
              </View>
            ))}
          </View>
        </Page>
      )}
    </Document>
  )
}

// Componente para el botón de descarga
interface PDFGeneratorProps {
  reportTitle: string
  projectInfo: ProjectInfo
  specificConfig?: any
  checklist: ChecklistItem[]
  suggestions: SuggestionWithImages[]
  observations: string[]
  images: ImageAttachment[]
  fileName?: string
  children: React.ReactNode
}

export function PDFGenerator({
  reportTitle,
  projectInfo,
  specificConfig,
  checklist,
  suggestions,
  observations,
  images,
  fileName,
  children,
}: PDFGeneratorProps) {
  const defaultFileName = `${reportTitle.replace(/\s+/g, "_")}_${projectInfo.modelo || "Reporte"}_${new Date().toISOString().split("T")[0]}.pdf`

  return (
    <PDFDownloadLink
      document={
        <ReportPDFDocument
          reportTitle={reportTitle}
          projectInfo={projectInfo}
          specificConfig={specificConfig}
          checklist={checklist}
          suggestions={suggestions}
          observations={observations}
          images={images}
        />
      }
      fileName={fileName || defaultFileName}
    >
      {({ blob, url, loading, error }) => {
        if (loading) return <div>Generando PDF...</div>
        if (error) return <div>Error al generar PDF</div>
        return children
      }}
    </PDFDownloadLink>
  )
}
