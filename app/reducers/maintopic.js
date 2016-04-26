import {
  GETMAINTOPICSUCCESS,
  GETNAVSUCCESS,
  OPENLOADING,
  CLOSELOADING,
  ADDTOPICSUCCESS,
}
from '../constants/index';

export default function maintopic(state = {
  topiclist: [],
  loading: 'block',
  addtopicinfo: {},
}, action) {
  switch (action.type) {
    case GETMAINTOPICSUCCESS:
      return Object.assign({}, state, {
        topiclist: action.data.data,
      });
    case OPENLOADING:
      return Object.assign({}, state, {
        loading: 'block',
      });
    case CLOSELOADING:
      return Object.assign({}, state, {
        loading: 'none',
      });
    case ADDTOPICSUCCESS:
      return Object.assign({}, state, {
        addtopicinfo: action.addtopicinfo,
      });
    default:
      return state;
  }
}