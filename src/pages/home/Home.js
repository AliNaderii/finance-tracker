// tools
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

// styles && components
import styles from './Home.module.css';
import TransactionForm from './TransactionForm';

export default function Home() {
  // useAuthContext hook
  const { user } = useAuthContext();
  // firestore query params
  const query = [ 'uid', '==', user.uid ];
  const orderBy = [ 'createdAt', 'desc' ];
  // useCollection hook
  const { documents, error } = useCollection('transaction', query, orderBy);
  // useFirestore hook
  const { deleteDoc } = useFirestore('transaction');

  return (
    <div className={ styles.container }>
      <div>
        { documents &&
          documents.map(doc => (
            <div className={ styles.transaction } key={ doc.id }>
              <button onClick={ () => deleteDoc(doc.id) }>X</button>
              <p>{ doc.name }</p>
              <p>{ doc.amount } $</p>
            </div>
          ))
        }
        {/* if there was an error */ }
        { error && <p className='message error'>{ error }</p> }
      </div>
      {/* adding transaction form */ }
      <div>
        { documents &&
          <TransactionForm uid={ user.uid } />
        }
      </div>
    </div>
  );
}
