import React, { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim())
       return;
    addTodo(task.trim());
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        className="flex-1 p-2 border rounded"
        placeholder="What is the task for today?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-400">Add</button>
    </form>
  );
}