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
          {task.title} - {task.completed ? 'Completa' : 'Pendente'}
          <button onClick={() => onEdit(task)}>Editar</button>
          <button onClick={() => onDelete(task.id)}>Deletar</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
