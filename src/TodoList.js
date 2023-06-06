import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const handleRemoveTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter a task"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={task.completed ? 'completed' : ''}
          >
            <span onClick={() => handleToggleComplete(task.id)}>{task.text}</span>
            <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} remaining</p>
    </div>
  );
};

export default TodoList;
