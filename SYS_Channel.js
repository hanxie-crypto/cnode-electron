/**
 * 渲染进程与主进程通信
 */
'use strict';

if (typeof require === 'function') {
    const ipcRenderer = require('electron').ipcRenderer;
    const notifier = require('node-notifier');
    const fs = require('fs');
    const nconf = require('nconf');
    const path = require('path');
    const authorfile = nconf.file({
        file: __dirname + '/author.json'
    });
    const audio = new Audio('./sound/money.wav');
    /**
     * 读取登录信息
     * @return {[type]} [description]
     */
    window.getloginconfig = function() {
            const config = JSON.parse(fs.readFileSync(__dirname + '/author.json', 'utf-8'));
            return config;
    }
    /**
     * 登录成功
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    window.sendloginsuccess = function(data) {
            const authorinfo = data;
            authorfile.set('islogin', true);
            authorfile.set('user', {
                accesstoken: authorinfo.accesstoken,
                avatar_url: authorinfo.avatar_url,
                loginname: authorinfo.loginname,
            });
            authorfile.save(function() {
        
            })


        }
     /**
     * 登出成功
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    window.logoutsuccess = function() {
            authorfile.set('islogin', false);
            authorfile.set('user', {
            });
            authorfile.save(function() {
        
            })


        }
    /**
     * 用户消息通知
     * @return {[type]} [description]
     */
    window.sendusermessage = function(data) {
        audio.currentTime = 0;
        audio.play();
        const nc = new notifier.NotificationCenter();
        nc.notify({
            'title': 'cnod通知',
            'subtitle': data.author.loginname + '回复:',
            'message': data.reply.content,
            'appIcon': data.author.avatar_url,
            'open': 'https://cnodejs.org/topic/' + data.topic.id + '#' + data.reply.id,
        });
    }


}