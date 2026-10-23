import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { v4 as uuid } from "uuid";
import { TodoContext, type TodoContextValue } from "./TodoContext";
import { todoReducer } from "../reducers/todoReducer";
import { initialTodos } from "../data/initialTodos";
import { readJSON, writeJSON } from "../utils/storage";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  countActive,
  countCompleted,
  filterTodos,
  sortTodos,
} from "../utils/todo";
import type { Todo, TodoFilter } from "../types/todo";

const TODOS_KEY = "todos";
const FILTER_KEY = "todo-filter";

function loadTodos(fallback: Todo[]): Todo[] {
  const stored = readJSON<unknown>(TODOS_KEY, fallback);
  return Array.isArray(stored) ? (stored as Todo[]) : fallback;
}

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos, loadTodos);
  const [filter, setFilter] = useLocalStorage<TodoFilter>(FILTER_KEY, "all");

  useEffect(() => {
    writeJSON(TODOS_KEY, todos);
  }, [todos]);

  // Handlers are stable, so memoized items only re-render when their own
  // todo object changes.
  const addTodo = useCallback((label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return;

    dispatch({
      type: "add",
      todo: {
        id: uuid(),
        label: trimmed,
        checked: false,
        created_at: Date.now(),
        completed_at: null,
      },
    });
  }, []);

  const toggleTodo = useCallback((id: string, checked: boolean) => {
    dispatch({
      type: "toggle",
      id,
      checked,
      completedAt: checked ? Date.now() : null,
    });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: "delete", id });
  }, []);

  const editTodo = useCallback((id: string, label: string) => {
    dispatch({ type: "edit", id, label });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: "clearCompleted" });
  }, []);

  const sortedTodos = useMemo(() => sortTodos(todos), [todos]);

  const value = useMemo<TodoContextValue>(
    () => ({
      todos: sortedTodos,
      visibleTodos: filterTodos(sortedTodos, filter),
      filter,
      activeCount: countActive(todos),
      completedCount: countCompleted(todos),
      setFilter,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      clearCompleted,
    }),
    [
      sortedTodos,
      todos,
      filter,
      setFilter,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      clearCompleted,
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
