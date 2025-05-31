import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

export default function Todo({ todo, toggleComplete, deleteTodo, startEdit }) {
  return (
    <div className="flex items-center justify-between bg-white p-3 border rounded shadow">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="w-4 h-4 accent-violet-700"
        />
        <span className={`text-lg ${todo.completed ? "line-through text-gray-400" : ""}`}>{todo.task}</span>
      </div>
      <div className="flex gap-2">
        <button onClick={startEdit} className="text-slate-500 hover:text-slate-700">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button onClick={() => deleteTodo(todo.id)} className="text-red-700 hover:text-red-700">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}