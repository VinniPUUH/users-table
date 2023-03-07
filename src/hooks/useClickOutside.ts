import { RefObject, useEffect } from "react";

type AnyEvent = MouseEvent | TouchEvent;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  isActive: boolean,
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void
) {
  useEffect(() => {
    if (!isActive) return;

    const listener = (event: AnyEvent) => {
      const element = ref?.current;
      const target = event.target;
      if (
        !element ||
        (element.contains(target as Node) &&
          !(event?.target as HTMLElement)?.dataset.blur)
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener(`click`, listener);

    return () => {
      document.removeEventListener(`click`, listener);
    };
  }, [ref, handler, isActive]);
}

export default useOnClickOutside;
