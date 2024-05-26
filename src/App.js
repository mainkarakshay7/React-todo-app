import React, { useState } from "react";
import "./App.css";

function Todo({ todo, index, completeTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(index, value);
    setIsEditing(false); // Exit edit mode
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            className='input'
            defaultValue={todo.text}
            type='text'
            onChange={(e) => setValue(e.target.value)}
          />
          <button type='submit'>Save</button>
        </form>
      ) : (
        <div
          className='todo'
          style={{
            textDecoration: todo.isComplete ? "line-through" : "none",
          }}
        >
          {`${index}. ${todo.text}`}
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => completeTodo(index)}>Complete</button>
            <button onClick={() => deleteTodo(index)}>X</button>
          </div>
        </div>
      )}
    </>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    else addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='input'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type='text'
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { text: "Learn about React", isComplete: false },
    { text: "Meet friend for lunch", isComplete: false },
    { text: "Build really cool todo app", isComplete: false },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isComplete = true;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  const editTodo = (index, value) => {
    const newTodos = [...todos];
    newTodos[index].text = value;
    setTodos(newTodos);
  };

  return (
    <div className='app'>
      <div className='todo-list'>
        {todos.map((todo, index) => (
          <Todo
            todo={todo}
            index={index}
            key={index}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
