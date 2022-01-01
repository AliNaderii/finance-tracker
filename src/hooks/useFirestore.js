// tools
import { useState, useEffect, useReducer } from 'react';
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        document: null, isPending: true, error: null, success: false
      };
    case 'ADDED_DOC':
      return {
        document: action.payload, isPending: false, error: null, success: true
      };
    case 'DELETED_DOC':
      return {
        document: null, isPending: false, error: action.payload, success: true
      };
    case 'ERROR':
      return {
        document: null, isPending: false, error: action.payload, success: false
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [ response, dispatch ] = useReducer(firestoreReducer, initialState);
  const [ isCancelled, setIsCancelled ] = useState(false);
  // collection refrence
  const ref = projectFirestore.collection(collection);

  // dispatch action if not unmounted
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add doc to database
  const addDoc = async (doc) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      // create a timestamp for doc
      const createdAt = timestamp.fromDate(new Date());
      // add the doc
      const addedDoc = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({ type: 'ADDED_DOC', payload: addedDoc });
    }

    // catch possible errors
    catch (err) {
      console.log(err.message);
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  // delete a doc
  const deleteDoc = async (id) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({ type: 'DELETED_DOC' });
    }
    // catch possible errors
    catch (error) {
      console.log(error.message);
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete' });
    }

  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDoc, deleteDoc, response };
};