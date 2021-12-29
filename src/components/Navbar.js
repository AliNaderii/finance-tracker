import { Link } from 'react-router-dom';

// styles
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={ styles.navbar }>
      <ul>
        <h2 className={ styles.title }>MyMoney</h2>

        <li>
          <Link to='/login' className='btn'>Login</Link>
        </li>
        <li>
          <Link to='/signup' className='btn'>Signup</Link>
        </li>
      </ul>
    </nav>
  );
}
