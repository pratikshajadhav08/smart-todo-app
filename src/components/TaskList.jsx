import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TaskItem from "./TaskItem";

function TaskList({ filteredTasks, handleDragEnd, ...props }) {
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredTasks.map(task => task.id)} // ✅ FIXED
        strategy={verticalListSortingStrategy}
      >
        <ul className="list-group">
          {filteredTasks.length === 0 && (
            <p className="text-center text-muted mt-3">
              No tasks found 😴
            </p>
          )}

          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              {...props}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export default TaskList;