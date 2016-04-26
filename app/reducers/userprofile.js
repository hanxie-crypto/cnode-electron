import {
    OPENUSERPROFILE,
    CLOSEUSERPROFILE
}
from '../constants/index';


export default function userprofile(state = {
    openprofile: false
}, action) {
    switch (action.type) {
        case OPENUSERPROFILE:
            return Object.assign({}, state, {
                openprofile: true,
            });
        case CLOSEUSERPROFILE:
            return Object.assign({}, state, {
                openprofile: false,
            });
        default:
            return state;
    }
}