import { combineReducers } from 'redux';
import maintopic from './maintopic';
import detailtopic from './detailtopic';
import userprofile from './userprofile';
import login from './login';
import pageination from './pageination';
import author from './author';
import snackbar from './snackbar';
import themetype from './themetype';
import message from './message';
import { routeReducer as routing } from 'redux-simple-router';

const rootReducer = combineReducers({
  routing,
  detailtopic,
  maintopic,
  userprofile,
  login,
  pageination,
  author,
  snackbar,
  themetype,
  message,
});

export default rootReducer;
