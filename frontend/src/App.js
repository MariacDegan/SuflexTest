import React, {Fragment, useState, useEffect} from 'react'

import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import Dashboard from "./Components/dashboard";
import Login from "./Components/login";
import Register from "./Components/register";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (Boolean) => {
    setIsAuthenticated(Boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:3000/auth/is-verify",{
        method:"GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth()
  })

  return (
    <Fragment>
      <Router>
        <div className="container">
        <Switch>
          <Route exact path="/login" render={props => 
            !isAuthenticated ? (
               <Login {...props} setAuth={setAuth} /> ) : ( 
               <Redirect to="/dashboard"/>)
               } />
          <Route exact path="/register" render={props => 
            !isAuthenticated ? (
              <Register {...props} setAuth={setAuth} /> ) : (
              <Redirect to="/login" /> )
          } />
          <Route exact path="/dashboard" render={props => 
            isAuthenticated ? ( 
              <Dashboard {...props} setAuth={setAuth} /> ) : (
              <Redirect to="/login" /> )
          } />
        </Switch>
        </div>
      </Router>
    </Fragment>
  )
}

export default App;
