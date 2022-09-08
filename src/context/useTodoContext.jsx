import { createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext();

const AppProvider = ({ children }) => {
  const getLocalStorage = () => {
    let todos = localStorage.getItem('todos');
    if (todos) {
      return JSON.parse(localStorage.getItem('todos'));
    }
    return [];
  };

  const [todos, setTodos] = useState(getLocalStorage());
  const [todo, setTodo] = useState('');
  const [todoIsValid, setTodoIsValid] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        todoIsValid,
        setTodoIsValid,
        todos,
        setTodos,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export { TodoContext, AppProvider };
