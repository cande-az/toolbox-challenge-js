/**
 * Transforma los datos de la API al formato esperado por los componentes
 * @param {Array} apiData - Datos de la API en formato [{file: string, lines: Array}]
 * @returns {Array} - Datos transformados en formato [{fileName: string, text: string, number: string, hex: string}]
 */
export function transformApiData (apiData) {
  if (!Array.isArray(apiData)) {
    return []
  }

  const transformedData = []

  apiData.forEach((fileData) => {
    if (fileData && fileData.file && Array.isArray(fileData.lines)) {
      fileData.lines.forEach((line) => {
        if (line && line.text && line.number && line.hex) {
          transformedData.push({
            fileName: fileData.file,
            text: line.text,
            number: line.number.toString(),
            hex: line.hex
          })
        }
      })
    }
  })

  return transformedData
}
