// useDragAndDrop.ts
import { useState } from 'react';

import { List } from '@/types/types';

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

console.log("lists in useDragAndDrop", initialLists);
export const useDragAndDrop = () => {
  console.log("lists in useDragAndDrop", initialLists);

  const [lists, setLists] = useState(initialLists);
  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'list') {
      const newListOrder = Array.from(lists);
      const [removed] = newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, removed);

      setLists(newListOrder);
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
    };

    const finishTodoIds = Array.from(finish.todos);
    finishTodoIds.splice(destination.index, 0, removed);
    const newFinish: List = {
      ...finish,
      todos: finishTodoIds,
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

  return { lists, handleDragEnd };
};
