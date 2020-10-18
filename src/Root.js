import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './Components/Login'
import withAuth from './Components/withAuth'

const Root = ({ store }) => (
  <Provider store={store}>
      <Router>
          <div>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/home" component={withAuth(App)} />
            </Switch>
          </div>
      </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root