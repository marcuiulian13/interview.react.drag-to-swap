import { Variants, motion } from "framer-motion";
import styled from "styled-components";
import { Animation } from "./useAnimationControls";
import useMousePosition from "../useMousePosition";
import { dragPreviewVariants } from "./animations";

interface IDragPreviewProps {
  src: string;
  startPosition: {x: number; y: number};
  targetPosition?: {x: number; y: number};
}

const size = 128;
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

  return (
    <DragContainer
      as={motion.div as any}
      variants={dragPreviewVariants}
      initial={{
        opacity: 0,
        scale: 0,
        transition: { duration: 0.1 }
      }}
      // Use framer-motion to position the element
      animate={{ 
        ...position,
        transition: { duration: targetPosition ? 0.1 : 0 } 
      }}
      exit={{
        opacity: 0,
        scale: 0,
        transition: { duration: 0.1 }
      }}
      src={src}
    />
  );
}