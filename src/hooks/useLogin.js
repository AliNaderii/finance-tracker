// tools
import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  // login proccess states
  const [ isPending, setIsPending ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ isCancelled, setIsCancelled ] = useState(false);
  // useAuthContext hook
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // login the user
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      // if an error occurred and we didn't get any response
      if (!res) {
        throw new Error('Something went wrong');
      }

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      // if not unmounted, update the states
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    }

    // catch possible errors
    catch (err) {
      console.log(err.message);
      // if not unmounted, update the states
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  // cleanup function in case unmounted
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error };
};

