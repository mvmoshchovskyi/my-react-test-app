import type { FC } from "react";
import styled from "styled-components";

const Wrapper = styled.label({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  background: "white",
  fontWeight: "400",
  fontSize: 14,
  cursor: "pointer",

    "&:hover button": {
    opacity: 1,
  },
});

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  fontSize: 20,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
});

export interface TodoItemProps {
  id: string;
  label: string;
  checked?: boolean;
  onChecked: (checked: boolean, id: string) => void;
  onDelete?: (id: string) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  id,
  label,
  checked = false,
  onChecked,
  onDelete
}) => {
  return (
    <Wrapper>
      <Checkbox
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChecked(e.target.checked, id)}
      />
      <Label checked={checked}>{label}</Label>
    </Wrapper>
  );
}
