// tools
import { useState, useEffect, useRef } from 'react';
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [ documents, setDocuments ] = useState(null);
  const [ error, setError ] = useState(null);

  // if we dont use refrence --> infinit loop
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  // get data
  useEffect(() => {
    // collection refrence
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsub = ref.onSnapshot(snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => results.push({ ...doc.data(), id: doc.id }));

      // update states
      setDocuments(results);
      setError(null);
    },
      // catch possible errors
      error => {
        console.log(error);
        setError(error);
      });

    // cleanup function
    return () => unsub();
  }, [ collection, query, orderBy ]);


  return { documents, error };
};