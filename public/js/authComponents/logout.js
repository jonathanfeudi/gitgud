import React from 'react'
import auth from '../auth'

export default React.createClass({
  componentDidMount : function() {
    auth.logout()
  },

  render : function() {
    return <p>You are now logged out</p>
  }
})
