import styled from "styled-components";
import { useTodos } from "../context/TodoContext";
import { TodoItem } from "./TodoItem";
import type { TodoFilter } from "../types/todo";

const List = styled.ul({
  width: "100%",
  maxWidth: "600px",
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  listStyle: "none",
});

const Empty = styled.p({
  marginTop: 24,
  color: "#cbd5e1",
  textAlign: "center",
});

const EMPTY_MESSAGES: Record<TodoFilter, string> = {
  all: "No todos yet. Add your first one above.",
  active: "Nothing active left. Great job!",
  completed: "No completed todos yet.",
};

export function TodoList() {
  const { visibleTodos, filter, toggleTodo, deleteTodo, editTodo } = useTodos();

  if (visibleTodos.length === 0) {
    return <Empty>{EMPTY_MESSAGES[filter]}</Empty>;
  }

  return (
    <List>
      {visibleTodos.map((todo) => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </li>
      ))}
    </List>
  );
}
