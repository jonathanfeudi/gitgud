import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'


import SignUp from './authComponents/signup'
import Login from './authComponents/login'
import Logout from './authComponents/logout'

import auth from './auth'

const App = React.createClass({
  getInitialState : function() {
    return {
      loggedIn: auth.loggedIn(),
    }
  },

  updateAuth : function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount : function() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render : function() {
    return (
      <div className="row">
        <div className="twelve columns">
          <ul id="nav">
            <li>
              {this.state.loggedIn ? (
                <div>
                  <button><Link to="/logout"> Log out </Link></button>
                </div>
              ) : (
                <div>
                  <button><Link to="/login"> Sign in </Link></button>
                  <button><Link to="/signup"> Sign Up </Link></button>
                </div>
              )}
            </li>
          </ul>
          {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
        </div>
      </div>
    )
  }
})

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="signup" component={SignUp} />
    </Route>
  </Router>
), document.getElementById('container'))
