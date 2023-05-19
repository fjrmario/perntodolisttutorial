import { useEffect, useState } from "react";
import { BASE_URL } from "../utilities";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { Modal, Box, Typography, Button } from "@mui/material";

import "../Styles/TodoList.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState(null);

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

  const handleOpen = (id) => {
    setSelectedTodoId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${selectedTodoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: editedText }),
      });
      console.log(editedText);

      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === selectedTodoId ? { ...todo, todo: editedText } : todo
          )
        );
        console.log("Successfully updated the todo");
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos.filter((todo) => todo.id !== id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="card"
        >
          {todo.todo}
          <div className="transparent-button">
            <button onClick={() => handleOpen(todo.id)}>
              <EditIcon />
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                "& .MuiBackdrop-root": {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Edits
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                >
                  <form>
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                  </form>
                </Typography>
                <Button onClick={handleEdit}>Confirm Edit</Button>
              </Box>
            </Modal>
            <button onClick={() => handleDelete(todo.id)}>
              <ClearIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
