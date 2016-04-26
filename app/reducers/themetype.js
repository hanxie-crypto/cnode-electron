import {
   CHANGETHEMETYPE
}
from '../constants/index';


export default function themetype(state = {
    themetype: ''
}, action) {
    switch (action.type) {
        case CHANGETHEMETYPE:
            return Object.assign({}, state, {
                themetype: action.themetype,
            });
        default:
            return state;
    }
}