// tools
import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  // signup proccess states
  const [ error, setError ] = useState(null);
  const [ isPending, setIsPending ] = useState(false);
  const [ isCancelled, setIsCancelled ] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // signup the user with firebase
      const res = await projectAuth.createUserWithEmailAndPassword(email, password);
      // in case an error occurred
      if (!res) {
        throw new Error('Something went wrong');
      }

      // set user displayName
      await res.user.updateProfile({ displayName });
      console.log(email, password, displayName);

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    }
    // catch possible errors
    catch (err) {
      console.log(err.message);
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  // cleanup if unmounted
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
