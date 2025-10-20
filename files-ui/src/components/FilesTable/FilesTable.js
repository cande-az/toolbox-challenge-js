import React from "react";
import { Table, Alert } from "react-bootstrap";
import ResultsCounter from "../ResultsCounter/ResultsCounter";

function FilesTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <Alert variant="info" className="text-center">
        <Alert.Heading>No data available</Alert.Heading>
        <p>No files data found. Please try again later.</p>
      </Alert>
    );
  }

  return (
    <div className="table-responsive">
      <Table striped bordered hover className="table-brand mb-0">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.fileName}</td>
              <td>{row.text}</td>
              <td>{row.number}</td>
              <td>{row.hex}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ResultsCounter count={data.length} />
    </div>
  );
}

export default FilesTable;
