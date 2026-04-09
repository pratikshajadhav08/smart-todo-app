import React from "react";
import { FaPlus } from "react-icons/fa";

function TaskInput({
  text,
  setText,
  addTask,
  priority,
  setPriority,
  dueDate,
  setDueDate,
}) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="card p-3 shadow-sm mb-3 rounded-4">
      <div className="row g-2">
        {/* TASK INPUT */}
        <div className="col-md-4">
          <input
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="✍️ Enter your task..."
          />
        </div>

        {/* PRIORITY */}
        <div className="col-md-2">
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟡 Medium</option>
            <option value="High">🔴 High</option>
          </select>
        </div>

        {/* DATE */}
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <div className="col-md-3 d-grid">
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
            onClick={addTask}
            disabled={!text.trim()}
          >
            <FaPlus />
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskInput;