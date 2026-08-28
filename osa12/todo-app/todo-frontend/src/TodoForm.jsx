import { useState } from 'react';

const TodoForm = ({ onCreate }) => {
  const [text, setText] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    onCreate(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={event => setText(event.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
};

export default TodoForm;
