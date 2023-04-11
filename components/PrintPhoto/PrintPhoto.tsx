import styled from 'styled-components';
import { motion} from 'framer-motion';
import { IDraggableHandlers, IDroppableHandlers } from '../../hooks/useDragToSwap';
import { destPlaceholderVariants, imageVariants, srcPlaceholderVariants } from './animations';

interface IPrintPhoto extends IDraggableHandlers, IDroppableHandlers {
  src: string;
  dest: string;
  image: string;
  canDrag: boolean;
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
  canDrag,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
}: IPrintPhoto) {
  const isSrc = src === image;
  const isDest = dest === image;

  return (
    <PrintPhotoContainer>
      <motion.img
        src={image} 
        alt=""
        draggable={canDrag}
        onDragStart={onDragStart as any} // For some reason the img element has a different signature
        onDragEnd={onDragEnd as any} // For some reason the img element has a different signature
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        variants={imageVariants({isSrc, isDest})}
      />
      {isDest && src && <motion.img
        src={src} 
        alt=""
        initial={{clipPath: 'circle(0% at 50% 50%)'}}
        variants={destPlaceholderVariants}
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
        variants={srcPlaceholderVariants}
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
