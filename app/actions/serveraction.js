import fetch from 'isomorphic-fetch';
export function makeRequest(api, method, data) {
    if (method === 'get') {
        return fetch(api, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    } else {
        return fetch(api, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}