import React, { useEffect } from "react";
import { Dropdown, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getFilesList, getSelectedFile } from "../../store/files/selectors";
import { setSelectedFile } from "../../store/files/actions";
import { useQueryParams } from "../../hooks/useQueryParams";

function FilterBar() {
  const filesList = useSelector(getFilesList);
  const selectedFile = useSelector(getSelectedFile);
  const dispatch = useDispatch();
  const { getQueryParam, setQueryParam } = useQueryParams();

  // Sincronizar con query param al montar el componente
  useEffect(() => {
    const fileNameFromUrl = getQueryParam("fileName");
    if (fileNameFromUrl && fileNameFromUrl !== selectedFile) {
      dispatch(setSelectedFile(fileNameFromUrl));
    }
  }, [dispatch, getQueryParam, selectedFile]);

  // Manejar selección de archivo
  const handleFileSelect = (fileName) => {
    dispatch(setSelectedFile(fileName));
    setQueryParam("fileName", fileName);
  };

  // Obtener texto del dropdown
  const getDropdownText = () => {
    if (!selectedFile) {
      return "All files";
    }
    return selectedFile;
  };

  return (
    <Row className="mb-4">
      <Col>
        <div className="filter-bar-brand">
          <div className="d-flex align-items-center">
            <h5 className="mb-0 me-3">Filters:</h5>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-primary"
                id="file-filter-dropdown"
                className="btn-brand"
              >
                {getDropdownText()}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleFileSelect("")}
                  active={!selectedFile}
                >
                  All files
                </Dropdown.Item>
                {filesList.map((fileName) => (
                  <Dropdown.Item
                    key={fileName}
                    onClick={() => handleFileSelect(fileName)}
                    active={selectedFile === fileName}
                  >
                    {fileName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default FilterBar;
