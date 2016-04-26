import * as types from '../constants';

export function openLoading() {
    return {
        type: types.OPENLOADING
    };
}

export function closeLoading() {
    return {
        type: types.CLOSELOADING
    }
}