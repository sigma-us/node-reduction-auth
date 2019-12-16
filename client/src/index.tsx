import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Register from './register/register';
import Confirm from './register/confirm';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store from "./redux/reducers/reducers";


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
      <Provider store={store}>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/register" exact component={Register} />
          <Route path="/register/confirm" exact component={Confirm} />
        </Switch>
      </Provider>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
