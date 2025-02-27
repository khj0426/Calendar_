import { useEffect, RefObject } from "react";

export function useClickAway<T extends HTMLElement | null>(
  ref: RefObject<T> | null,
  callback?: () => void
) {
  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback?.();
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, callback]);
}
