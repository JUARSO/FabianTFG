"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import type { ChecklistItem } from "@/types/report-types"

interface ChecklistFormProps {
  title: string
  items: ChecklistItem[]
  onChange: (items: ChecklistItem[]) => void
}

export function ChecklistForm({ title, items, onChange }: ChecklistFormProps) {
  const handleItemChange = (index: number, field: keyof ChecklistItem, value: any) => {
    const newItems = [...items]
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    }
    onChange(newItems)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-2 text-left">ITEM</th>
                <th className="border border-gray-300 p-2 text-left">DESCRIPCIÓN</th>
                <th className="border border-gray-300 p-2 text-center">ACEPTADO</th>
                <th className="border border-gray-300 p-2 text-left">OBSERVACIONES</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 p-2 text-center font-medium">{item.id}</td>
                  <td className="border border-gray-300 p-2">{item.descripcion}</td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex justify-center space-x-4">
                      <label className="flex items-center space-x-1">
                        <Checkbox
                          checked={item.aceptado === "si"}
                          onCheckedChange={(checked) => handleItemChange(index, "aceptado", checked ? "si" : "")}
                        />
                        <span>SÍ</span>
                      </label>
                      <label className="flex items-center space-x-1">
                        <Checkbox
                          checked={item.aceptado === "no"}
                          onCheckedChange={(checked) => handleItemChange(index, "aceptado", checked ? "no" : "")}
                        />
                        <span>NO</span>
                      </label>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <Textarea
                      value={item.observaciones}
                      onChange={(e) => handleItemChange(index, "observaciones", e.target.value)}
                      placeholder="Observaciones..."
                      className="min-h-[60px]"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
