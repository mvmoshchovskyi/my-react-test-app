import { Link } from "react-router";
import styled from "styled-components";

const Wrapper = styled.main({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  minHeight: "calc(100vh - 64px)",
  padding: 24,
  color: "#cbd5e1",
  textAlign: "center",
});

const Code = styled.span({
  fontSize: 64,
  fontWeight: 700,
  color: "#fff",
  lineHeight: 1,
});

const BackLink = styled(Link)({
  marginTop: 8,
  color: "#60a5fa",
  fontSize: 16,
});

export function NotFoundPage() {
  return (
    <Wrapper>
      <Code>404</Code>
      <p>This page does not exist.</p>
      <BackLink to="/">Back to home</BackLink>
    </Wrapper>
  );
}
