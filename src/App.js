import { useEffect, useState } from 'react';
import { Form } from './components/Form';
import { TodoList } from './components/TodoList';

function App() {
  const initialState = JSON.parse(localStorage.getItem('todos')) || [];

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(initialState);
  const [isEdit, setIsEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  });
  const clearTodos = () => {
    setTodos([]);
  };

  return (
    <div className='container'>
      <Form
        todo={todo}
        setTodo={setTodo}
        todos={todos}
        setTodos={setTodos}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      {todos.length > 0 && (
        <>
          <TodoList
            todos={todos}
            setTodos={setTodos}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
          <button className='btn-reset' onClick={clearTodos}>
            Clear todos
          </button>
        </>
      )}
    </div>
  );
}

export default App;
