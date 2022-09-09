import { useEffect, useState } from 'react';
import { useTodoContext } from '../context/useTodoContext';
import { v4 as uuid } from 'uuid';
import './Form.css';

export const Form = () => {
  const {
    todo,
    setTodo,
    todos,
    setTodos,
    isEdit,
    setIsEdit,
    todoIsValid,
    setTodoIsValid,
  } = useTodoContext();

  const [enteredTodoTouched, setEnteredTodoTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [alert, setAlert] = useState('');

  const handleTodo = (e) => {
    const { value } = e.target;

    setTodo(value);
    if (value.trim() !== '') {
      setTodoIsValid(true);
    }
  };

  useEffect(() => {
    if (todoIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [todoIsValid]);

  const validateAlert = (msg) => {
    setTodoIsValid(false);
    setAlert(msg);
  };

  const editTodo = (text, id) => {
    const newTodo = [...todos].map((todo) =>
      todo.id === id ? { text, id } : todo
    );
    setTodos(newTodo);
    setIsEdit('');
  };

  useEffect(() => {
    if (isEdit) {
      setTodo(isEdit.text.trim());
    } else {
      setTodo('');
    }
  }, [setTodo, isEdit]);

  const handleAdd = (e) => {
    e.preventDefault();
    const newTodo = {
      id: uuid(),
      text: todo,
    };
    setEnteredTodoTouched(true);

    const pattern = /^[^0-9]/;

    if (todo.trim() === '') {
      validateAlert('Field is required');
      return;
    } else if (
      (todo.length > 0 && todo.includes('@', 1)) ||
      todo.includes('#', 1) ||
      todo.includes('%', 1)
    ) {
      validateAlert('Field cannot include special characters like @,#,%');
      return;
    } else if (!pattern.test(todo.trim())) {
      validateAlert('Field cannot start with number');
      return;
    }

    setTodoIsValid(true);

    if (!isEdit) {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodo('');
    } else {
      editTodo(todo, isEdit.id);
    }

    setEnteredTodoTouched(false);
    setAlert('');
  };

  const nameInputIsInvalid = !todoIsValid && enteredTodoTouched;

  const inputClass = !nameInputIsInvalid
    ? 'form-control'
    : 'form-control invalid';

  return (
    <>
      <h2>Todo List</h2>
      <form className={inputClass} onSubmit={handleAdd}>
        <input
          className='form-input'
          type='text'
          placeholder='Enter your todo...'
          value={todo}
          onChange={handleTodo}
        />
        <button disabled={!formIsValid} className='form-btn' type='submit'>
          {!isEdit ? 'Add' : 'Edit'}
        </button>
      </form>
      <div className='form-validation-warning'>
        {nameInputIsInvalid && alert}
      </div>
    </>
  );
};
