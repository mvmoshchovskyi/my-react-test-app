import { useState, useCallback } from "react";
import { v4 as uuid } from "uuid";
import Header from "./components/Header";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";
import { AddInput } from "./components/AddInput";
import styled from "styled-components";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
  padding: "24px",
});

/**
 * This is the initial todo state.
 * Instead of loading this data on every reload,
 * we should save the todo state to local storage,
 * and restore on page load. This will give us
 * persistent storage.
 */
const initialData: Todo[] = [
  {
    id: uuid(),
    label: "Buy groceries",
    checked: false,
    created_at: Date.now(),
    completed_at: null,
  },
  {
    id: uuid(),
    label: "Reboot computer",
    checked: false,
    created_at: Date.now() - 1000,
    completed_at: null,
  },
  {
    id: uuid(),
    label: "Ace CoderPad interview",
    checked: true,
    created_at: Date.now() - 2000,
    completed_at: Date.now() - 500,
  },
];
function App() {
  const [todos, setTodos] = useState<Todo[]>(initialData);

  const addTodo = (label: string) => {
    const newTodo = {
      id: uuid(),
      label,
      checked: false,
      created_at: Date.now(),
      completed_at: Date.now() - 500,
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  return (
    <>
      <Header>Head Todo List</Header>
      <Wrapper>
        <AddInput onAdd={addTodo} />
        <TodoList>
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </TodoList>
      </Wrapper>
    </>
  );
}

export default App;
