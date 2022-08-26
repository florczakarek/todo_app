import { SingleTodo } from './SingleTodo';
import { useTodoContext } from '../context/useTodoContext';
import './TodoList.css';

export const TodoList = () => {
  const { todos, setTodos } = useTodoContext();

  const clearTodos = () => {
    setTodos([]);
  };

  return (
    <>
      <ul className='todo-list'>
        {todos.map((todo) => (
          <SingleTodo {...todo} key={todo.id} />
        ))}
      </ul>
      <button className='list-btn-reset' onClick={clearTodos}>
        Clear todos
      </button>
    </>
  );
};
