import React from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="text-center">
        <Spinner
          animation="border"
          role="status"
          className="mb-3 spinner-brand"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <div className="text-muted">Loading files data...</div>
      </div>
    </div>
  );
}

export default Loading;
