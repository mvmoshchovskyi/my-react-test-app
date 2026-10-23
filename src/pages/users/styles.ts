import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

export const Page = styled.main({
  width: "100%",
  maxWidth: 720,
  margin: "0 auto",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const Title = styled.h2({
  color: "#fff",
  fontSize: 24,
});

export const SearchField = styled.input({
  width: "100%",
  padding: "12px 16px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  fontSize: 16,
  outline: "none",

  "&:focus": {
    borderColor: "#2563eb",
    boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.15)",
  },
});

export const Counter = styled.p({
  color: "#94a3b8",
  fontSize: 14,
});

export const List = styled.ul({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  listStyle: "none",
});

export const Card = styled.li({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: 12,
  background: "#fff",
  borderRadius: 8,
});

export const Avatar = styled.img({
  width: 48,
  height: 48,
  borderRadius: "50%",
  objectFit: "cover",
  flexShrink: 0,
  background: "#e5e7eb",
});

export const Meta = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  minWidth: 0,
});

export const Name = styled.span({
  fontWeight: 600,
  color: "#111827",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const Email = styled.span({
  color: "#6b7280",
  fontSize: 14,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const SkeletonCard = styled.div`
  height: 72px;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.16),
    rgba(255, 255, 255, 0.06)
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.2s linear infinite;
`;

export const Button = styled.button({
  alignSelf: "center",
  padding: "10px 20px",
  borderRadius: 6,
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const ErrorText = styled.p({
  color: "#fca5a5",
  fontSize: 14,
});

export const Empty = styled.p({
  padding: "24px 0",
  color: "#94a3b8",
  textAlign: "center",
});
