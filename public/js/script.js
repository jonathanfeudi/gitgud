const React = require('react');
const render = require('react-dom').render;
const browserHistory = require('react-router').browserHistory;
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;

const SignUp = require('./authComponents/signup')
const Login = require('./authComponents/login');
const Logout = require('./authComponents/logout');

const auth = require('./auth');

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
