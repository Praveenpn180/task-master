import React, {useState} from "react"
import TodoItem from "./TodoItem"

function TodoList({todos, onDelete, onToggle, onEdit, onAdd}) {
  const [newTodo, setNewTodo] = useState("")
  const [newDueDate, setNewDueDate] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    onAdd(newTodo, newDueDate)
    setNewTodo("")
    setNewDueDate("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className="w-full p-2 mb-2 border rounded"
          aria-label="New todo text"
        />
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          aria-label="Due date"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList
