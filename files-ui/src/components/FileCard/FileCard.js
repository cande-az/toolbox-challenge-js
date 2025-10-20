import React from "react";

function FileCard({ data, index }) {
  return (
    <div
      className={`card mb-3 card-brand ${
        index % 2 === 0 ? "bg-white" : "bg-light"
      }`}
    >
      <div className="card-body p-3">
        <div className="row g-2">
          <div className="col-12">
            <small className="text-muted fw-bold">File Name</small>
            <div className="fw-normal">{data.fileName}</div>
          </div>
          <div className="col-6">
            <small className="text-muted fw-bold">Text</small>
            <div className="fw-normal">{data.text}</div>
          </div>
          <div className="col-6">
            <small className="text-muted fw-bold">Number</small>
            <div className="fw-normal">{data.number}</div>
          </div>
          <div className="col-12">
            <small className="text-muted fw-bold">Hex</small>
            <div className="fw-normal small text-break">{data.hex}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileCard;
