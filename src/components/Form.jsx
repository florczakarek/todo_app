import { useEffect, useRef, useState } from 'react';
import { useTodoContext } from '../context/useTodoContext';
import { v4 as uuid } from 'uuid';
import './Form.css';

export const Form = () => {
  const { todo, setTodo, todos, setTodos, isEdit, setIsEdit } =
    useTodoContext();

  const [enteredTodoTouched, setEnteredTodoTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [todoIsValid, setTodoIsValid] = useState(false);
  const [alert, setAlert] = useState('');

  const todoRef = useRef();

  useEffect(() => {
    todoRef.current.focus();
  }, [isEdit]);

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

  const handleBlur = (e) => {
    const pattern = /^[^0-9]/;

    setEnteredTodoTouched(true);

    if (todo.trim() === '') {
      validateAlert('Field is required');
    } else if (
      (todo.length > 0 && todo.includes('@', 1)) ||
      todo.includes('#', 1) ||
      todo.includes('%', 1)
    ) {
      validateAlert('Field cannot include special characters like @,#,%');
    } else if (!pattern.test(todo)) {
      validateAlert('Field cannot start with number');
    }
  };

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
      setTodo(isEdit.text);
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

    if (!todoIsValid) {
      validateAlert('Field required');
      return;
    }

    setTodoIsValid(true);

    if (!isEdit) {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodo('');
      todoRef.current.focus();
    } else {
      editTodo(todo, isEdit.id);
    }

    setEnteredTodoTouched(false);
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
          ref={todoRef}
          placeholder='Enter your todo...'
          value={todo}
          onChange={handleTodo}
          onBlur={handleBlur}
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
