import { motion } from "framer-motion";
import styled from "styled-components";
import { Animation } from "./useAnimationControls";
import useMousePosition from "../useMousePosition";

interface IDragPreviewProps {
  src: string;
  startPosition: {x: number; y: number};
  targetPosition?: {x: number; y: number};
}

const size = 64;
const DragContainer = styled.div<{ src: string }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  
  width: ${size}px;
  height: ${size}px;

  border: 5px solid #fff;

  border-radius: 50%;

  background: url(${props => props.src});

  background-position: center;
  background-size: cover;

  pointer-events: none;
`;

export function DragPreview({ src, startPosition, targetPosition }: IDragPreviewProps) {
  const { x: mouseX, y: mouseY } = useMousePosition(startPosition);

  const position = {
    x: (targetPosition ? targetPosition.x : mouseX) - size / 2,
    y: (targetPosition ? targetPosition.y : mouseY) - size / 2,
  }

  const variants = {
    [Animation.Initial]: {
      opacity: 0,
      scale: 0,
    },
    [Animation.Dragging]: {
      opacity: 1,
      scale: 1,
    },
    [Animation.Drop]: {
      opacity: 0,
      scale: 1,
      transition: { duration: 0.1 }
    },
  }

  return (
    <DragContainer
      as={motion.div as any}
      layoutId='drag-preview'
      variants={variants}
      // Use framer-motion to position the element
      animate={{ 
        ...position,
        transition: { duration: targetPosition ? 0.15 : 0 } 
      }}
      src={src}
    />
  );
}