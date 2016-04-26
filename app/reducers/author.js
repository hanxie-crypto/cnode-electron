import {
  GETAUTHORSUCCESS,
}
from '../constants/index';

export default function author(state = {
  author: {},
}, action) {
  switch (action.type) {
    case GETAUTHORSUCCESS:
      return Object.assign({}, state, {
        author: action.author.data,
      });
    default:
      return state;
  }
}