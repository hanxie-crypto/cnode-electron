import * as types from '../constants';
import * as server from './serveraction';

/**
 * 收藏主题成功
 * @return {[type]} [description]
 */
export function collectionsuccess() {
    return {
        type: types.COLLECTSUCCESS
    };
}
/**
 * 取消收藏主题成功
 * @return {[type]} [description]
 */
export function decollectionsuccess() {
    return {
        type: types.DECOLLECTSUCCESS
    }
}

/**
 * 收藏主题
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function collect(data) {
     return (dispatch) => {
        return server.makeRequest('https://cnodejs.org/api/v1/topic_collect/collect', 'post', data)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                return dispatch(collectionsuccess());
            });
    };
}

/**
 * 取消收藏主题
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function decollect(data) {
     return (dispatch) => {
        return server.makeRequest('https://cnodejs.org/api/v1/topic_collect/de_collect', 'post', data)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                return dispatch(decollectionsuccess());
            });
    };
}