import { type FC, useState } from "react";
import styled from "styled-components";

const Form = styled.form({
  minWidth: "300px",
  marginTop: '20px',
});

const Input = styled.input({
  width: "100%",
  border: "1px solid #d1d5db",
  padding: "12px 16px",
  outline: "none",
  borderRadius: 6,
  marginBottom: 8,
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

export interface AddInputProps {
  onAdd: (label: string) => void;
}

export const AddInput: FC<AddInputProps> = ({ onAdd }) => {
  const [input, setInput] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(input);
        setInput("");
      }}
    >
      <Input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Add a new todo item here"
      />
    </Form>
  );
};
