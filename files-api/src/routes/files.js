const express = require("express");
const router = express.Router();
const filesController = require("../controllers/filesController");

/**
 * @swagger
 * /files/data:
 *   get:
 *     summary: Obtiene datos procesados de archivos CSV
 *     description: Retorna los datos de todos los archivos CSV o de un archivo específico
 *     tags: [Files]
 *     parameters:
 *       - in: query
 *         name: fileName
 *         schema:
 *           type: string
 *         description: Nombre del archivo específico a procesar (opcional)
 *         example: test1.csv
 *     responses:
 *       200:
 *         description: Datos procesados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   file:
 *                     type: string
 *                     example: test1.csv
 *                   lines:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         text:
 *                           type: string
 *                           example: "RgTya"
 *                         number:
 *                           type: integer
 *                           example: 64075909
 *                         hex:
 *                           type: string
 *                           example: "70ad29aacf0b690b0467fe2b2767f765"
 *       500:
 *         description: Error interno del servidor
 */
router.get("/data", filesController.getFilesData);

/**
 * @swagger
 * /files/list:
 *   get:
 *     summary: Obtiene lista de archivos disponibles
 *     description: Retorna la lista de archivos CSV disponibles en la API externa
 *     tags: [Files]
 *     responses:
 *       200:
 *         description: Lista de archivos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 files:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["test1.csv", "test2.csv", "test3.csv"]
 *       500:
 *         description: Error interno del servidor
 */
router.get("/list", filesController.getFilesList);

module.exports = router;
