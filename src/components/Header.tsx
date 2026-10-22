import styled from "styled-components";

const HeaderWrapper = styled.header({
  position: "sticky",
  top: 0,
  zIndex: 10,
  width: "100%",
  height: 150,
  flexShrink: 0,
  fontSize: 60,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "grey",
});

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <HeaderWrapper>
      <h1>{children}</h1>
    </HeaderWrapper>
  );
}
