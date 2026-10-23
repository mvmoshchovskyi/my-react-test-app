export interface Todo {
  id: string;
  label: string;
  checked: boolean;
  created_at: number;
  completed_at: number | null;
}

export type TodoFilter = "all" | "active" | "completed";

export type TodoAction =
  | { type: "add"; todo: Todo }
  | { type: "toggle"; id: string; checked: boolean; completedAt: number | null }
  | { type: "delete"; id: string }
  | { type: "edit"; id: string; label: string }
  | { type: "clearCompleted" };
