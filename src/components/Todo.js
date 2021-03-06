import { useState } from 'react';

const Todo = ({ todo, deleteTodo, updateTodo }) => {
  const [editable, setEditable] = useState(false);
  const [isChecked, setIsChecked] = useState(todo.complete);
  const [title, setTitle] = useState(todo.title);

  const handleUpdate = () => {
    updateTodo({ ...todo, title });
    setEditable(false);
  };

  const handleUpdateOnKeyDown = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      updateTodo({ ...todo, title });
      setEditable(false);
    }
  };

  const handleCheck = () => {
    updateTodo({ ...todo, complete: !isChecked });
    setIsChecked(!isChecked);
  };

  const todoItem = !editable ? (
    <span style={todo.complete ? { textDecoration: 'line-through' } : {}}>
      {todo.title}
    </span>
  ) : (
    <input
      type="text"
      onChange={e => setTitle(e.target.value)}
      value={title}
      onKeyDown={e => handleUpdateOnKeyDown(e)}
    />
  );

  return (
    <div style={{ marginTop: '5px' }}>
      {todoItem}

      {!todo.complete && (
        <button onClick={() => setEditable(!editable)}>
          {editable ? 'cancel' : 'edit'}
        </button>
      )}

      {editable ? (
        <button onClick={handleUpdate}>save</button>
      ) : (
        <>
          {!todo.complete && (
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
          )}

          <label>
            <input
              type="checkbox"
              name="complete"
              checked={isChecked}
              onChange={handleCheck}
            />
            {!todo.complete ? 'incomplete' : 'complete'}
          </label>
        </>
      )}
    </div>
  );
};

export default Todo;
