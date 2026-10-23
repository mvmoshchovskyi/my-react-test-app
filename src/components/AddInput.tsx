import { useState, type FormEvent } from "react";
import styled from "styled-components";
import { useTodos } from "../context/TodoContext";

const Form = styled.form({
  display: "flex",
  gap: 8,
  width: "100%",
  maxWidth: 600,
  minWidth: 300,
  marginTop: 20,
});

const Input = styled.input({
  flex: 1,
  minWidth: 0,
  border: "1px solid #d1d5db",
  padding: "12px 16px",
  outline: "none",
  borderRadius: 6,
  fontSize: 16,
  backgroundColor: "#fff",
  color: "#111827",
  transition: "border-color 0.2s, box-shadow 0.2s",

  "&:focus": {
    borderColor: "#2563eb",
    boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.15)",
  },

  "&::placeholder": {
    color: "#9ca3af",
  },
});

const AddButton = styled.button({
  padding: "12px 20px",
  border: "none",
  borderRadius: 6,
  background: "#2563eb",
  color: "#fff",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  transition: "background 0.2s, opacity 0.2s",

  "&:hover:not(:disabled)": {
    background: "#1d4ed8",
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export function AddInput() {
  const { addTodo } = useTodos();
  const [input, setInput] = useState("");

  const canSubmit = input.trim().length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    addTodo(input);
    setInput("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={input}
        maxLength={120}
        placeholder="Add a new todo item here"
        aria-label="New todo"
        onChange={(event) => setInput(event.target.value)}
      />
      <AddButton type="submit" disabled={!canSubmit}>
        Add
      </AddButton>
    </Form>
  );
}
