// Card.tsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Todo } from '@/types/types';

interface CardProps {
  todo: Todo;
  index: number;
}

const Card: React.FC<CardProps> = ({ todo, index }) => (
  <Draggable draggableId={todo.id} index={index}>
    {(provided) => (
      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        {todo.Title}
      </div>
    )}
  </Draggable>
);

export default Card;
