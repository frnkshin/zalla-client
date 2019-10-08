import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, Switch} from 'react-router-dom'
import {Provider} from 'react-redux';
import * as serviceWorker from 'serviceWorker';

import Root from "./controller/Root/Root";
import Linker from 'components/Linker/Linker';
import store from "store";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();
const routes = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/'>
        <Switch>
          <Route exact={true}
                 path="/"
                 component={() => <Root showStatus={false}/>} />
          <Route path="/results/:word"
                 component={() => <Root showStatus={true}/>} />
          <Route path="/:word"
                 component={Linker}/>
        </Switch>
      </Route>
    </Router>
  </Provider>
);


ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
