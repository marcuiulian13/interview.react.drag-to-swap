import { useState, useMemo, useEffect } from "react";

/**
 * This hook returns the mouse position on the screen, even when dragging.
 * 
 * @returns {x, y} mouse position
 */
const useMousePosition = ({ x: initialX, y: initialY }: { x: number; y: number }): {x: number; y: number} => {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("drag", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return { x, y };
};

export default useMousePosition;