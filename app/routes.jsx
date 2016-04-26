import React from 'react';
import Route from 'react-router';
import App from './containers/App';
import AppChild from './containers/AppChild';

import TopicAdd from './components/TopicAdd';
import UserCollect from './components/UserCollect';
import UserMessage from './components/UserMessage';
export default (
  <Route  component={App}>
    <Route  path="/"  component={AppChild} />
    <Route  path="/topicadd"  component={TopicAdd} />
    <Route  path="/usercollect/:username"  component={UserCollect} />
    <Route  path="/usermessage"  component={UserMessage} />
  </Route>
);
