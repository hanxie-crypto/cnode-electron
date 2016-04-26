import * as types from '../constants';

/**
 * 开启消息
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
export function openSnackBar(message) {
    return {
        type: types.OPENSNACKBAR,
        message: message,
    };
}

/**
 * 关闭消息
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
export function closeSnackBar() {
    return {
        type: types.CLOSESNACKBAR,
        message: '',
    };
}