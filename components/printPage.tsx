import styled from "styled-components";
import React, { useEffect } from 'react'

import { motion } from "framer-motion";
import Actions from "./actions";
import { useImageSwap } from "../hooks/useImageSwap";
import { PrintPhoto } from "./PrintPhoto";
import { State } from "../hooks/useImageSwap/stateMachine";

const Wrapper = styled.div`
  width: 600px;
  margin: auto;
  color: #585858;
`;

const PrintWrapper = styled.div`
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

const PageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  background: #2778a5;
  border-radius: 8px;
  padding: 20px;
  margin: 17px 0 42px;
  justify-content: space-between;

  user-select: none;
`;

export default function PrintPage({ data, doSwap }) {
  const {
    src,
    dest,
    state,
    animationControls,
    droppableHandlers,
    draggableHandlers,
    components: {
      dragPreview,
    },
  } = useImageSwap({ doSwap });

  return (
    // This div orchestrates the animations via the animationControls,
    // which has its actions linked inside the state machine.
    <motion.div
      animate={animationControls}
      initial={state}
    >
      <Wrapper>
        {Object.values(data).map((entry: any, i) => {
          return (
            <PrintWrapper key={i}>
              <Header>
                <Title>{entry.title}</Title>
                <Actions />
              </Header>
              <PageLayout>
                {entry.images.map((image: string, j) => {
                  return (
                    <PrintPhoto
                      key={j}
                      src={src}
                      dest={dest}
                      image={image}
                      canDrag={state === State.Initial || state === State.Dragging || state === State.DraggingOver}
                      {...draggableHandlers}
                      {...droppableHandlers}
                    />
                  );
                })}
              </PageLayout>
            </PrintWrapper>
          );
        })}
        {dragPreview}
      </Wrapper>
    </motion.div>
  );
}
