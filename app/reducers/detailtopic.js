import {
  OPENDETAIL,
  CLOSEDETAIL,
  TOPICDETAILSUCCESS,
  COLLECTSUCCESS,
  DECOLLECTSUCCESS,
  ADDREPLYOP,
}
from '../constants/index';

export default function detailtopic(state = {
  openmodal: false,
  topicdetail: '',
  iscollect: true,

}, action) {
  switch (action.type) {
    case OPENDETAIL:
      return Object.assign({}, state, {
        openmodal: true,
      });
    case CLOSEDETAIL:
      return Object.assign({}, state, {
        openmodal: false,
      });
    case TOPICDETAILSUCCESS:
      return Object.assign({}, state, {
        topicdetail: action.data.data,
        iscollect: action.data.data.is_collect,
      });
    case COLLECTSUCCESS:
      return Object.assign({}, state, {
        iscollect: true,
      });
    case DECOLLECTSUCCESS:
      return Object.assign({}, state, {
        iscollect: false,
      });
    default:
      return state;
  }
}