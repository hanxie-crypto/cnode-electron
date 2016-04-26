import * as types from '../constants';
import * as load from './loadingaction';
import * as pageinationaction from './pageinationaction';
import * as server from './serveraction';
import * as snackbar from './snackbaraction';
import * as message from '../info';

let DEFAULT_PARAMS = {tab:'all',page:1};




function getMainTopicSuccess(data) {
    return {
        type: types.GETMAINTOPICSUCCESS,
        data: data,
    };
}

function getTopicDetailSuccess(data) {
    return {
        type: types.TOPICDETAILSUCCESS,
        data: data,
    };
}


export function getTopicApi(tab, page) {
    return `https://cnodejs.org/api/v1/topics?mdrender=true&tab=${tab}&page=${page}`;
}

export function openTopicDetail() {
    return {
        type: types.OPENDETAIL,
    };
}
export function closeTopicDetail() {
    return {
        type: types.CLOSEDETAIL,
    };
}
function addTopicSuccess(data) {
    return {
        type: types.ADDTOPICSUCCESS,
        addtopicinfo:data,
    }
}


/**
 * 新增回复
 * @param {[type]} topic_id [description]
 * @param {[type]} data     [description]
 */
export function addReply(topic_id,data) {
    return (dispatch) => {

        return server.makeRequest(`https://cnodejs.org/api/v1/topic/${topic_id}/replies`, 'post', data)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                return dispatch(snackbar.openSnackBar(message.INFO_ADDREPLYSUCCESS));
            });
    };
}
/**
 * 点赞
 * @param  {[type]} reply_id    [description]
 * @param  {[type]} accesstoken [description]
 * @return {[type]}             [description]
 */
export function replayUps(reply_id,accesstoken){
     return server.makeRequest(`https://cnodejs.org/api/v1//reply/${reply_id}/ups`, 'post', {accesstoken:accesstoken})
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                return data;
            });
}   
/**
 * 新增帖子
 * @param {[type]} data [description]
 */
export function addTopic(data) {
     return (dispatch) => {
        dispatch(load.openLoading());
        return server.makeRequest('https://cnodejs.org/api/v1/topics', 'post', data)
            .then(function(response) {
                dispatch(load.closeLoading());
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                dispatch(snackbar.openSnackBar(message.INFO_ADDTOPICSUCCESS));
                return dispatch(addTopicSuccess(data));
            });
    };
}

/**
 * 导航切换
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
export function changeNav(type) {
        return {
            type: types.GETNAVSUCCESS,
            navtype: type,
        };
    }
/**
 * 获得帖子列表
 * @return {[type]} [description]
 */
export function getTopicList(params) {
    DEFAULT_PARAMS = Object.assign({},DEFAULT_PARAMS,params);
    return (dispatch) => {
        dispatch(load.openLoading());
        dispatch(pageinationaction.changePage(DEFAULT_PARAMS.page));
        return server.makeRequest(getTopicApi(DEFAULT_PARAMS.tab, DEFAULT_PARAMS.page), 'get', {})
            .then(function(response) {
                dispatch(load.closeLoading());
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                return dispatch(getMainTopicSuccess(data));
            });
    };
}
export function getTopicListByName(name) {
    return (dispatch) => {
        dispatch(load.openLoading());
        return server.makeRequest(`https://cnodejs.org/api/v1/topic_collect/${name}`, 'get', {})
            .then(function(response) {
                dispatch(load.closeLoading());
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                return dispatch(getMainTopicSuccess(data));
            });
    };
}
/**
 * 获得帖子详情
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export function getTopicDetail(id,accesstoken) {
    return (dispatch) => {
        return server.makeRequest(`https://cnodejs.org/api/v1/topic/${id}?mdrender=true&accesstoken=${accesstoken}`, 'get', {})
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                dispatch(getTopicDetailSuccess(data))
                return dispatch(openTopicDetail());
            });
    };
}