import { useState, useCallback, useMemo } from 'react';

interface IParams {
  element: HTMLElement | null;
}

interface IReturn {
  toggleFullscreen: () => void;
  isOpen: boolean;
}

export const useFullscreen = ({ element }: IParams): IReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFullscreen = useCallback(() => {
    if (element) {
      if (isOpen) {
        document.exitFullscreen();
      } else {
        element.requestFullscreen();
      }
    }
    setIsOpen((prev) => !prev);
  }, [element, isOpen]);

  return useMemo(
    () => ({
      toggleFullscreen,
      isOpen,
    }),
    [toggleFullscreen, isOpen],
  );
};
