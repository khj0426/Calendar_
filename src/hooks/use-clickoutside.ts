import { useEffect, RefObject } from "react";

export default function useClickAway<T extends HTMLElement>(
  ref: RefObject<T>,
  callback?: () => void
) {
  useEffect(() => {
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
