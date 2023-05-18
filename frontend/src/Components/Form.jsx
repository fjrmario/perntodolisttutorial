import { useState, useRef } from "react";
import { BASE_URL } from "../utilities";

import "../Styles/Form.css";

function Form() {
  const [todo, setTodo] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!todo) {
      }
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo }),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        setTodo("");
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleClear = (event) => {
    setTodo("");
    inputRef.current.value = "";
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name={todo}
          onChange={handleChange}
          placeholder="What are you planning to do?"
          ref={inputRef}
        />
        <div className="btnContainer">
          <button type="submit">Add</button>
          <button
            type="button"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
