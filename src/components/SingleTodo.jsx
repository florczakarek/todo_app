import { useTodoContext } from '../context/useTodoContext';
import { RiDeleteBin3Fill, RiEditBoxLine } from 'react-icons/ri';
import './SingleTodo.css';

export const SingleTodo = ({ id, text }) => {
  const { todos, setTodos, setIsEdit } = useTodoContext();

  const handleDelete = (todoId) => {
    const filteredTodo = [...todos].filter((todo) => todo.id !== todoId);
    setTodos(filteredTodo);
  };

  const handleEdit = ({ id }) => {
    const editedTodo = todos.find((todo) => todo.id === id);
    setIsEdit(editedTodo);
  };

  return (
    <li key={id}>
      <input type='text' value={text} onChange={(e) => e.preventDefault()} />
      <div className='todo-btns'>
        <RiEditBoxLine
          className='todo-btn-edit'
          onClick={() => handleEdit({ id })}
        />
        <RiDeleteBin3Fill
          className='todo-btn-reset'
          onClick={() => handleDelete(id)}
        />
      </div>
    </li>
  );
};
