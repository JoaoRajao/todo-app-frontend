import React from 'react';

function TaskList({ tasks, onDelete, onEdit, onToggleCompleted }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompleted(task)}
          />
          {task.title} - {task.completed ? 'Completed' : 'Pending'}
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
