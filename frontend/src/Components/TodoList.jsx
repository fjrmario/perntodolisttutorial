import { useEffect, useState } from "react";
import { BASE_URL } from "../utilities";

import "../Styles/TodoList.css";
const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${BASE_URL}`);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, [todos]);
  return (
    <div>
      {todos.map((todo, index) => (
        <div
          key={index}
          className="card"
        >
          {todo.todo}
          <button class="material-icons-outlined">clear</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
