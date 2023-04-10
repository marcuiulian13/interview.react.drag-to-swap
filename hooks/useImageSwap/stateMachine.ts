
import { createMachine } from "xstate";

export enum Event {
  DragStart = 'action_dragStart',
  DragEnd = 'action_dragEnd',
  DragEnter = 'action_dragEnter',
  DragLeave = 'action_dragLeave',
  Drop = 'action_drop',
  Reset = 'action_reset',
}

export enum State {
  Initial = 'initial',
  Dragging = 'dragging',
  DraggingOver = 'draggingOver',
  Dropping = 'dropping',
}

export default createMachine({
  initial: State.Initial,
  states: {
    [State.Initial]: {
      invoke: {
        src: 'initialAnimation',
      },
      on: {
        [Event.DragStart]: State.Dragging
      }
    },
    [State.Dragging]: {
      invoke: {
        src: 'draggingAnimation',
      },
      on: {
        [Event.DragEnd]: State.Initial,
        [Event.DragEnter]: State.DraggingOver
      }
    },
    [State.DraggingOver]: {
      invoke: {
        src: 'dragOverAnimation',
      },
      on: {
        [Event.DragLeave]: State.Dragging,
        [Event.Drop]: State.Dropping,
      }
    },
    [State.Dropping]: {
      invoke: {
        src: 'dropAnimation',
      },
      on: {
        [Event.Reset]: State.Initial,
      }
    },
  }
});
