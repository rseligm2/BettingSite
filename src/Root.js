import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import App from './App'
import Login from './Components/Login'
import withAuth from './Components/withAuth'
import Topmenu from './Components/Topmenu'


function Root({ store }){

    return(
        <Provider store={store}>
            <div>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route path="/" component={withAuth(App)} />
                </Switch>
            </div>
        </Provider>
    )
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root