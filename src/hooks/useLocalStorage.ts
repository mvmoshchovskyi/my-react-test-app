import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { readJSON, writeJSON } from "../utils/storage";

/**
 * useState with localStorage persistence.
 * The stored value is read lazily, only on the first render.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => readJSON(key, initialValue));

  useEffect(() => {
    writeJSON(key, value);
  }, [key, value]);

  return [value, setValue];
}
