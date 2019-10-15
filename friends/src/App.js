import React from 'react';
import { Route, NavLink, withRouter, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Friends from './components/Friends';

import './App.css';

function App(props) {
  const onLogout = () => {
    // Implement!
    // 1- We need to flush token from local storage
    localStorage.clear();
    // 2- We need to redirect users to login route
    props.history.replace('/');
  };
  return (
    <div className="App">
           <nav>
        <span>
          <NavLink exact to='/api/login'>Login</NavLink>
          <NavLink to='/friends'>Friends</NavLink>
        </span>

        <button onClick={onLogout}>Logout</button>
      </nav>

      <main>
        <Route
          exact
          path='/api/login'
          component={Login}
        />

        {/* (OPTION B) Create a secure Route for Quotes.
        Alternatively, we could have the Quotes component
        itself handle the redirect if no token. */}
        <Route
          exact
          path='/friends'
          render={props => {
            if (localStorage.getItem('payload')) {
              return <Friends {...props} />
            }
            return <Redirect to='/api/login' />
          }}
        />
      </main>

    </div>
  );
}

export default withRouter(App);
