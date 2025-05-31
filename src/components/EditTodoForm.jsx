import React, { useState } from "react";

export default function EditTodoForm({ todo, editTodo, cancelEdit }) {
  const [value, setValue] = useState(todo.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) 
      return;
    editTodo(todo.id, value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        className="flex-1 p-2 border rounded"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-violet-400">Save</button>
      <button onClick={cancelEdit} type="button" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
    </form>
  );
}