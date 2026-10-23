import type { Todo, TodoFilter } from "../types/todo";

/**
 * Active todos first (newest created first),
 * then completed todos (oldest completion first).
 */
export function sortTodos(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    if (a.checked !== b.checked) {
      return Number(a.checked) - Number(b.checked);
    }

    if (!a.checked) {
      return b.created_at - a.created_at;
    }

    return (a.completed_at ?? 0) - (b.completed_at ?? 0);
  });
}

export function filterTodos(todos: Todo[], filter: TodoFilter): Todo[] {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.checked);
    case "completed":
      return todos.filter((todo) => todo.checked);
    default:
      return todos;
  }
}

export function countActive(todos: Todo[]): number {
  return todos.filter((todo) => !todo.checked).length;
}

export function countCompleted(todos: Todo[]): number {
  return todos.filter((todo) => todo.checked).length;
}
