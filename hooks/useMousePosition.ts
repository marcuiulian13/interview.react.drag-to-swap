import { useState, useEffect } from "react";

/**
 * This hook returns the mouse position on the screen, even when dragging.
 * 
 * @returns {x, y} mouse position
 */
const useMousePosition = (initial: { x: number; y: number }): {x: number; y: number} => {
  const [position, setPosition] = useState(initial);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (e.clientX === 0 && e.clientY === 0) {
        return;
      } 
      
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("drag", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return position;
};

export default useMousePosition;