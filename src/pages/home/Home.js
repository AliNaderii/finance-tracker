// tools
import { useState } from 'react';

// styles
import styles from './Home.module.css';

export default function Home() {
  // form states
  const [ name, setName ] = useState('');
  const [ amount, setAmount ] = useState('');

  // submit transaction form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, amount });
  };

  return (
    <div className={ styles.container }>
      <div>
        <div className={ styles.transaction }>
          <p>New Dress for Peach</p>
          <p>$150</p>
        </div>
        <div className={ styles.transaction }>
          <p>New Dress for Peach</p>
          <p>$150</p>
        </div>
        <div className={ styles.transaction }>
          <p>New Dress for Peach</p>
          <p>$150</p>
        </div>
      </div>
      {/* adding transaction form */ }
      <form className={ styles[ 'transaction-form' ] } onSubmit={ handleSubmit }>
        <h3>Add transaction</h3>
        {/* transaction name input */ }
        <label>
          <span>Transaction Name</span>
          <input
            type="text"
            required
            onChange={ (e) => setName(e.target.value) }
            value={ name }
          />
        </label>
        {/* transaction amount input */ }
        <label>
          <span>Amount ($)</span>
          <input
            type="text"
            required
            onChange={ (e) => setAmount(e.target.value) }
            value={ amount }
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </div>
  );
}
