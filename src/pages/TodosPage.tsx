import styled from "styled-components";
import { AddInput } from "../components/AddInput";
import { FilterTabs } from "../components/FilterTabs";
import { TodoList } from "../components/TodoList";
import { TodoStats } from "../components/TodoStats";
import { TodoProvider } from "../context/TodoProvider";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
  padding: "24px",
});

export function TodosPage() {
  return (
    <TodoProvider>
      <Wrapper>
        <AddInput />
        <FilterTabs />
        <TodoList />
        <TodoStats />
      </Wrapper>
    </TodoProvider>
  );
}
