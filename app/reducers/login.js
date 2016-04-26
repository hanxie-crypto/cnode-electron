import {
    OPENLOGIN,
    CLOSELOGIN,
    LOGINED,
    UNLOGIN,
    ACCESSSUCCESS,
    ACCESSFAIL,
    LOGOUT,
}
from '../constants/index';


export default function login(state = {
    openlogin: false,
    islogin: false,
    user: {},
    tipopen: false,
    tipinfo: '',
}, action) {
    switch (action.type) {
        case CLOSELOGIN:
            return Object.assign({}, state, {
                openlogin: false,
            });
        case OPENLOGIN:
            return Object.assign({}, state, {
                openlogin: true,
            });
        case LOGINED:
            return Object.assign({}, state, {
                islogin: true,
            });
        case UNLOGIN:
            return Object.assign({}, state, {
                islogin: false,
            });
        case ACCESSSUCCESS:
            return Object.assign({}, state, {
                user: action.user,
                islogin: true,
                tipopen: true,
                tipinfo: action.tipinfo,
            });
        case ACCESSFAIL:
            return Object.assign({}, state, {
                tipopen: true,
                tipinfo: action.tipinfo,
            });
        case LOGOUT:
            return Object.assign({}, state, {
                user: {},
                islogin: false,
            });
        default:
            return state;
    }
}