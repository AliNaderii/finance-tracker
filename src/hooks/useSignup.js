// tools
import { useState } from 'react';
import { projectAuth } from '../firebase/config';

export const useSignup = () => {
  // signup proccess states
  const [ user, setUser ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ isPending, setIsPending ] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null);

    try {
      setIsPending(true);
      // signup the user with firebase
      const res = await projectAuth.createUserWithEmailAndPassword(email, password);
      // in case an error occurred
      if (!res) {
        throw new Error('Something went wrong');
      }
      console.log(res);

      // set user displayName
      await res.user.updateProfile({ displayName });
      console.log(email, password, displayName);

      setUser(res);
      setError(null);
      setIsPending(false);
    }
    // catch possible errors
    catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { signup, user, error, isPending };
};
