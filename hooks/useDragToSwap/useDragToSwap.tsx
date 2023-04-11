import { useMachine } from "@xstate/react";
import { useEffect, useMemo, useState } from "react";
import stateMachine, { Event, State } from "./stateMachine";
import { DragPreview } from "../../components/DragPreview";
import { useAnimationControls } from "./useAnimationControls";
import { log } from "../../utils/logger";
import { AnimatePresence } from "framer-motion";
import { useTransparentPixel } from "../useTransparentPixel";

export interface IDraggableHandlers {
  onDragStart: (e: React.DragEvent<HTMLImageElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLImageElement>) => void;
}

export interface IDroppableHandlers {
  onDragOver: (e: React.DragEvent<HTMLImageElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLImageElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLImageElement>) => void;
  onDrop: (e: React.DragEvent<HTMLImageElement>) => void;
}

interface IUseDragToSwapProps {
  doSwap: (src: string, target: string) => void;
}

export function useDragToSwap({ doSwap }: IUseDragToSwapProps) {
  // Used to remember the source and destination images for swap
  const [src, setSrc] = useState<string>();
  const [dest, setDest] = useState<string>();

  // Start position is used to set the initial position of the drag preview
  const [startPosition, setStartPosition] = useState<{x: number; y: number}>({ x: -1000, y: -1000 });

  // Target position is used to override the preview position when we are dropping
  const [targetPosition, setTargetPosition] = useState<{x: number; y: number}>();

  // This is a hack to get around the fact that the drag image
  // is not allowed to be transparent. I create a 1x1 transparent
  // image and use that as the drag image to get rid of the native preview.
  const transparentPixel = useTransparentPixel();

  const {
    controls,
    initialAnimation,
    draggingAnimation,
    dragOverAnimation,
    dropAnimation
  } = useAnimationControls();

  const [state, send] = useMachine(stateMachine, {
    services: {
      initialAnimation: () => initialAnimation().then(() => {
        setStartPosition({ x: -1000, y: -1000 });
        setTargetPosition(undefined);
      }),
      draggingAnimation,
      dragOverAnimation,
      dropAnimation: () => dropAnimation().then(() => {
        doSwap(src, dest);

        setSrc(undefined);
        setDest(undefined);
        
        send(Event.Reset);
      }),
    },
  });

  const dragPreview = useMemo(
    () => <AnimatePresence>
      {src && <DragPreview 
        src={src} 
        targetPosition={targetPosition} 
        startPosition={startPosition}
      />}
    </AnimatePresence>, 
    [src, targetPosition, startPosition],
  );

  const onDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    log('onDragStart');
    // Replace dragging preview with transparent image
    e.dataTransfer.setDragImage(transparentPixel, 0, 0);
    e.dataTransfer.dropEffect = 'move';

    setSrc(e.currentTarget?.src);
    setStartPosition({ x: e.clientX, y: e.clientY });

    requestAnimationFrame(() => {
      send(Event.DragStart);
    });
  };

  const onDragEnd = (e: React.DragEvent<HTMLImageElement>) => {
    log('onDragEnd');

    send(Event.DragEnd);
  };

  const onDragOver = (e: React.DragEvent<HTMLImageElement>) => {
    // // Dissallow dropping on itself
    if (e.currentTarget?.src === src) {
      return;
    }

    log('onDragOver');

    e.preventDefault();
  };

  const onDragEnter = (e: React.DragEvent<HTMLImageElement>) => {
    // Dissallow dropping on itself
    if (e.currentTarget?.src === src) {
      return;
    }

    log('onDragEnter');

    // This is so that we can animate target on hover
    setDest(e.currentTarget?.src);

    requestAnimationFrame(() => {
      send(Event.DragEnter);
    });
  };

  const onDragLeave = (e: React.DragEvent<HTMLImageElement>) => {
    // Dissallow dropping on itself
    if (e.currentTarget?.src === src) {
      return;
    }
    log('onDragLeave');

    setDest(undefined);

    requestAnimationFrame(() => {
      send(Event.DragLeave);
    });
  };

  const onDrop = (e: React.DragEvent<HTMLImageElement>) => {
    log('onDrop');

    const targetRect = e.currentTarget.getBoundingClientRect();
    setTargetPosition({ 
      x: targetRect.x + targetRect.width / 2, 
      y: targetRect.y + targetRect.height / 2,
    });
    
    requestAnimationFrame(() => {
      send(Event.Drop);
    });
  };

  return {
    src,
    dest,
    state: state.value,
    animationControls: controls,
    draggableHandlers: {
      onDragStart,
      onDragEnd,
    },
    droppableHandlers: {
      onDragOver,
      onDragEnter,
      onDragLeave,
      onDrop,
    },
    components: {
      dragPreview,
    },
  };
}