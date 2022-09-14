import { useEffect, useState } from 'react';
import { onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { colRef, db } from './firebase-config';
import Form from './components/Form';
import Todo from './components/Todo';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubCol = onSnapshot(colRef, snapshot => {
      let todos = [];
      snapshot.docs.forEach(doc => {
        todos.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todos);
    });
    return () => unsubCol();
  }, []);

  const deleteTodo = async id => {
    try {
      const docRef = await doc(db, 'todos', id);
      deleteDoc(docRef);
    } catch (err) {
      console.log('An error occurred: ', err.message);
    }
  };

  const updateTodo = async todo => {
    try {
      const docRef = await doc(db, 'todos', todo.id);
      updateDoc(docRef, todo);
    } catch (err) {
      console.log('An error occurred: ', err.message);
    }
  };

  return (
    <div>
      <h1>Todo List Firebase</h1>
      <Form />
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
};

export default App;
