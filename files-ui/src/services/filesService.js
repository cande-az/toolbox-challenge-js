import axios from 'axios'
import { API_BASE_URL } from '../config/api'

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos timeout
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * Obtiene los datos procesados de archivos CSV
 * @param {string|null} fileName - Nombre del archivo específico (opcional)
 * @returns {Promise<Array>} - Datos de archivos procesados
 */
export async function fetchFilesData (fileName = null) {
  try {
    const params = fileName ? { fileName } : {}
    const response = await apiClient.get('/files/data', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching files data:', error)
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        'Failed to fetch files data'
    )
  }
}

/**
 * Obtiene la lista de archivos disponibles
 * @returns {Promise<Array>} - Lista de nombres de archivos
 */
export async function fetchFilesList () {
  try {
    const response = await apiClient.get('/files/list')
    return response.data.files
  } catch (error) {
    console.error('Error fetching files list:', error)
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        'Failed to fetch files list'
    )
  }
}
