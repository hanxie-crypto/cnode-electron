import * as types from '../constants';
import * as server from './serveraction';

function getAuthorSuccess(data) {
    return {
        type: types.GETAUTHORSUCCESS,
        author: data,
    };
}

export function getAuthorInfo(authorname) {
    return (dispatch) => {
        return server.makeRequest(`https://cnodejs.org/api/v1/user/${authorname}`, 'get', {})
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                return dispatch(getAuthorSuccess(data));
            });
    };
}