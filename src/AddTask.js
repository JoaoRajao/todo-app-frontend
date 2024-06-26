import React, { useState } from 'react';

function AddTask({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAddTask(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Adiciona nova tarefa"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default AddTask;
