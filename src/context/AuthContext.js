// tools
import { createContext, useReducer, useEffect } from 'react';
import { projectAuth } from '../firebase/config';

// create the context
export const AuthContext = createContext();

// reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  // reducer state
  const [ state, dispatch ] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  });

  // when user signed up or logged in
  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
      unsub();
    });
  }, []);

  console.log(state);

  // context provider 
  return (
    < AuthContext.Provider value={ { ...state, dispatch } }>
      { children }
    </AuthContext.Provider >
  );
};