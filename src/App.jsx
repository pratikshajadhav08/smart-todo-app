import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import { arrayMove } from "@dnd-kit/sortable";
import "./index.css";
const App = () => {
  // ✅ TASK STATE
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ INPUT STATES
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  // ✅ FILTER + SEARCH
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // ✅ EDIT STATES
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("Low");
  const [editDueDate, setEditDueDate] = useState("");

  // ✅ SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ ADD TASK
  const addTask = () => {
    if (text.trim() === "") return;

    // 🚨 CHECK DUPLICATE
    const isDuplicate = tasks.some(
      (task) => task.text.toLowerCase().trim() === text.toLowerCase().trim(),
    );

    if (isDuplicate) {
      alert("⚠️ Task already exists!");
      return;
    }

    // 🚨 CHECK PAST DATE
    if (dueDate) {
      const selectedDate = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        alert("❌ You cannot select a past date!");
        return;
      }
    }

    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      dueDate,
    };

    setTasks([...tasks, newTask]);
    setText("");
    setDueDate("");
  };

  // ✅ DELETE
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ✅ TOGGLE COMPLETE
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // ✅ START EDIT
  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.text);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || "");
  };

  // ✅ SAVE EDIT
  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: editText,
              priority: editPriority,
              dueDate: editDueDate,
            }
          : task,
      ),
    );
    setEditId(null);
  };

  // ✅ OVERDUE CHECK
  const isOverdue = (date) => {
    if (!date) return false;
    return new Date(date) < new Date().setHours(0, 0, 0, 0);
  };

  // ✅ FILTER + SEARCH
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "Completed") return task.completed;
      if (filter === "Pending") return !task.completed;
      return true;
    })
    .filter((task) => task.text.toLowerCase().includes(search.toLowerCase()));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);

    const newTasks = arrayMove(tasks, oldIndex, newIndex);
    setTasks(newTasks);
  };
  return (
    <div className="app-bg min-vh-100 d-flex justify-content-center align-items-start py-5">
      {" "}
      <div className="container mt-5">
        <div className="card p-4 shadow">
          <h2 className="text-center mb-3">📝 Smart To-Do</h2>

          <TaskInput
            text={text}
            setText={setText}
            addTask={addTask}
            priority={priority}
            setPriority={setPriority}
            dueDate={dueDate}
            setDueDate={setDueDate}
          />

          <FilterBar filter={filter} setFilter={setFilter} />

          <input
            className="form-control mb-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search tasks..."
          />

          <TaskList
            filteredTasks={filteredTasks}
            handleDragEnd={handleDragEnd}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            startEdit={startEdit}
            editId={editId}
            editText={editText}
            setEditText={setEditText}
            saveEdit={saveEdit}
            editPriority={editPriority}
            setEditPriority={setEditPriority}
            editDueDate={editDueDate}
            setEditDueDate={setEditDueDate}
            isOverdue={isOverdue}
            setEditId={setEditId}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
