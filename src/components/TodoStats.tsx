import styled from "styled-components";
import { useTodos } from "../context/TodoContext";

const Bar = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  width: "100%",
  maxWidth: 600,
  marginTop: 16,
  color: "#cbd5e1",
  fontSize: 14,
});

const ClearButton = styled.button({
  padding: "6px 12px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: 6,
  background: "transparent",
  color: "#cbd5e1",
  fontSize: 14,
  cursor: "pointer",
  transition: "border-color 0.2s, color 0.2s",

  "&:hover": {
    borderColor: "#ef4444",
    color: "#ef4444",
  },
});

export function TodoStats() {
  const { activeCount, completedCount, clearCompleted } = useTodos();

  const activeLabel =
    activeCount === 1 ? "1 item left" : `${activeCount} items left`;

  return (
    <Bar>
      <span aria-live="polite">{activeLabel}</span>

      {completedCount > 0 && (
        <ClearButton type="button" onClick={clearCompleted}>
          Clear completed ({completedCount})
        </ClearButton>
      )}
    </Bar>
  );
}
