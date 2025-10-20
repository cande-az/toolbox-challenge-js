const externalApi = require("../config/externalApi");
const { parseCsvStrict } = require("../utils/csvParser");

async function getFilesList() {
  const { data } = await externalApi.get("/files");
  return data.files;
}

async function getFilesData(fileName = null) {
  let filesToProcess;

  if (
    fileName !== null &&
    (typeof fileName !== "string" || fileName.trim() === "")
  ) {
    throw new Error(`File '${fileName}' is invalid`);
  }

  try {
    const availableFiles = await getFilesList();

    if (fileName !== null && !availableFiles.includes(fileName)) {
      throw new Error(`File '${fileName}' not found in available files`);
    }

    filesToProcess = fileName ? [fileName] : availableFiles;
  } catch (error) {
    throw error;
  }

  // Esta variable se puede configurar para ajustar el tamaño de los batches, que es el número de archivos que se procesan en cada iteración. 
  // De esta forma se puede ajustar el rendimiento del API y se evita procesar todos los archivos a la vez.
  const BATCH_SIZE = 5;
  const allResults = [];

  for (let i = 0; i < filesToProcess.length; i += BATCH_SIZE) {
    const batch = filesToProcess.slice(i, i + BATCH_SIZE);

    const batchResults = await Promise.allSettled(
      batch.map(async (file) => {
        try {
          const { data } = await externalApi.get(`/file/${file}`, {
            responseType: "text",
            timeout: 5000,
          });
          const lines = await parseCsvStrict(data);
          return { file, lines };
        } catch (error) {
          console.warn(`Skipping file ${file} due to error:`, {
            status: error.response?.status,
            message: error.message,
            type: error.code,
          });
          return null;
        }
      })
    );

    allResults.push(...batchResults);
  }

  const successfulResults = allResults.map((r) => r.value).filter(Boolean);
  return successfulResults;
}
module.exports = { getFilesData, getFilesList };
