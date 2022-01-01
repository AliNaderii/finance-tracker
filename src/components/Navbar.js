// tools
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

// styles
import styles from './Navbar.module.css';

export default function Navbar() {
  // useAuthContext hook
  const { user } = useAuthContext();
  // useLogout hook
  const { logout } = useLogout();
  // useNavigate hook
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    // redirect the user to login page
    navigate('/login');
  };

  return (
    <nav className={ styles.navbar }>
      <ul>
        <h2 className={ styles.title }>MyMoney</h2>

        {/* if a user was logged in show the logout button */ }
        { user &&
          <button onClick={ handleClick }>Logout</button> }
        {/* if there was no user show the login and signup buttons */ }
        { !user && <li>
          <Link to='/login' className='btn'>Login</Link>
        </li> }
        { !user && <li>
          <Link to='/signup' className='btn'>Signup</Link>
        </li> }

      </ul>
    </nav>
  );
}
