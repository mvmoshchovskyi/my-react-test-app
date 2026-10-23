import type { CSSProperties } from "react";
import { Link } from "react-router";
import styled from "styled-components";

type PracticeStatus = "ready" | "in-progress" | "planned";

interface PracticePage {
  title: string;
  description: string;
  status: PracticeStatus;
  to?: string;
}

const PRACTICE_PAGES: PracticePage[] = [
  {
    title: "Todo List",
    description:
      "State, context, sorting and persistence. The warm-up exercise from the first task.",
    status: "ready",
    to: "/todos",
  },
  {
    title: "User Directory",
    description:
      "Fetching, debounce, abort, race conditions, pagination and URL state.",
    status: "in-progress",
    to: "/users",
  },
  {
    title: "Data Table",
    description:
      "Sorting, filtering, pagination and row selection on a local dataset.",
    status: "planned",
  },
  {
    title: "Checkout Wizard",
    description:
      "A multi-step form with per-step validation and a review step.",
    status: "planned",
  },
  {
    title: "File Explorer",
    description: "Recursive tree rendering with expand/collapse and selection.",
    status: "planned",
  },
  {
    title: "Kanban Board",
    description: "Columns, cards and drag & drop without UI libraries.",
    status: "planned",
  },
];

const STATUS_LABEL: Record<PracticeStatus, string> = {
  ready: "Ready",
  "in-progress": "In progress",
  planned: "Planned",
};

const Page = styled.main({
  width: "100%",
  maxWidth: 960,
  margin: "0 auto",
  padding: "48px 24px",
  display: "flex",
  flexDirection: "column",
  gap: 40,
});

const Hero = styled.section({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

const Eyebrow = styled.span({
  color: "#60a5fa",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: 1.5,
  textTransform: "uppercase",
});

const Title = styled.h1({
  margin: 0,
  color: "#fff",
  fontSize: "clamp(32px, 5vw, 44px)",
  lineHeight: 1.1,
});

const Subtitle = styled.p({
  maxWidth: 680,
  color: "#94a3b8",
  fontSize: 17,
  lineHeight: 1.6,
});

const SectionTitle = styled.h2({
  marginBottom: 16,
  color: "#e2e8f0",
  fontSize: 20,
});

const Grid = styled.ul({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: 16,
  listStyle: "none",
});

const cardStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  height: "100%",
  padding: 20,
  borderRadius: 12,
  border: "1px solid rgba(255, 255, 255, 0.08)",
  background: "#0b1f45",
  textDecoration: "none",
  color: "inherit",
  transition: "transform 0.15s ease, border-color 0.15s ease",
};

const Card = styled(Link)({
  ...cardStyles,

  "&:hover": {
    transform: "translateY(-2px)",
    borderColor: "#2563eb",
  },

  "&:focus-visible": {
    outline: "2px solid #60a5fa",
    outlineOffset: 2,
  },
});

const PlannedCard = styled.div({
  ...cardStyles,
  opacity: 0.55,
  cursor: "not-allowed",
});

const CardTitle = styled.span({
  color: "#fff",
  fontSize: 18,
  fontWeight: 600,
});

const CardText = styled.span({
  color: "#94a3b8",
  fontSize: 14,
  lineHeight: 1.5,
});

const Badge = styled.span<{ $tone: PracticeStatus }>(({ $tone }) => ({
  alignSelf: "flex-start",
  padding: "2px 8px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 0.5,
  textTransform: "uppercase",
  color:
    $tone === "ready"
      ? "#86efac"
      : $tone === "in-progress"
        ? "#93c5fd"
        : "#94a3b8",
  background:
    $tone === "ready"
      ? "rgba(34, 197, 94, 0.15)"
      : $tone === "in-progress"
        ? "rgba(37, 99, 235, 0.2)"
        : "rgba(148, 163, 184, 0.12)",
}));

export function HomePage() {
  return (
    <Page>
      <Hero>
        <Eyebrow>React practice</Eyebrow>
        <Title>Interview Playground</Title>
        <Subtitle>
          Realistic interview-style tasks. Each page is a self-contained
          exercise: the UI and styles are ready, the logic is yours. Pick a page
          and start coding.
        </Subtitle>
      </Hero>

      <section>
        <SectionTitle>Practice pages</SectionTitle>
        <Grid aria-label="Practice pages">
          {PRACTICE_PAGES.map((page) => (
            <li key={page.title}>
              {page.to ? (
                <Card to={page.to}>
                  <Badge $tone={page.status}>{STATUS_LABEL[page.status]}</Badge>
                  <CardTitle>{page.title}</CardTitle>
                  <CardText>{page.description}</CardText>
                </Card>
              ) : (
                <PlannedCard aria-disabled="true">
                  <Badge $tone={page.status}>{STATUS_LABEL[page.status]}</Badge>
                  <CardTitle>{page.title}</CardTitle>
                  <CardText>{page.description}</CardText>
                </PlannedCard>
              )}
            </li>
          ))}
        </Grid>
      </section>
    </Page>
  );
}
