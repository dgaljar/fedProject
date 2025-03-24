import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  
  if (totalPages <= 1) return null; // Hide pagination if there's only one page

  const pages = [];

  // Always show the first page
  pages.push(
    <button
      key={1}
      className={`btn ${currentPage === 1 ? "active" : ""}`}
      onClick={() => onPageChange(1)}
    >
      1
    </button>
  );

  if (currentPage > 3)
    pages.push(
      <span className="ellipsis" key="left-ellipsis">
        ...
      </span>
    );

  // Show current page +/- one page
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(
      <button
        key={i}
        className={`btn ${currentPage === i ? "active" : ""}`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  if (currentPage < totalPages - 2)
    pages.push(
      <span className="ellipsis" key="right-ellipsis">
        ...
      </span>
    );

  // Always show the last page
  if (totalPages > 1) {
    pages.push(
      <button
        key={totalPages}
        className={`btn ${currentPage === totalPages ? "active" : ""}`}
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </button>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-center mb-4 pb-4 gap-2">
      <button
        className="btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pages}

      <button
        className="btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

// Prop validation for better debugging
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;