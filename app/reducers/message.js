import {
    GETMESSAGECOUNTSUCCESS,
    GETUSERMESSAGESUCCESS,
}
from '../constants/index';

export default function message(state = {
    count: 0,
    usermessage: {},
}, action) {
    switch (action.type) {
        case GETMESSAGECOUNTSUCCESS:
            return Object.assign({}, state, {
                count: action.count,
            });
        case GETUSERMESSAGESUCCESS:
            return Object.assign({}, state, {
                usermessage: action.usermessage,
            });
        default:
            return state;
    }
}