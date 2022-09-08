import { SingleTodo } from './SingleTodo';
import { useTodoContext } from '../context/useTodoContext';
import './TodoList.css';
import { motion } from 'framer-motion';

export const TodoList = () => {
  const { todos, setTodos, todoIsValid } = useTodoContext();

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
      {todoIsValid ? (
        <motion.button
          whileHover={{
            scale: 1.1,
            transition: {
              repeat: 4,
              repeatType: 'mirror',
            },
          }}
          className='list-btn-reset'
          onClick={clearTodos}
        >
          Clear All
        </motion.button>
      ) : null}
    </>
  );
};
