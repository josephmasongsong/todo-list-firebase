import { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import { colRef } from '../firebase-config';

const Form = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const todo = {
      title,
      complete: false,
    };

    try {
      await addDoc(colRef, todo);
      setTitle('');
    } catch (err) {
      console.log('An error occurred: ', err.message);
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
      <input type="submit" value="add todo" style={{ marginLeft: '5px' }} />
    </form>
  );
};

export default Form;
