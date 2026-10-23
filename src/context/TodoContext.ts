import { createContext, useContext } from "react";
import type { Todo, TodoFilter } from "../types/todo";

export interface TodoContextValue {
  /** All todos, sorted (active first, then completed). */
  todos: Todo[];
  /** Todos after the active filter is applied. */
  visibleTodos: Todo[];
  filter: TodoFilter;
  activeCount: number;
  completedCount: number;
  setFilter: (filter: TodoFilter) => void;
  addTodo: (label: string) => void;
  toggleTodo: (id: string, checked: boolean) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, label: string) => void;
  clearCompleted: () => void;
}

export const TodoContext = createContext<TodoContextValue | null>(null);

export function useTodos(): TodoContextValue {
  const context = useContext(TodoContext);

  if (context === null) {
    throw new Error("useTodos must be used within <TodoProvider>");
  }

  return context;
}
