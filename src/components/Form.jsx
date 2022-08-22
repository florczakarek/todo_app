import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export const Form = ({ todo, setTodo, todos, setTodos, isEdit, setIsEdit }) => {
  //
  const handleTodo = (e) => {
    setTodo(e.target.value);
  };

  const editTodo = (text, id) => {
    const newTodo = todos.map((todo) => (todo.id === id ? { text, id } : todo));
    setTodos(newTodo);
    setIsEdit('');
  };

  useEffect(() => {
    if (isEdit) {
      setTodo(isEdit.text);
    } else {
      setTodo('');
    }
  }, [setTodo, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: uuid(),
      text: todo,
    };

    if (!isEdit) {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodo('');
      console.log(newTodo);
    } else {
      editTodo(todo, isEdit.id);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className='form-input'
          type='text'
          placeholder='Enter your todo...'
          value={todo}
          onChange={handleTodo}
        />
        <button className='btn-add' type='submit'>
          {!isEdit ? 'Add' : 'Edit'}
        </button>
      </form>
    </div>
  );
};
