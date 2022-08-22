import { RiDeleteBin3Fill, RiEditBoxLine } from 'react-icons/ri';

export const TodoList = ({ todos, setTodos, isEdit, setIsEdit }) => {
  const handleDelete = (todoId) => {
    const filteredTodo = [...todos].filter((todo) => todo.id !== todoId);
    setTodos(filteredTodo);
  };

  const handleEdit = ({ id }) => {
    const editedTodo = todos.find((todo) => todo.id === id);
    setIsEdit(editedTodo);
  };

  return (
    <ul className='todo-list'>
      {todos.map((todo) => {
        const { id, text } = todo;
        return (
          <li key={id}>
            <input
              type='text'
              value={text}
              onChange={(e) => e.preventDefault()}
            />
            <div>
              <button
                className='btn-edit'
                type='button'
                onClick={() => handleEdit(todo)}
              >
                <RiEditBoxLine />
              </button>
              <button
                className='btn-reset'
                type='button'
                onClick={() => handleDelete(id)}
              >
                <RiDeleteBin3Fill />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
