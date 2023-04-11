import { Variants } from "framer-motion";
import { Animation } from "../../hooks/useDragToSwap/useAnimationControls";

export const imageVariants: (opts: { isSrc: boolean; isDest: boolean }) => Variants = (opts) => ({
  [Animation.Initial]: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0 }
  },
  [Animation.Dragging]: {
    opacity: opts.isSrc ? 0.8 : 1,
  },
  [Animation.DragOver]: {
    opacity: opts.isDest ? 0.6 : opts.isSrc ? 0.8 : 1,
  },
  [Animation.Drop]: {
    opacity: 1,
  },
});

export const destPlaceholderVariants: Variants = {
  [Animation.Drop]: {
    clipPath: 'circle(100% at 50% 50%)',
    transition: { duration: 0.4 }
  },
};

export const srcPlaceholderVariants: Variants = {
  [Animation.Drop]: {
    opacity: 1,
    transition: { duration: 0.1 }
  },
};