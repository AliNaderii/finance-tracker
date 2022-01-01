// tools
import { useState, useEffect } from 'react';
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  // custom hook states
  const [ isPending, setIsPending ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ isCancelled, setIsCancelled ] = useState(false);
  // useAuthContext hook
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // logout the user
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: 'LOGOUT' });

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

  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};