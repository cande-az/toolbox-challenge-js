import React, { useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header/Header";
import FilterBar from "./components/FilterBar/FilterBar";
import FilesTable from "./components/FilesTable/FilesTable";
import FileCard from "./components/FileCard/FileCard";
import Loading from "./components/Loading/Loading";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ResultsCounter from "./components/ResultsCounter/ResultsCounter";
import { fetchFilesData, fetchFilesList } from "./services/filesService";
import { transformApiData } from "./utils/dataTransformer";
import {
  fetchFilesRequest,
  fetchFilesSuccess,
  fetchFilesFailure,
  fetchFilesListSuccess,
} from "./store/files/actions";
import {
  getFilesData,
  getLoading,
  getError,
  getSelectedFile,
} from "./store/files/selectors";
import { useQueryParams } from "./hooks/useQueryParams";
import "./styles/App.css";

function App() {
  const tableData = useSelector(getFilesData);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const selectedFile = useSelector(getSelectedFile);
  const dispatch = useDispatch();
  const { getQueryParam } = useQueryParams();

  const loadFilesList = useCallback(async () => {
    try {
      const filesList = await fetchFilesList();
      dispatch(fetchFilesListSuccess(filesList));
    } catch (err) {
      console.error("Error loading files list:", err);
    }
  }, [dispatch]);

  const loadData = useCallback(
    async (fileName = null) => {
      try {
        dispatch(fetchFilesRequest());
        const apiData = await fetchFilesData(fileName);
        const transformedData = transformApiData(apiData);
        dispatch(fetchFilesSuccess(transformedData));
      } catch (err) {
        dispatch(fetchFilesFailure(err.message));
      }
    },
    [dispatch]
  );

  // Cargar lista de archivos y datos iniciales
  useEffect(() => {
    loadFilesList();

    // Leer query param al cargar
    const fileNameFromUrl = getQueryParam("fileName");
    loadData(fileNameFromUrl);
  }, [getQueryParam, loadData, loadFilesList]);

  // Recargar datos cuando cambie el archivo seleccionado
  useEffect(() => {
    if (selectedFile !== undefined) {
      loadData(selectedFile || null);
    }
  }, [selectedFile, loadData]);

  const handleRetry = () => {
    loadData();
  };

  if (loading) {
    return (
      <div className="App">
        <Header />
        <Container className="py-5">
          <Loading />
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <Header />
        <Container className="py-5">
          <ErrorMessage error={error} onRetry={handleRetry} />
        </Container>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />

      <Container className="py-5">
        <FilterBar />

        <div className="d-none d-lg-block">
          <FilesTable data={tableData} />
        </div>

        <div className="d-lg-none">
          {tableData.length === 0 ? (
            <div className="text-center py-4">
              <div className="text-muted">No data available</div>
            </div>
          ) : (
            <>
              {tableData.map((row, index) => (
                <FileCard key={index} data={row} index={index} />
              ))}
              <ResultsCounter count={tableData.length} />
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
