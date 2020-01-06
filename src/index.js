import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './index.scss'
import Othello from './containers/othello/othello'
import GameList from './containers/gameList/gameList'
import Auth from './containers/auth/auth'

const routes = (
  <Router>
    <Switch>
      <Route path="/othello" component={Othello} />
      <Route path="/list" exact component={GameList} />
      <Route path="/" exact component={Auth} />
    </Switch>
  </Router>
)

ReactDOM.render(routes, document.getElementById('root'))
