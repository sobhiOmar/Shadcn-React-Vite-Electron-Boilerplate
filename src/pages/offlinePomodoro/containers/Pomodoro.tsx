// PomodoroTimer.tsx
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [workTimeInput, setWorkTimeInput] = useState(25);
  const [breakTimeInput, setBreakTimeInput] = useState(5);
  const [todos, setTodos] = useState<string[]>([]);
  const [todoInput, setTodoInput] = useState('');
  const [round, setRound] = useState(0);
  //
  const [backlog, setBacklog] = useState<string[]>([]);
  const [doing, setDoing] = useState<string[]>([]);
  const [done, setDone] = useState<string[]>([]);


  const handleDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'backlog') {
        const reorderedBacklog = Array.from(backlog);
        reorderedBacklog.splice(source.index, 1);
        reorderedBacklog.splice(destination.index, 0, draggableId);
        setBacklog(reorderedBacklog);
      } else if (source.droppableId === 'doing') {
        const reorderedDoing = Array.from(doing);
        reorderedDoing.splice(source.index, 1);
        reorderedDoing.splice(destination.index, 0, draggableId);
        setDoing(reorderedDoing);
      } else if (source.droppableId === 'done') {
        const reorderedDone = Array.from(done);
        reorderedDone.splice(source.index, 1);
        reorderedDone.splice(destination.index, 0, draggableId);
        setDone(reorderedDone);
      }
    } else if (source.droppableId === 'todos' && destination.droppableId === 'doing') {
      const movedTask = todos[source.index];
      const updatedTodos = Array.from(todos);
      updatedTodos.splice(source.index, 1);
      setTodos(updatedTodos);
      setDoing([...doing, movedTask]);
    } else if (source.droppableId === 'todos' && destination.droppableId === 'done') {
      const movedTask = todos[source.index];
      const updatedTodos = Array.from(todos);
      updatedTodos.splice(source.index, 1);
      setTodos(updatedTodos);
      setDone([...done, movedTask]);
    } else if (source.droppableId === 'todos' && destination.droppableId === 'backlog') {
      const movedTask = todos[source.index];
      const updatedTodos = Array.from(todos);
      updatedTodos.splice(source.index, 1);
      setTodos(updatedTodos);
      setBacklog([...backlog, movedTask]);
    }
    else if (source.droppableId === 'backlog' && destination.droppableId === 'doing') {
      const movedTask = backlog[source.index];
      const updatedBacklog = Array.from(backlog);
      updatedBacklog.splice(source.index, 1);
      setBacklog(updatedBacklog);
      setDoing([...doing, movedTask]);
    } else if (source.droppableId === 'backlog' && destination.droppableId === 'done') {
      const movedTask = backlog[source.index];
      const updatedBacklog = Array.from(backlog);
      updatedBacklog.splice(source.index, 1);
      setBacklog(updatedBacklog);
      setDone([...done, movedTask]);
    } else if (source.droppableId === 'backlog' && destination.droppableId === 'todos') {
      const movedTask = backlog[source.index];
      const updatedBacklog = Array.from(backlog);
      updatedBacklog.splice(source.index, 1);
      setBacklog(updatedBacklog);
      setTodos([...todos, movedTask]);
    }
    else if (source.droppableId === 'doing' && destination.droppableId === 'done') {
      const movedTask = doing[source.index];
      const updatedDoing = Array.from(doing);
      updatedDoing.splice(source.index, 1);
      setDoing(updatedDoing);
      setDone([...done, movedTask]);
    } else if (source.droppableId === 'doing' && destination.droppableId === 'backlog') {
      const movedTask = doing[source.index];
      const updatedDoing = Array.from(doing);
      updatedDoing.splice(source.index, 1);
      setDoing(updatedDoing);
      setBacklog([...backlog, movedTask]);
    } else if (source.droppableId === 'doing' && destination.droppableId === 'todos') {
      const movedTask = doing[source.index];
      const updatedDoing = Array.from(doing);
      updatedDoing.splice(source.index, 1);
      setDoing(updatedDoing);
      setTodos([...todos, movedTask]);
    } else if (source.droppableId === 'done' && destination.droppableId === 'doing') {
      const movedTask = done[source.index];
      const updatedDone = Array.from(done);
      updatedDone.splice(source.index, 1);
      setDone(updatedDone);
      setDoing([...doing, movedTask]);
    } else if (source.droppableId === 'done' && destination.droppableId === 'backlog') {
      const movedTask = done[source.index];
      const updatedDone = Array.from(done);
      updatedDone.splice(source.index, 1);
      setDone(updatedDone);
      setBacklog([...backlog, movedTask]);
    } else if (source.droppableId === 'done' && destination.droppableId === 'todos') {
      const movedTask = done[source.index];
      const updatedDone = Array.from(done);
      updatedDone.splice(source.index, 1);
      setDone(updatedDone);
      setTodos([...todos, movedTask]);
    }
  };
  //

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          }
          setIsRunning(false);
          return 0;

        });
      }, 1000);
    }
    if (!isRunning && time === 0) {
      setIsBreak(!isBreak);
      if (!isBreak) {
        setRound(prevRound => prevRound + 1);
      }
      setTime(isBreak ? workTimeInput * 60 : breakTimeInput * 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, isBreak, workTimeInput, breakTimeInput]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(workTimeInput * 60);
    setBreakTime(breakTimeInput * 60);
    setIsRunning(false);
  };

  const handleSettings = () => {
    setShowSettings(true);
  };

  const handleSaveSettings = () => {
    setTime(workTimeInput * 60);
    setBreakTime(breakTimeInput * 60);
    setShowSettings(false);
  };

  const handleAddTodo = () => {
    setTodos([...todos, todoInput]);
    setTodoInput('');
  };

  const handleRemoveTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };



  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-row h-screen">
        {/* Pomodoro Timer - Left 1/3 */}
        <div className="w-1/3 flex-shrink-0 p-4">
          <div className="rounded bg-white p-6 text-black shadow-md dark:bg-gray-800 dark:text-white">
            <h1 className="mb-4 text-2xl font-bold">{isBreak ? 'Break' : 'Work'} - #Round {round}</h1>
            <h2 className="mb-4 text-xl">{Math.floor(time / 60)}:{time % 60 < 10 ? '0' : ''}{time % 60}</h2>
            <div className="mb-4">
              <button className="mr-2 rounded bg-blue-500 px-4 py-2 text-white" onClick={handleStartStop}>{isRunning ? 'Pause' : 'Start'}</button>
              <button className="mr-2 rounded bg-blue-500 px-4 py-2 text-white" onClick={handleReset}>Reset</button>
              <button className="rounded bg-blue-500 px-4 py-2 text-white" onClick={handleSettings}>Settings</button>
            </div>

            {showSettings && (
              <div className="mb-4 rounded bg-gray-200 p-4 shadow-inner dark:bg-teal-800">
                <h2 className="mb-2 text-lg font-bold">Settings</h2>
                <label className="mb-2 block">
                  Work Time (minutes):
                  <input type="number" value={workTimeInput} onChange={(e) => setWorkTimeInput(Number(e.target.value))} className="block w-full rounded border p-2" />
                </label>
                <label className="mb-2 block">
                  Break Time (minutes):
                  <input type="number" value={breakTimeInput} onChange={(e) => setBreakTimeInput(Number(e.target.value))} className="block w-full rounded border p-2" />
                </label>
                <button onClick={handleSaveSettings} className="rounded bg-blue-500 px-4 py-2 text-white">Save</button>
              </div>
            )}

            <h2 className="mb-2 text-lg font-bold">To-Do List</h2>
            <div className="mb-4 flex">
              <input type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} className="mr-2 grow rounded border p-2 text-slate-900" />
              <button type="button" onClick={handleAddTodo} className="rounded bg-blue-500 px-4 py-2 text-white ">Add</button>
            </div>
            <Droppable droppableId="todos">
              {(provided) => (
                <ul ref={provided.innerRef} {...provided.droppableProps}>
                  {todos.map((todo, index) => (
                    <Draggable key={todo} draggableId={todo} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-2 flex items-center">
                          <span className="grow">{todo}</span>
                          <button type="button" onClick={() => handleRemoveTodo(index)} className="rounded bg-red-500 px-2 py-1 text-white">Remove</button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </div>

        {/* Backlog - Middle 1/3 */}
        <Droppable droppableId="backlog">
          {(provided) => (
            <div
              className="ml-9 w-96 p-4 border border-gray-300 rounded"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2 className="text-lg font-bold mb-4">Backlog</h2>
              {backlog.map((task, index) => (
                <Draggable key={task} draggableId={task} index={index}>
                  {(provided) => (
                    <div
                      className="p-2 border border-gray-200 rounded mb-2"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {task}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Doing and Done - Right 1/3 (Stacked on top of each other) */}
        <div className="ml-5 w-96 flex flex-col">
          {/* Doing */}
          <Droppable droppableId="doing">
            {(provided) => (
              <div
                className="p-4 border border-gray-300 rounded mb-4 flex-grow"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="text-lg font-bold mb-4">Doing</h2>
                {doing.map((task, index) => (
                  <Draggable key={task} draggableId={task} index={index}>
                    {(provided) => (
                      <div
                        className="p-2 border border-gray-200 rounded mb-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Done */}
          <Droppable droppableId="done">
            {(provided) => (
              <div
                className="p-4 border border-gray-300 rounded flex-grow"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="text-lg font-bold mb-4">Done</h2>
                {done.map((task, index) => (
                  <Draggable key={task} draggableId={task} index={index}>
                    {(provided) => (
                      <div
                        className="p-2 border border-gray-200 rounded mb-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default PomodoroTimer;
