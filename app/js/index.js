'use strict';

if (typeof require === 'function') {
    const ipcRenderer = require('electron').ipcRenderer;


    window.sendloginsuccess = function(data) {
        ipcRenderer.send('loginsuccess', JSON.stringify(data));
    }

}