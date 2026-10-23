import {
  memo,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import styled from "styled-components";
import type { Todo } from "../types/todo";

const Wrapper = styled.div({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 4,
  padding: 16,
  background: "white",
  fontWeight: 400,
  fontSize: 14,
  cursor: "pointer",

  "&:hover button, &:focus-within button": {
    opacity: 1,
  },
});

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
  cursor: "pointer",
  flexShrink: 0,
});

const Label = styled.span<{ $checked: boolean }>(({ $checked }) => ({
  textDecoration: $checked ? "line-through" : "none",
  color: $checked ? "#6b7280" : "#111827",
  fontSize: 20,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const EditInput = styled.input({
  flex: 1,
  minWidth: 0,
  fontSize: 20,
  padding: "2px 6px",
  border: "1px solid #2563eb",
  borderRadius: 4,
  outline: "none",
});

const DeleteButton = styled.button({
  marginLeft: "auto",
  opacity: 0,
  cursor: "pointer",
  border: "none",
  background: "transparent",
  color: "#ef4444",
  fontSize: 20,
  lineHeight: 1,
  padding: "0 4px",
  transition: "opacity 0.2s",
});

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, checked: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, label: string) => void;
}

export const TodoItem = memo(function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.label);

  const toggleTimer = useRef<number | null>(null);
  const skipBlurCommit = useRef(false);

  useEffect(() => {
    return () => {
      if (toggleTimer.current !== null) {
        window.clearTimeout(toggleTimer.current);
      }
    };
  }, []);

  const clearToggleTimer = () => {
    if (toggleTimer.current !== null) {
      window.clearTimeout(toggleTimer.current);
      toggleTimer.current = null;
    }
  };

  const startEditing = () => {
    clearToggleTimer();
    skipBlurCommit.current = false;
    setDraft(todo.label);
    setIsEditing(true);
  };

  const commit = () => {
    const next = draft.trim();
    if (next && next !== todo.label) {
      onEdit(todo.id, next);
    }
    setIsEditing(false);
  };

  const cancel = () => {
    skipBlurCommit.current = true;
    setDraft(todo.label);
    setIsEditing(false);
  };

  const handleBlur = () => {
    if (skipBlurCommit.current) {
      skipBlurCommit.current = false;
      return;
    }
    commit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commit();
    } else if (event.key === "Escape") {
      event.preventDefault();
      cancel();
    }
  };

  const handleRowClick = (event: MouseEvent<HTMLDivElement>) => {
    if (isEditing) return;

    const target = event.target as HTMLElement;
    if (target.closest("button, input")) return;

    // A second click belongs to a double-click: cancel the pending toggle
    // so that double-clicking to edit does not change the checked state.
    if (toggleTimer.current !== null) {
      clearToggleTimer();
      return;
    }

    toggleTimer.current = window.setTimeout(() => {
      toggleTimer.current = null;
      onToggle(todo.id, !todo.checked);
    }, 180);
  };

  const handleRowDoubleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (isEditing) return;

    const target = event.target as HTMLElement;
    if (target.closest("button, input")) return;

    startEditing();
  };

  return (
    <Wrapper onClick={handleRowClick} onDoubleClick={handleRowDoubleClick}>
      <Checkbox
        type="checkbox"
        id={`todo-${todo.id}`}
        checked={todo.checked}
        aria-label={`Mark "${todo.label}" as ${todo.checked ? "active" : "completed"}`}
        onChange={(event) => onToggle(todo.id, event.target.checked)}
      />

      {isEditing ? (
        <EditInput
          autoFocus
          value={draft}
          aria-label={`Edit "${todo.label}"`}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Label $checked={todo.checked} title="Double-click to edit">
          {todo.label}
        </Label>
      )}

      {!isEditing && (
        <DeleteButton
          type="button"
          aria-label={`Delete "${todo.label}"`}
          onClick={(event) => {
            event.stopPropagation();
            onDelete(todo.id);
          }}
        >
          ×
        </DeleteButton>
      )}
    </Wrapper>
  );
});
