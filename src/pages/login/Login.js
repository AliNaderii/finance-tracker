// tools
import { useState } from 'react';

// styles
import styles from './Login.module.css';

export default function Login() {
  // component states
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <form className={ styles[ 'login-form' ] } onSubmit={ handleSubmit }>
      <h2>Login</h2>
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
      {/* submit button */ }
      <button className='btn'>Login</button>
    </form>
  );
}