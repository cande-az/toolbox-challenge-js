import React from "react";

function Header() {
  return (
    <header className="header-gradient text-white text-center py-4 mb-4">
      <div className="container">
        <div className="d-flex align-items-center justify-content-center mb-2">
          <span className="fs-1 me-3">📁</span>
          <h1 className="mb-0 fw-bold">React Test App</h1>
        </div>
        <p className="mb-0 opacity-75 fs-5">Manage and filter your CSV files</p>
      </div>
    </header>
  );
}

export default Header;
