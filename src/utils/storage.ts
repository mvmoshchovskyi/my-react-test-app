/**
 * Reads and parses a JSON value from localStorage.
 * Falls back to `fallback` when the key is missing, the JSON is corrupted
 * or localStorage itself is unavailable.
 */
export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * Serializes a value to localStorage.
 * Quota errors and private-mode restrictions are swallowed on purpose:
 * storage is a nice-to-have, it must never break the UI.
 */
export function writeJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore: quota exceeded / storage disabled.
  }
}
