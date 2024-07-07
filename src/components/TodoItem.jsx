import React, {useState} from "react"

function TodoItem({todo, onDelete, onToggle, onEdit}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [editDueDate, setEditDueDate] = useState(todo.dueDate)

  const handleEdit = () => {
    onEdit(todo.id, editText, editDueDate)
    setIsEditing(false)
  }

  return (
    <li className="flex items-center justify-between p-2 border-b">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow mr-2 p-1 border rounded"
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="mr-2 p-1 border rounded"
          />
          <button
            onClick={handleEdit}
            className="p-1 bg-green-500 text-white rounded"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center flex-grow">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="mr-2"
            />
            <span
              className={`flex-grow ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </span>
            {todo.dueDate && (
              <span className="text-sm text-gray-500 ml-2">
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 bg-yellow-500 text-white rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TodoItem
