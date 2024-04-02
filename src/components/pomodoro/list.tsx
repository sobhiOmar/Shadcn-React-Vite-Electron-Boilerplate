// App.tsx
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { List, Todo } from '@/types/types';

const initialLists: List[] = [
  {
    id: 'list-1',
    title: 'List 1',
    todos: [
      { id: 'todo-1', Title: 'Todo 1', status: true },
      { id: 'todo-2', Title: 'Todo 2', status: true },
      { id: 'todo-3', Title: 'Todo 3', status: true },
    ],
  },
  {
    id: 'list-2',
    title: 'List 2',
    todos: [
      { id: 'todo-4', Title: 'Todo 4', status: true },
      { id: 'todo-5', Title: 'Todo 5', status: true },
      { id: 'todo-6', Title: 'Todo 6', status: true },
    ],
  },
  {
    id: 'list-3',
    title: 'List 3',
    todos: [
      { id: 'todo-7', Title: 'Todo 7', status: true },
      { id: 'todo-8', Title: 'Todo 8', status: true },
      { id: 'todo-9', Title: 'Todo 9', status: true },
    ],
  },
];

const App: React.FC = () => {
  const [lists, setLists] = useState(initialLists);

  const handleDragEnd = (result: { destination: any; source: any; draggableId: any; }) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = lists.find(list => list.id === source.droppableId);
    const finish = lists.find(list => list.id === destination.droppableId);

    if (start === finish) {
      const newTodoIds = Array.from(start!.todos);
      const [removed] = newTodoIds.splice(source.index, 1);
      newTodoIds.splice(destination.index, 0, removed);

      const newList = {
        ...start!,
        todos: newTodoIds,
      };

      setLists(
        lists.map(list => (list.id === newList.id ? newList : list))
      );

      return;
    }

    // Moving from one list to another
    const startTodoIds = Array.from(start!.todos);
    const [removed] = startTodoIds.splice(source.index, 1);
    const newStart: List = {
      ...start,
      todos: startTodoIds,
    };

    const finishTodoIds = Array.from(finish!.todos);
    finishTodoIds.splice(destination.index, 0, removed);
    const newFinish: List = {
      ...finish,
      todos: finishTodoIds,
    };

    setLists(lists.map(list => {
      if (list.id === newStart.id) {
        return newStart;
      } if (list.id === newFinish.id) {
        return newFinish;
      }
      return list;

    }));
  };

  const handleListDragEnd = (result: { destination: any; source: any; draggableId: any; }) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newListOrder = Array.from(lists);
    const [removed] = newListOrder.splice(source.index, 1);
    newListOrder.splice(destination.index, 0, removed);

    setLists(newListOrder);
  };

  const handleTodoDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = lists.find(list => list.id === source.droppableId);
    const finish = lists.find(list => list.id === destination.droppableId);

    if (start === finish) {
      const newTodoIds = Array.from(start.todos);
      const [removed] = newTodoIds.splice(source.index, 1);
      newTodoIds.splice(destination.index, 0, removed);

      const newList = {
        ...start,
        todos: newTodoIds,
      };

      setLists(
        lists.map(list => (list.id === newList.id ? newList : list))
      );

      return;
    }

    const startTodoIds = Array.from(start.todos);
    const [removed] = startTodoIds.splice(source.index, 1);
    const newStart: List = {
      ...start,
      todos: startTodoIds,
      id: start.id || '',
      title: start.title || '',
    };

    const finishTodoIds = Array.from(finish.todos);
    finishTodoIds.splice(destination.index, 0, removed);
    const newFinish: List = {
      ...finish,
      todos: finishTodoIds,
      id: finish.id || '',
      title: finish.title || '',
    };

    setLists(
      lists.map(list => {
        if (list.id === newStart.id) {
          return newStart;
        }
        if (list.id === newFinish.id) {
          return newFinish;
        }
        return list;
      })
    );
  };

  return (
    <DragDropContext onDragEnd={handleListDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal">
        {(provided) => (
          <div className="d-flex ml-96 w-auto" ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'flex', flexDirection: 'row' }}>
            {lists.map((list, listIndex) => (
              <Draggable draggableId={list.id} index={listIndex} key={list.id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '5px', margin: '10px', padding: '10px' }}>
                    <h2 {...provided.dragHandleProps}>{list.title}</h2>
                    <DragDropContext onDragEnd={handleTodoDragEnd}>
                      <Droppable droppableId={list.id}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            {list.todos.map((todo: Todo, todoIndex: number) => (
                              <Draggable draggableId={todo.id} index={todoIndex} key={todo.id}>
                                {(provided) => (
                                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ backgroundColor: 'white', borderRadius: '5px', margin: '10px', padding: '10px', userSelect: 'none' }}>
                                    <div {...provided.dragHandleProps} style={{ display: 'inline-block', marginRight: '10px' }}>Drag</div>
                                    {todo.Title}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default App;
