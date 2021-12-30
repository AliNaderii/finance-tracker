// tools
import { useState } from 'react';

// styles
import styles from './Signup.module.css';

export default function Signup() {
  // component states
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ displayName, setDisplayName ] = useState('');

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, displayName);
  };

  return (
    <form className={ styles[ 'signup-form' ] } onSubmit={ handleSubmit }>
      <h2>Sign up</h2>
      {/* email input */ }
      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          onChange={ (e) => setEmail(e.target.value) }
          value={ email }
        />
      </label>
      {/* password input */ }
      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          onChange={ (e) => setPassword(e.target.value) }
          value={ password }
        />
      </label>
      {/* display name */ }
      <label>
        <span>Display name:</span>
        <input
          type="text"
          onChange={ (e) => setDisplayName(e.target.value) }
          value={ displayName }
        />
      </label>
      {/* submit button */ }
      <button className='btn'>Signup</button>
    </form>
  );
}