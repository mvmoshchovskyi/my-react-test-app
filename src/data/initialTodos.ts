import type { Todo } from "../types/todo";

const now = Date.now();

/**
 * Demo data used on the first visit only. Fixed ids keep the data stable
 * if the demo list is ever re-seeded.
 */
export const initialTodos: Todo[] = [
  {
    id: "demo-1",
    label: "Buy groceries",
    checked: false,
    created_at: now,
    completed_at: null,
  },
  {
    id: "demo-2",
    label: "Reboot computer",
    checked: false,
    created_at: now - 1000,
    completed_at: null,
  },
  {
    id: "demo-3",
    label: "Ace CoderPad interview",
    checked: true,
    created_at: now - 2000,
    completed_at: now - 500,
  },
];
