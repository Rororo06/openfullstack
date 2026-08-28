import { useEffect, useState } from 'react';

import Todo from './Todo';
import TodoForm from './TodoForm';
import * as todoService from './services/todos';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoService.getAll().then(setTodos);
  }, []);

  const createTodo = async text => {
    const created = await todoService.create(text);
    setTodos(todos.concat(created));
  };

  const completeTodo = async todo => {
    const updated = await todoService.update({ ...todo, done: true });
    setTodos(todos.map(item => (item.id === updated.id ? updated : item)));
  };

  const deleteTodo = async todo => {
    await todoService.remove(todo.id);
    setTodos(todos.filter(item => item.id !== todo.id));
  };

  return (
    <div>
      <h1>Todos</h1>
      <TodoForm onCreate={createTodo} />
      <ul>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            onComplete={completeTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
