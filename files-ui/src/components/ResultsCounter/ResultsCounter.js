import React from "react";

function ResultsCounter({ count, totalCount = null, filtered = false }) {
  const getDisplayText = () => {
    if (count === 0) {
      return "No results found";
    }

    if (filtered && totalCount !== null) {
      return `Showing ${count} of ${totalCount} results`;
    }

    return `Showing ${count} result${count !== 1 ? "s" : ""}`;
  };

  return (
    <div className="results-counter mt-3">
      <span className="text-muted">
        <i className="bi bi-list-ul me-1"></i>
        {getDisplayText()}
      </span>
    </div>
  );
}

export default ResultsCounter;
