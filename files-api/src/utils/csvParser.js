const csv = require("csv-parser");
const { Readable } = require("stream");

/**
 * Valida si un string representa un número entero válido
 * @function isValidNumber
 * @param {string} num - String a validar
 * @returns {boolean} true si es un número entero válido
 * @example
 * isValidNumber("123"); // true
 * isValidNumber("abc"); // false
 * isValidNumber("12.5"); // false
 */
function isValidNumber(num) {
  return /^-?\d+$/.test(num);
}

/**
 * Valida si un string representa un hexadecimal de 32 caracteres
 * @function isValidHex32
 * @param {string} hex - String a validar
 * @returns {boolean} true si es un hex de 32 caracteres válido
 * @example
 * isValidHex32("70ad29aacf0b690b0467fe2b2767f765"); // true
 * isValidHex32("abc123"); // false
 */
function isValidHex32(hex) {
  return /^[0-9a-fA-F]{32}$/.test(hex);
}

/**
 * Parsea un texto CSV de manera estricta, validando formato y datos
 * @async
 * @function parseCsvStrict
 * @param {string} csvText - Texto CSV a parsear
 * @returns {Promise<Array>} Array de objetos con estructura {text: string, number: number, hex: string}
 * @throws {Error} Si hay error en el parsing del CSV
 * @example
 * const csvData = "file,text,number,hex\nfile1.csv,test,123,70ad29aacf0b690b0467fe2b2767f765";
 * const result = await parseCsvStrict(csvData);
 * => result: [{text: "test", number: 123, hex: "70ad29aacf0b690b0467fe2b2767f765"}]
 */
function parseCsvStrict(csvText) {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = Readable.from([csvText]);

    stream
      .pipe(csv())
      .on("data", (row) => {
        // Validar que tenga todas las columnas requeridas
        if (row.file && row.text && row.number && row.hex) {
          // Validar formato de number y hex
          if (isValidNumber(row.number) && isValidHex32(row.hex)) {
            results.push({
              text: row.text,
              number: Number(row.number),
              hex: row.hex,
            });
          }
        }
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

// Funcion escrita manualmente como alternativa inicial, antes de usar csv-parser
function parseCsvStrictSync(csvText) {
  const lines = csvText.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  const header = lines[0].trim();
  if (header.toLowerCase() !== "file,text,number,hex") return [];

  return lines
    .slice(1) // Removemos la primera linea (header)
    .map((line) => line.split(","))
    .filter(
      (cols) =>
        cols.length === 4 && isValidNumber(cols[2]) && isValidHex32(cols[3]) // Validamos que tenga todas las columnas requeridas y que el number y hex sean validos
    )
    .map(([file, text, number, hex]) => ({
      text, // text
      number: Number(number), // number
      hex, // hex
    }));
}

module.exports = { parseCsvStrict };
