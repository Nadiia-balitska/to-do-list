import { useState } from "react";
import s from "../TodoList/TodoList.module.css";
import { nanoid } from "nanoid";
import { TodoItem } from "./TodoItem";
import todosData from "../assets/todos.json";

export const TodoList = () => {
  const [todos, setTodos] = useState(todosData);
  const [newTodoText, setNewTodoText] = useState("");
  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id != id));
  };

  const handleAddTodo = () => {
    setTodos((prev) => [
      ...prev,
      { id: nanoid, title: newTodoText, completed: false },
    ]);
  };

  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleEditTodo = (id) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, todo: prompt("enter new title") } : item
      )
    );
  };

  return (
    <>
      <div className="flex">
        <input
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          className={s.input}
        />
        <button onClick={handleAddTodo} className="btn border">
          Add
        </button>
        <button onClick={handleEditTodo} className="btn border">
          Edit
        </button>
      </div>
      <ul className={s.list}>
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            {...item}
            handleToggleTodo={handleToggleTodo}
            handleDeleteTodo={handleDeleteTodo}
            handleEditTodo={handleEditTodo}
          />
        ))}
      </ul>
    </>
  );
};
