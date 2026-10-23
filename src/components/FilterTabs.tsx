import styled from "styled-components";
import { useTodos } from "../context/TodoContext";
import type { TodoFilter } from "../types/todo";

const Tabs = styled.nav({
  display: "flex",
  gap: 8,
  marginTop: 16,
});

const Tab = styled.button<{ $active: boolean }>(({ $active }) => ({
  padding: "8px 16px",
  borderRadius: 999,
  border: "1px solid transparent",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  background: $active ? "#2563eb" : "rgba(255, 255, 255, 0.12)",
  color: $active ? "#fff" : "#cbd5e1",
  transition: "background 0.2s, color 0.2s",

  "&:hover": {
    background: $active ? "#1d4ed8" : "rgba(255, 255, 255, 0.2)",
  },
}));

const FILTERS: ReadonlyArray<{ value: TodoFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export function FilterTabs() {
  const { filter, setFilter } = useTodos();

  return (
    <Tabs aria-label="Filter todos">
      {FILTERS.map(({ value, label }) => (
        <Tab
          key={value}
          type="button"
          $active={filter === value}
          aria-pressed={filter === value}
          onClick={() => setFilter(value)}
        >
          {label}
        </Tab>
      ))}
    </Tabs>
  );
}
