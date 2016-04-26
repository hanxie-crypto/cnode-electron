import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes.jsx';
injectTapEventPlugin();


const store = configureStore();//配置store
const history = createBrowserHistory();

syncReduxAndRouter(history, store);

render(
  <Provider store={store}>
    <Router >
      {routes}
    </Router>
  </Provider>, document.getElementById('app'));
