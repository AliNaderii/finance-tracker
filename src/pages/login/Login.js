// tools
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

// styles
import styles from './Login.module.css';

export default function Login() {
  // component states
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  // useLogin hook
  const { login, isPending, error } = useLogin();

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    // login the user
    login(email, password);
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
      {/* messages */ }
      { isPending && <p className='message pending'>Please wait ...</p> }
      { error && <p className='message error'>{ error }</p> }
      {/* submit button */ }
      { !isPending && <button className='btn'>Login</button> }
      { isPending && <button className='btn' disabled>Login</button> }
    </form>
  );
}