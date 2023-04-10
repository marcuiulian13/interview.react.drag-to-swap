import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';
import { IDraggableHandlers, IDroppableHandlers } from '../hooks/useImageSwap';
import { Animation } from '../hooks/useImageSwap/useAnimationControls';

interface IPrintPhoto extends IDraggableHandlers, IDroppableHandlers {
  src: string;
  dest: string;
  image: string;
}

const PrintPhotoContainer = styled.div`
  position: relative;

  width: calc(50% - 10px);

  overflow: hidden;

  img {
    max-width: 100%;
  }
`;

export function PrintPhoto({ 
  src,
  dest,
  image,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
}: IPrintPhoto) {
  const isSrc = src === image;
  const isDest = dest === image;

  const originalVariants = {
    [Animation.Initial]: {
      scale: 1,
      opacity: 1,
    },
    [Animation.Dragging]: {
      opacity: isSrc ? 0.8 : 1,
    },
    [Animation.DragOver]: {
      opacity: isDest ? 0.6 : isSrc ? 0.8 : 1,
    },
  };

  const destVariants = {
    // [Animation.Initial]: {
    //   clipPath: 'circle(0% at 50% 50%)',
    // },
    [Animation.Drop]: {
      clipPath: 'circle(100% at 50% 50%)',
    },
  };

  const srcVariants = {
    // [Animation.Initial]: {
    //   opacity: 0,
    // },
    [Animation.Drop]: {
      opacity: 1,
    },
  };

  return (
    <PrintPhotoContainer>
      <motion.img
        src={image} 
        alt=""
        draggable
        onDragStart={onDragStart as any} // For some reason the img element has a different signature
        onDragEnd={onDragEnd as any} // For some reason the img element has a different signature
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        variants={originalVariants}
      />
      {isDest && src && <motion.img
        src={src} 
        alt=""
        initial={{clipPath: 'circle(0% at 50% 50%)'}}
        variants={destVariants}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          maxWidth: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />}
      {isSrc && dest && <motion.img
        src={dest} 
        alt=""
        initial={{opacity: 0}}
        variants={srcVariants}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          maxWidth: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />}
    </PrintPhotoContainer>
  );
}
