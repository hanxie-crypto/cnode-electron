import * as types from '../constants';




function getPageTopicSuccess(data) {
    return {
        type: types.GETMAINTOPICSUCCESS,
        data: data,
    };
}


export function changePage(nowpage) {
    return {
        type: types.PAGECHANGE,
        nowpage: nowpage,
    }
}
