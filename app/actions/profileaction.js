import * as types from '../constants';

/**
 * 打开简介
 * @return {[type]} [description]
 */
export function openProfile() {
    return {
        type: types.OPENUSERPROFILE
    };
}
/**
 * 关闭简介
 * @return {[type]} [description]
 */
export function closeProfile() {
    return {
        type: types.CLOSEUSERPROFILE
    };
}