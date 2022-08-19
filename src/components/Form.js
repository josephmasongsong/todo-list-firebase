import { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import { colRef } from '../firebase-config';

const Form = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const todo = {
        title,
        complete: false,
      };
      await addDoc(colRef, todo).then(() => setTitle(''));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input type="submit" value="add todo" />
    </form>
  );
};

export default Form;
