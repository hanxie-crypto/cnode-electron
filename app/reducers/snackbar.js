import {
  OPENSNACKBAR,
  CLOSESNACKBAR,
}
from '../constants/index';

export default function snackbar(state = {
    tipopen: false,
    tipinfo: '',
}, action) {
    switch (action.type) {
        
        case OPENSNACKBAR:
            return Object.assign({}, state, {
                tipopen: true,
                tipinfo: action.message,
            });
        case CLOSESNACKBAR:
            return Object.assign({}, state, {
                tipopen: false,
                tipinfo: action.message,
            });
        default:
            return state;
    }
}