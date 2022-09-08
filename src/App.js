import { Form } from './components/Form';
import { TodoList } from './components/TodoList';
import { useTodoContext } from './context/useTodoContext';

function App() {
  const { todos } = useTodoContext();

  return (
    <div className='container'>
      <Form />
      {todos && todos.length > 0 ? (
        <div className='content'>
          <TodoList />
        </div>
      ) : (
        <p>
          you can relax now... <span>🛀</span>
        </p>
      )}
    </div>
  );
}

export default App;
