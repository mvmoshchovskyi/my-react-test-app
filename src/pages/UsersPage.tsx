import { useState } from "react";
import { useSearchParams } from "react-router";
import * as S from "./users/styles";

export function UsersPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [input, setInput] = useState(query);

  // TODO: keep the input in sync with the query on back/forward navigation
  // (for example, via key={query} on the field, or the
  // "adjusting state during render" pattern)

  return (
    <S.Page>
      <S.Title>User Directory</S.Title>

      <S.SearchField
        autoFocus
        value={input}
        placeholder="Search users by name or email…"
        aria-label="Search users"
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(_event) => {
          // TODO: Enter → run the search immediately (skip debounce)
          // TODO: Escape → clear the input and the query
        }}
      />

      {/*
        TODO:
        1. Debounce the input (400 ms) → setSearchParams({ q }, { replace: true })
           hint: const [, setSearchParams] = useSearchParams();
        2. useUsersQuery(query) → items, total, status, error, loadMore
        3. First load → <S.SkeletonCard /> × 5
        4. Error → <S.ErrorText /> + <S.Button>Retry</S.Button>
        5. Empty → <S.Empty>No users found</S.Empty>
        6. List → <S.List> with <S.Card> (Avatar / Name / Email)
        7. Counter "Showing X of Y" + Load more (disabled while loading)
      */}
      <S.Empty>Type a name or email to search the directory.</S.Empty>
    </S.Page>
  );
}
