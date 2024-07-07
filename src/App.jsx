import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    console.log('Raw stored todos:', storedTodos);
    if (storedTodos) {
      try {
        const parsedTodos = JSON.parse(storedTodos);
        console.log('Parsed todos:', parsedTodos);
        setTodos(Array.isArray(parsedTodos) ? parsedTodos : []);
      } catch (error) {
        console.error('Error parsing todos:', error);
        setTodos([]);
      }
    } else {
      console.log('No todos in storage');
      setTodos([]);
    }
  }, []);

  useEffect(() => {
    console.log('Saving todos to storage:', todos);
    if (todos?.length) {
      localStorage.setItem('todos', JSON.stringify(todos)); // Ensure todos are correctly passed here
    }
  }, [todos]);

  const addTodo = (text, dueDate) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      dueDate
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id, newText, newDueDate) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, dueDate: newDueDate } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  }).filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTodos = [...filteredTodos].sort((a, b) =>
    new Date(a.dueDate) - new Date(b.dueDate)
  );

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <Header />
          <input
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <TodoList
            todos={sortedTodos}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onAdd={addTodo}
          />
          <Footer
            activeCount={todos.filter(todo => !todo.completed).length}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
