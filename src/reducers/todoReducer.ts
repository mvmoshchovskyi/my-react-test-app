import type { Todo, TodoAction } from "../types/todo";

/**
 * Pure reducer: timestamps and ids are created by the caller and travel
 * inside the action, so the same state + action always produce the same result.
 */
export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "add": {
      const label = action.todo.label.trim();
      if (!label) return state;
      return [{ ...action.todo, label }, ...state];
    }

    case "toggle": {
      const current = state.find((todo) => todo.id === action.id);
      if (!current || current.checked === action.checked) return state;

      return state.map((todo) =>
        todo.id === action.id
          ? {
              ...todo,
              checked: action.checked,
              completed_at: action.completedAt,
            }
          : todo,
      );
    }

    case "delete": {
      if (!state.some((todo) => todo.id === action.id)) return state;
      return state.filter((todo) => todo.id !== action.id);
    }

    case "edit": {
      const label = action.label.trim();
      if (!label) return state;

      const target = state.find((todo) => todo.id === action.id);
      if (!target || target.label === label) return state;

      return state.map((todo) =>
        todo.id === action.id ? { ...todo, label } : todo,
      );
    }

    case "clearCompleted": {
      if (!state.some((todo) => todo.checked)) return state;
      return state.filter((todo) => !todo.checked);
    }

    default: {
      const exhaustive: never = action;
      return exhaustive;
    }
  }
}
