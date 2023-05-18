import "../Styles/App.css";
import Form from "../Components/Form";
import TodoList from "../Components/TodoList";

function App() {
  return (
    <>
      <div className="pages">
        <h1 className="title"> To do your to do!</h1>
        <Form />
        <TodoList />
      </div>
    </>
  );
}

export default App;
