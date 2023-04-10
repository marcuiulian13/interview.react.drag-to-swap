import { useAnimation } from "framer-motion";
import { useCallback } from "react";

export enum Animation {
  Initial = 'initial',
  Dragging = 'dragging',
  DragOver = 'dragOver',
  Drop = 'drop',
}

export function useAnimationControls() {
  // These controls are tied to the state machine and
  //  the callbacks are automatically called on state change.
  const controls = useAnimation();

  const initialAnimation = useCallback(() => controls.start(Animation.Initial), [controls]);
  const draggingAnimation = useCallback(() => controls.start(Animation.Dragging), [controls]);
  const dragOverAnimation = useCallback(() => controls.start(Animation.DragOver), [controls]);
  const dropAnimation = useCallback(() => controls.start(Animation.Drop), [controls]);

  return {
    controls,
    initialAnimation,
    draggingAnimation,
    dragOverAnimation,
    dropAnimation,
  };
}