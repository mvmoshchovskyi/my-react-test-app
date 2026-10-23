import { useState } from "react";
import { useSearchParams } from "react-router";
import * as S from "./users/styles";

export function UsersPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [input, setInput] = useState(query);

  // TODO: синхронізувати input з query при back/forward
  // (наприклад, через key={query} на полі або патерн "adjusting state during render")

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
          // TODO: Enter → застосувати пошук негайно (без debounce)
          // TODO: Escape → очистити input і запит
        }}
      />

      {/*
        TODO (завдання):
        1. debounce input (400ms) → setSearchParams({ q }, { replace: true })
           підказка: const [, setSearchParams] = useSearchParams();
        2. useUsersQuery(query) → items, total, status, error, loadMore
        3. перше завантаження → <S.SkeletonCard /> × 5
        4. помилка → <S.ErrorText /> + <S.Button>Retry</S.Button>
        5. порожньо → <S.Empty>No users found</S.Empty>
        6. список → <S.List> з <S.Card> (Avatar / Name / Email)
        7. лічильник "Showing X of Y" + Load more (disabled під час запиту)
      */}
      <S.Empty>Type a name or email to search the directory.</S.Empty>
    </S.Page>
  );
}
