
import React from 'react';
import Login from '../Login/Login';

export function AuthGuard({ children, authed }) {
  return authed === true ? children : <Login />
    ;
}
