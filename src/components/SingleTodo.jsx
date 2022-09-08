import { useTodoContext } from '../context/useTodoContext';
import { RiDeleteBin3Fill, RiEditBoxLine } from 'react-icons/ri';
import './SingleTodo.css';
import { motion } from 'framer-motion';

export const SingleTodo = ({ id, text }) => {
  const { todos, setTodos, setIsEdit, todoIsValid } = useTodoContext();

  const handleDelete = (todoId) => {
    const filteredTodo = [...todos].filter((todo) => todo.id !== todoId);
    setTodos(filteredTodo);
  };

  const handleEdit = ({ id }) => {
    const editedTodo = [...todos].find((todo) => todo.id === id);
    setIsEdit(editedTodo);
  };

  return (
    <motion.li
      key={id}
      initial={{ y: -750 }}
      animate={{ y: 10 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
    >
      <p>{text}</p>
      <div className='todo-btns'>
        {todoIsValid && (
          <>
            <RiEditBoxLine
              className='todo-btn-edit'
              onClick={() => handleEdit({ id })}
            />
            <RiDeleteBin3Fill
              className='todo-btn-delete'
              onClick={() => handleDelete(id)}
            />
          </>
        )}
      </div>
    </motion.li>
  );
};
