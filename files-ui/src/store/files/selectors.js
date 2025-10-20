// Selectores para acceder al estado de archivos

// Selector base para obtener el estado de archivos
const getFilesState = (state) => state.files;

// Selectores específicos
export const getFilesData = (state) => getFilesState(state).data;
export const getLoading = (state) => getFilesState(state).loading;
export const getError = (state) => getFilesState(state).error;
export const getFilter = (state) => getFilesState(state).filter;
export const getFilesList = (state) => getFilesState(state).filesList;
export const getSelectedFile = (state) => getFilesState(state).selectedFile;

// Selector para datos filtrados (preparado para futuro uso)
export const getFilteredFiles = (state) => {
  const data = getFilesData(state);
  const filter = getFilter(state);

  if (!filter) {
    return data;
  }

  return data.filter((file) =>
    file.fileName.toLowerCase().includes(filter.toLowerCase())
  );
};
