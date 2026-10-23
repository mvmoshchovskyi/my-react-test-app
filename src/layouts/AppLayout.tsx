import { Link as RouterLink, NavLink, Outlet } from "react-router";
import styled from "styled-components";

const Shell = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "100vh",
});

const Bar = styled.header({
  position: "sticky",
  top: 0,
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  gap: 24,
  width: "100%",
  height: 64,
  padding: "0 24px",
  background: "#020f2b",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
});

const Brand = styled(RouterLink)({
  color: "#fff",
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: 0.3,
  whiteSpace: "nowrap",
  textDecoration: "none",
});

const Nav = styled.nav({
  display: "flex",
  gap: 4,
  marginLeft: "auto",
});

const Link = styled(NavLink)({
  padding: "6px 14px",
  borderRadius: 999,
  color: "#cbd5e1",
  fontSize: 14,
  fontWeight: 600,
  textDecoration: "none",
  transition: "background 0.2s, color 0.2s",

  "&:hover": {
    color: "#fff",
    background: "rgba(255, 255, 255, 0.08)",
  },

  "&.active": {
    color: "#fff",
    background: "#2563eb",
  },
});

const Content = styled.div({
  flex: 1,
  width: "100%",
});

export function AppLayout() {
  return (
    <Shell>
      <Bar>
        <Brand to="/">Interview Playground</Brand>
        <Nav aria-label="Main navigation">
          <Link to="/" end>
            Home
          </Link>
          <Link to="/todos" end>
            Todos
          </Link>
          <Link to="/users" end>
            Users
          </Link>
        </Nav>
      </Bar>
      <Content>
        <Outlet />
      </Content>
    </Shell>
  );
}
