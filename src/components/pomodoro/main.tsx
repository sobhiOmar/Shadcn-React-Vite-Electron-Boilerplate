// App.tsx
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import List from './list';
import { useDragAndDrop } from './useDragAndDrop';

const App: React.FC = () => {
  const { lists, handleDragEnd } = useDragAndDrop();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {lists.map((list) => (
        list ? <List key={list.id} list={list} /> : null
      ))}
    </DragDropContext>
  );
};

export default App;
