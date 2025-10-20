import React from "react";
import { Alert } from "react-bootstrap";

function ErrorMessage({ error, onRetry }) {
  return (
    <div className="py-4">
      <Alert variant="danger" className="text-center alert-brand">
        <Alert.Heading>Error loading data</Alert.Heading>
        <p className="mb-3">{error}</p>
        {onRetry && (
          <button className="btn btn-outline-danger btn-sm" onClick={onRetry}>
            Try Again
          </button>
        )}
      </Alert>
    </div>
  );
}

export default ErrorMessage;
