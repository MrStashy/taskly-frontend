import { type RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callBack: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = (event?.target ?? null) as HTMLElement | null;

      if (ref.current && target) {
        const isDialog = ref.current instanceof HTMLDialogElement;
        const isOutside = isDialog
          ? ref.current === target
          : !ref.current.contains(target);
        if (isOutside) callBack();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callBack]);
}
