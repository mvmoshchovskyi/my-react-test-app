export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  age: number;
  company: {
    name: string;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface FetchUsersParams {
  query?: string;
  skip?: number;
  limit?: number;
  signal?: AbortSignal;
}

const BASE_URL = "https://dummyjson.com";

/**
 * Fetches a page of users from DummyJSON.
 * An empty query loads the default list, a non-empty one hits the search endpoint.
 */
export async function fetchUsers({
  query = "",
  skip = 0,
  limit = 10,
  signal,
}: FetchUsersParams = {}): Promise<UsersResponse> {
  const trimmedQuery = query.trim();
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  if (trimmedQuery) {
    params.set("q", trimmedQuery);
  }

  const path = trimmedQuery ? "/users/search" : "/users";
  const response = await fetch(`${BASE_URL}${path}?${params.toString()}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to load users (HTTP ${response.status}).`);
  }

  return (await response.json()) as UsersResponse;
}
