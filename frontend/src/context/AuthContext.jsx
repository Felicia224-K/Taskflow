/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  token: null,
  loading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, user: action.user, token: action.token, loading: false };
    case 'LOGIN':
      return { ...state, user: action.user, token: action.token };
    case 'LOGOUT':
      return { ...state, user: null, token: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    dispatch({
      type: 'INIT',
      token: token || null,
      user: user ? JSON.parse(user) : null,
    });
  }, []);

  const login = useCallback((newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    dispatch({ type: 'LOGIN', token: newToken, user: newUser });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}