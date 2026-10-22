import { useState, useCallback, useEffect } from "react";
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

const Text = styled.p({
  color: "red",
  textAlign: "center",
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
  const [todos, setTodos] = useState<Todo[]>(() => {
  const saved = localStorage.getItem("todos");

  if (saved === null) return initialData;

  const parsed: Todo[] = JSON.parse(saved);

  return parsed.length > 0 ? parsed : initialData;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((label: string) => {
    const newTodo = {
      id: uuid(),
      label,
      checked: false,
      created_at: Date.now(),
      completed_at: Date.now() - 500,
    };

    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  const sortTodos = (todos: Todo[]): Todo[] => {
    return [...todos].sort((a, b) => {
      if (a.checked !== b.checked) {
        return Number(a.checked) - Number(b.checked);
      }

      if (!a.checked) {
        // Active: newest first
        return b.created_at - a.created_at;
      }

      // Completed: oldest completion first
      return a.completed_at! - b.completed_at!;
    });
  };

  const handleChecked = useCallback((checked: boolean, id: string) => {
    setTodos((prev) =>
      sortTodos(
        prev.map((todo) =>
          todo.id === id
            ? { ...todo, checked, completed_at: checked ? Date.now() : null }
            : todo,
        ),
      ),
    );
  }, []);

  const onDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <Header>Head Todo List</Header>
      <Wrapper>
        <AddInput onAdd={addTodo} />
        <TodoList>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                onChecked={handleChecked}
                onDelete={onDelete}
              />
            ))
          ) : (
            <Text>no available todos </Text>
          )}
        </TodoList>
      </Wrapper>
    </>
  );
}

export default App;
