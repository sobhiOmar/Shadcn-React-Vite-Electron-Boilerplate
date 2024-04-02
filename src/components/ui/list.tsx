// List.tsx
import React from 'react';
import { DraggableProvided, Droppable } from 'react-beautiful-dnd';

import { List as ListType } from '@/types/types';

import Card from './card';

interface ListProps {
  list: ListType;
}

const List: React.FC<ListProps> = ({ list }) => (
  <Droppable droppableId={list.id}>
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {list.todos.map((todo, index) => (
          <Card key={todo.id} todo={todo} index={index} provided={provided as unknown as DraggableProvided} />
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default List;
