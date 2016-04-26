import {
    PAGECHANGE,
}
from '../constants/index';


export default function pageination(state = {
    nowpage: 1,
}, action) {
    switch (action.type) {
        case PAGECHANGE:
            return Object.assign({}, state, {
                nowpage: action.nowpage,
            });
        default:
            return state;
    }
}