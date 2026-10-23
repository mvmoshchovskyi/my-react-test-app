import styled from "styled-components";
import Header from "./components/Header";
import { AddInput } from "./components/AddInput";
import { FilterTabs } from "./components/FilterTabs";
import { TodoList } from "./components/TodoList";
import { TodoStats } from "./components/TodoStats";
import { TodoProvider } from "./context/TodoProvider";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
  padding: "24px",
});

function App() {
  return (
    <TodoProvider>
      <Header>Head Todo List</Header>
      <Wrapper>
        <AddInput />
        <FilterTabs />
        <TodoList />
        <TodoStats />
      </Wrapper>
    </TodoProvider>
  );
}

export default App;
