import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './components/auth/Auth';
import AuthContext from './context/auth-context';
import Homepage from './components/Homepage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
            <main className="main-content">
              <Switch>
                <Route exact path="/" component={ AuthPage } />
                <Route path="/home" component={ Homepage } />
              </Switch>
            </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App; 