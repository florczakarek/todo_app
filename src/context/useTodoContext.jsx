import { createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext();

const AppProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem('todos')) || [];

  const [todos, setTodos] = useState(initialState);
  const [todo, setTodo] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{ todo, setTodo, todos, setTodos, isEdit, setIsEdit }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export { TodoContext, AppProvider };
