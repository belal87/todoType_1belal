import React from "react";
import { useTodos } from "../store/Todos";
import { useSearchParams } from "react-router-dom";

const Todos = () => {
  const { todos, CompletedToggleToods, DeleteTodos } = useTodos();
  const [searchParams] = useSearchParams();
  const todosData = searchParams.get("todo");

  let filterTodos = todos;

  if (todosData === "active") {
    filterTodos = filterTodos.filter((task) => !task.completed);
  }
  if (todosData === "completed") {
    filterTodos = filterTodos.filter((task) => task.completed);
  }

  return (
    <div className="ULclass">
      <ul>
        {filterTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                id={todo.id}
                checked={todo.completed}
                onChange={() => CompletedToggleToods(todo.id)}
              />
              <label htmlFor={todo.id}>{todo.task}</label>
              {todo.completed && (
                <button type="button" onClick={() => DeleteTodos(todo.id)}>
                  Delete
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todos;
