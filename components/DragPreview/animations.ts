import { Variants } from "framer-motion";
import { Animation } from "../../hooks/useDragToSwap/useAnimationControls";

export const dragPreviewVariants: Variants = {
  [Animation.Initial]: {
    opacity: 0,
    scale: 0,
    border: 10,
    transition: { duration: 0.1 }
  },  
  [Animation.Dragging]: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.1 }
  },
  [Animation.Drop]: {
    opacity: 0,
    scale: 1,
    border: 2,
    transition: { duration: 0.1 }
  },
}