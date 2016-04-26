import * as types from '../constants';
import * as server from './serveraction';
import * as snackbar from './snackbaraction';
import * as message from '../info';
let global_messagecount = 0;
/**
 * 获取未读消息成功
 * @param  {[type]} count [description]
 * @return {[type]}       [description]
 */
function getMessageCountSuccess(count) {
    return {
        type: types.GETMESSAGECOUNTSUCCESS,
        count: count,
    };
}


function getUserMessageSuccess(data) {
        return {
            type: types.GETUSERMESSAGESUCCESS,
            usermessage: data.data,
        }
    }
/**
 * 标记为全部已读
 * @param  {[type]} accesstoken [description]
 * @return {[type]}             [description]
 */
export function markAll(accesstoken) {
    return (dispatch) => {
        return server.makeRequest('https://cnodejs.org/api/v1/message/mark_all', 'post', {accesstoken:accesstoken})
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                return  dispatch(snackbar.openSnackBar(message.INFO_MARKALLSUCCESS));;
            });
    };
}
/**
 * 获取未读消息
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function getMessageCount(accesstoken) {
    return (dispatch) => {
        return server.makeRequest(`https://cnodejs.org/api/v1/message/count?accesstoken=${accesstoken}`, 'get', {})
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                return dispatch(getMessageCountSuccess(data.data));
            });
    };
}

/**
 * 获取已读和未读的消息
 * @param  {[type]} accesstoken [description]
 * @return {[type]}             [description]
 */
export function getUserMessage(accesstoken) {
    return (dispatch) => {
        return server.makeRequest(`https://cnodejs.org/api/v1/messages?accesstoken=${accesstoken}&mdrender=false`, 'get', {})
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                if (window && (typeof window.sendusermessage === 'function')) {
                    let hasnot_read_messages = data.data.hasnot_read_messages || [];
                    let notredlength = hasnot_read_messages.length;
                    if (notredlength > global_messagecount) {
                        let noredmessage = hasnot_read_messages[notredlength - 1];
                        window.sendusermessage(noredmessage);
                        global_messagecount = notredlength;
                    }
                }
                return dispatch(getUserMessageSuccess(data));
            });
    };
}