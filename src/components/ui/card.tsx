// Card.tsx
import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

import { List, Todo } from '@/types/types';

interface CardProps {
  todo: Todo;
  index: number;
  provided: DraggableProvided;
}

const Card: React.FC<CardProps> = ({ todo, index, provided }) => (
  <Draggable draggableId={todo.id} index={index}>
    {(dragProvided) => (
      <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps} style={{ backgroundColor: 'white', borderRadius: '5px', margin: '10px', padding: '10px', userSelect: 'none' }}>
        <div {...dragProvided.dragHandleProps} style={{ display: 'inline-block', marginRight: '10px' }}>Drag</div>
        {todo.Title}
      </div>
    )}
  </Draggable>
);

export default Card;
