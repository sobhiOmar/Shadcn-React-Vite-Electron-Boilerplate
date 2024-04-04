// List.tsx
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { List as ListType } from '@/types/types';

import Card from './Card';

interface ListProps {
  list: ListType;
}

const List: React.FC<ListProps> = ({ list }) => {
  if (!list) {
    console.log('List.tsx: list is null');
    return null; // or return a loading spinner, or some fallback UI
  }

  return (
    <Droppable droppableId={list.id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {list.todos.map((todo, index) => (
            <Card key={todo.id} todo={todo} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default List;
