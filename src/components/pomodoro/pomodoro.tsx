// PomodoroTimer.tsx
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { SubTodo, Todo } from '@/types/types';

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [workTimeInput, setWorkTimeInput] = useState(25);
  const [breakTimeInput, setBreakTimeInput] = useState(5);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState('');
  const [round, setRound] = useState(0);



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
    if (todoInput.trim() === '') {
      // Input is empty, don't add a new todo
      alert('Please enter a todo');
      return;
    }
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: todoInput,
      status: false,
    };
    setTodos([...todos, newTodo]);
    setTodoInput('');
  };

  const handleRemoveTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };



  return (
    <div className="flex h-screen flex-row">
      <div className="h-auto w-96 shrink-0 p-4">
        <div className="rounded bg-white p-6 text-black shadow-md dark:bg-gray-800 dark:text-white">
          <h1 className="mb-4 text-2xl font-bold">{isBreak ? 'Break' : 'Work'} - #Round {round}</h1>
          <h2 className="mb-4 text-xl">{Math.floor(time / 60)}:{time % 60 < 10 ? '0' : ''}{time % 60}</h2>
          <div className="mb-4">
            <button className="text-white:dark mr-2 rounded bg-blue-500 px-4 py-2 text-black" onClick={handleStartStop}>{isRunning ? 'Pause' : 'Start'}</button>
            <button className="text-white:dark mr-2 rounded bg-blue-500 px-4 py-2 text-black" onClick={handleReset}>Reset</button>
            <button className="text-white:dark rounded bg-blue-500 px-4 py-2 text-black" onClick={handleSettings}>Settings</button>
          </div>

          {showSettings && (
            <div className="mb-4 rounded bg-gray-200 p-4 shadow-inner dark:bg-teal-800">
              <h2 className="mb-2 text-lg font-bold">Settings</h2>
              <label className="mb-2 block ">
                Work Time (minutes):
                <input type="number" value={workTimeInput} onChange={(e) => setWorkTimeInput(Number(e.target.value))} className=" block w-full rounded border p-2 text-black" />
              </label>
              <label className="mb-2 block">
                Break Time (minutes):
                <input type="number" value={breakTimeInput} onChange={(e) => setBreakTimeInput(Number(e.target.value))} className=" block w-full rounded border p-2 text-black" />
              </label>
              <button onClick={handleSaveSettings} className="rounded bg-blue-500 px-4 py-2 text-white">Save</button>
            </div>
          )}

          <h2 className="mb-2 text-lg font-bold">To-Do List</h2>
          <div className="mb-4 flex">
            <input type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} className="mr-2 grow rounded border p-2 text-slate-900" />
            <button type="button" onClick={handleAddTodo} className="rounded bg-blue-500 px-4 py-2 text-white ">Add</button>
          </div>

          {todos.map((todo, index) => (
            <div key={todo.id} className="flex justify-between">
              <span>{todo.title}</span>
              <button className='text-xs text-rose-700' onClick={() => handleRemoveTodo(index)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
