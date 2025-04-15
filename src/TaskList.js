// src/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [deleteCriteria, setDeleteCriteria] = useState(''); // New state for delete input

  // Fetch tasks from the Spring Boot API when the component mounts
  useEffect(() => {
    axios.get('https://test-webapp-spring-react-postgre.onrender.com/api/tasks')
      .then(response => {
        setTasks(response.data);
        console.log('Fetched tasks:', response.data);  // Added logging
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        alert('Error fetching tasks');
      });
  }, []);

  // Handle creating a new task
  const handleCreateTask = () => {
    if (newTaskDescription.trim()) {
      console.log('Adding task:', newTaskDescription); // Added logging
      axios.post('https://test-webapp-spring-react-postgre.onrender.com/api/tasks', {
        description: newTaskDescription,
        done: false,
      })
      .then(response => {
        console.log('Task added:', response.data); // Added logging
        setTasks([...tasks, response.data]); // Update tasks list
        setNewTaskDescription(''); // Clear input field
      })
      .catch(error => {
        console.error('Error creating task:', error);
        alert('Error creating task');
      });
    } else {
      alert('Please enter a task description');
    }
  };

  // Handle deleting a task by ID or description
  const handleDeleteTask = () => {
    if (deleteCriteria.trim()) {
      const taskToDelete = tasks.find(task => 
        task.id.toString() === deleteCriteria || task.description === deleteCriteria
      );

      if (taskToDelete) {
        console.log('Deleting task:', taskToDelete); // Added logging
        axios.delete(`https://test-webapp-spring-react-postgre.onrender.com/api/tasks/${taskToDelete.id}`)
          .then(() => {
            console.log('Task deleted:', taskToDelete); // Added logging
            setTasks(tasks.filter(task => task.id !== taskToDelete.id)); // Update tasks list
            setDeleteCriteria(''); // Clear input field
          })
          .catch(error => {
            console.error('Error deleting task:', error);
            alert('Error deleting task');
          });
      } else {
        alert('Task not found');
      }
    } else {
      alert('Please enter a task ID or description');
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        placeholder="New task description"
      />
      <button onClick={handleCreateTask}>Add Task</button>

      <input
        type="text"
        value={deleteCriteria}
        onChange={(e) => setDeleteCriteria(e.target.value)}
        placeholder="Task ID or description to delete"
      />
      <button onClick={handleDeleteTask}>Delete Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.description} (Done: {task.done ? 'Yes' : 'No'})</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
