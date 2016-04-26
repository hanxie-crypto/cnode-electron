import * as types from '../constants';
import * as message from '../info';
import * as load from './loadingaction';
import * as server from './serveraction';
import * as snackbar from './snackbaraction';

/**
 * 打开登录
 * @return {[type]} [description]
 */
export function openLogin() {
        return {
            type: types.OPENLOGIN
        };
    }
    /**
     * 关闭登录
     * @return {[type]} [description]
     */
export function closeLogin() {
        return {
            type: types.CLOSELOGIN
        };
    }
/**
 * 验证成功
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function getAccessSuccess(data) {
    return {
        type: types.ACCESSSUCCESS,
        user: data,
    };
}

function getAccessFail() {
    return {
        type: types.ACCESSFAIL,
    };
}
/**
 * 退出
 * @return {[type]} [description]
 */
export function logOut() {
     return {
        type: types.LOGOUT,
    };
}
export function validateAccessToken(_accesstoken) {
    return (dispatch) => {
        dispatch(load.openLoading());
        return server.makeRequest('https://cnodejs.org/api/v1/accesstoken', 'post', {
                accesstoken: _accesstoken
            })
            .then(function(response) {
                dispatch(load.closeLoading());
                if (response.status >= 400) {
                    dispatch(getAccessFail());
                    dispatch(snackbar.openSnackBar(message.INFO_LOGINFAIL));
                    return null;
                }
                return response.json();
            })
            .then(function(data) {
                if (data) {
                    dispatch(closeLogin());
                    dispatch(snackbar.openSnackBar(message.INFO_LOGINSUCCESS));
                    const user = Object.assign({},data,{accesstoken:_accesstoken});
                    if(window&&typeof window.sendloginsuccess === 'function'){
                        window.sendloginsuccess(user);
                    }
                    return dispatch(getAccessSuccess(user));
                } else {
                    return null;
                }

            });
    };
}