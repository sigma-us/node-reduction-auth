import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Register from './register/register';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
