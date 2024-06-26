import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function EditTaskModal({ isOpen, onRequestClose, task, onTaskUpdate }) {
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);

  const handleSubmit = (e) => {
    e.preventDefault();
    onTaskUpdate({ ...task, title, completed });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar Tarefa"
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <button type="submit">Modificar Tarefa</button>
        <button onClick={onRequestClose}>Cancelar</button>
      </form>
    </Modal>
  );
}

export default EditTaskModal;
