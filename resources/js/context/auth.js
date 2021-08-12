import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
  id : null
};

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  id : null,
  login: (userData) => {},
  logout: () => {}
});

function authReducer(state, action) {

  console.log("=========1.2========");
  console.log(action.payload);
  //const user_id =  action.payload["id"];
  console.log("=========1.3========");
  //console.log(user_id);

  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        id:action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    console.log("=========1.1========");
    console.log(userData);
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, id : state.id, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
