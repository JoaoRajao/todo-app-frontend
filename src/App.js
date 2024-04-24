import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import AddTask from './AddTask';
import EditTaskModal from './EditTaskModal';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const addTask = async (title) => {
    const task = { title, completed: false };
    try {
      await axios.post('http://localhost:3000/tasks', task);
      setTimeout(fetchTasks, 1000);
    } catch (error) {
      console.error('Failed to add task', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      setTimeout(() => setTasks(tasks.filter(task => task.id !== id)), 1000);
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const toggleTaskCompleted = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    try {
      await axios.put(`http://localhost:3000/tasks/${task.id}`, updatedTask);
      setTimeout(fetchTasks, 1000);
    } catch (error) {
      console.error('Failed to toggle task completion status', error);
    }
  };

  const openModal = (task) => {
    setCurrentTask(task);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const editTask = async (updatedTask) => {
    try {
      await axios.put(`http://localhost:3000/tasks/${updatedTask.id}`, updatedTask);
      setTimeout(fetchTasks, 1000);
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <AddTask onAddTask={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onEdit={openModal} onToggleCompleted={toggleTaskCompleted} />
      {currentTask && (
        <EditTaskModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          task={currentTask}
          onTaskUpdate={editTask}
        />
      )}
    </div>
  );
}

export default App;
