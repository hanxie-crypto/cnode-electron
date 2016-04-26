

import * as types from '../constants';

export function changeThemeType(type) {
    return {
        type: types.CHANGETHEMETYPE,
        themetype: type,
    };
}