import React from "react";
import { FaList, FaCheckCircle, FaClock } from "react-icons/fa";

function FilterBar({ filter, setFilter }) {
  return (
    <div className="d-flex justify-content-center gap-3 mb-3 flex-wrap">
      
      {/* ALL */}
      <button
        className={`btn d-flex align-items-center gap-2 ${
          filter === "All" ? "btn-dark" : "btn-outline-dark"
        }`}
        onClick={() => setFilter("All")}
      >
        <FaList />
        All
      </button>

      {/* COMPLETED */}
      <button
        className={`btn d-flex align-items-center gap-2 ${
          filter === "Completed" ? "btn-success" : "btn-outline-success"
        }`}
        onClick={() => setFilter("Completed")}
      >
        <FaCheckCircle />
        Completed
      </button>

      {/* PENDING */}
      <button
        className={`btn d-flex align-items-center gap-2 ${
          filter === "Pending" ? "btn-warning" : "btn-outline-warning"
        }`}
        onClick={() => setFilter("Pending")}
      >
        <FaClock />
        Pending
      </button>

    </div>
  );
}

export default FilterBar;