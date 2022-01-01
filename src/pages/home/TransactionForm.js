// tools
import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

// styles 
import styles from './TransactionForm.module.css';

export default function TransactionForm({ uid }) {
  // form states
  const [ name, setName ] = useState('');
  const [ amount, setAmount ] = useState('');
  // useFirestore hook
  const { addDoc, response } = useFirestore('transaction');

  // submit transaction form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, amount });
    // add the doc
    addDoc({ name, amount, uid });
  };

  // reset the form
  useEffect(() => {
    if (response.success) {
      setName('');
      setAmount('');
    }
  }, [ response.success ]);

  return (
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
  );
}
