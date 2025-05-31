import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import EditTodoForm from "./EditTodoForm";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

export default function TodoWrapper() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortOrd, setSortOrd] = useState(true);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    if (!task.trim()) return;
    setTodos([...todos, { 
       id: uuidv4(),
       task, 
       createdAt:new Date().toISOString(),
       completed: false }]);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newTask) => {
    if (!newTask.trim()) 
      return;
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, task: newTask } : todo
    ));
    setEditId(null);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    
    const compare = new Date(b.createdAt) - new Date(a.createdAt);
    return sortOrd ? compare : -compare; 
  });

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">To-Do List</h1>
      <TodoForm addTodo={addTodo} />

      <div className="flex justify-between my-4">
        <div className="space-x-2">
          <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded ${filter === "all" ? "bg-violet-500 text-white" : "bg-gray-200"}`}>All</button>
          <button onClick={() => setFilter("active")} className={`px-3 py-1 rounded ${filter === "active" ? "bg-violet-500 text-white" : "bg-gray-200"}`}>Active</button>
          <button onClick={() => setFilter("completed")} className={`px-3 py-1 rounded ${filter === "completed" ? "bg-violet-500 text-white" : "bg-gray-200"}`}>Completed</button>
        </div>
        <button onClick={() => setSortOrd(!sortOrd)} className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400">
           {sortOrd ? "Latest" : "Oldest"}
        </button>
      </div>

      <div className="space-y-2">
        {sortedTodos.map(todo =>
          editId === todo.id ? (
            <EditTodoForm key={todo.id} todo={todo} editTodo={editTodo} cancelEdit={() => setEditId(null)} />
          ) : (
            <Todo
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              startEdit={() => setEditId(todo.id)}
            />
          )
        )}
      </div>
    </div>
  );
}
