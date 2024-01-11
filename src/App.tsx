import AddTodo from "./component/AddTodo";
import Navbar from "./component/Navbar";
import Todos from "./component/Todos";

const App = () => {
  return (
    <div className="mainDiv">
      <h1>TODO REACT + TYPESCRIPT</h1>
      <Navbar />
      <AddTodo />
      <Todos />
    </div>
  );
};

export default App;
