import React, { useState, useEffect } from 'react';
import './App.css';

//Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Background from "./components/Background";

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos]= useState([]);

  useEffect(() =>
  {
    getLocalTodos();
  }, []);

  useEffect(() =>
  {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () =>
  {
    switch(status)
    {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;

      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //Save to local storage
  const saveLocalTodos = () =>
  {
      localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () =>
  {
    if (localStorage.getItem("todos") === null)
    {
      localStorage.setItem("todos", JSON.stringify([]));
    }
    else
    {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>&#128221; Todo List! &#128221;</h1>
      </header>
      <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} setStatus={setStatus} />
      <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos} />  
      <Background />
    </div>
  );
}

export default App;