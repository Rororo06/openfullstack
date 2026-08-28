const Todo = ({ todo, onComplete, onDelete }) => (
  <li>
    <span>{todo.text}</span>
    {todo.done ? (
      <span> done</span>
    ) : (
      <button onClick={() => onComplete(todo)}>Set as done</button>
    )}
    <button onClick={() => onDelete(todo)}>Delete</button>
  </li>
);

export default Todo;
