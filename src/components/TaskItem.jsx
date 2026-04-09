import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaTimes,
  FaGripVertical,
} from "react-icons/fa";

function TaskItem({
  task,
  toggleTask,
  deleteTask,
  startEdit,
  editId,
  editText,
  setEditText,
  saveEdit,
  editPriority,
  setEditPriority,
  editDueDate,
  setEditDueDate,
  isOverdue,
  setEditId,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`list-group-item d-flex justify-content-between align-items-center mb-2 ${
        task.completed ? "text-decoration-line-through text-muted" : ""
      } ${isOverdue(task.dueDate) ? "border border-danger" : ""}`}
    >
      {editId === task.id ? (
        <div className="d-flex gap-2 w-100 align-items-center">
          <input
            className="form-control"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <select
            className="form-select"
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            className="form-control"
            value={editDueDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setEditDueDate(e.target.value)}
          />

          {/* SAVE */}
          <button
            className="btn btn-success btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              saveEdit(task.id);
            }}
          >
            <FaCheckCircle />
          </button>

          {/* CANCEL */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              setEditId(null);
            }}
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        <>
          {/* LEFT SIDE */}
          <div
            className="d-flex align-items-center gap-2"
            onClick={() => toggleTask(task.id)}
          >
            {/* DRAG ICON */}
            <span
              {...attributes}
              {...listeners}
              style={{ cursor: "grab" }}
            >
              <FaGripVertical />
            </span>

            {/* TASK TEXT */}
            <div>
              {task.completed && (
                <FaCheckCircle className="text-success me-1" />
              )}
              {task.text}

              <span
                className={`badge ms-2 ${
                  task.priority === "High"
                    ? "bg-danger"
                    : task.priority === "Medium"
                    ? "bg-warning text-dark"
                    : "bg-success"
                }`}
              >
                {task.priority}
              </span>

              {task.dueDate && (
                <div>
                  <small
                    className={
                      isOverdue(task.dueDate)
                        ? "text-danger fw-bold"
                        : "text-muted"
                    }
                  >
                    📅 {task.dueDate}
                  </small>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE BUTTONS */}
          <div>
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={(e) => {
                e.stopPropagation();
                startEdit(task);
              }}
            >
              <FaEdit />
            </button>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}
            >
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;