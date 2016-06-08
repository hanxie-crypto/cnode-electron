# cnode-electron
用electron 结合 react 以及[material-ui ](http://www.material-ui.com/#/components/grid-list)  </br>
根据node中文社区提供的api制作的node中文社区客户端</br>


![Alt text](https://github.com/wq123456/cnode-electron/blob/master/preview/1.png)
![Alt text](https://github.com/wq123456/cnode-electron/blob/master/preview/2.png)
![Alt text](https://github.com/wq123456/cnode-electron/blob/master/preview/3.png)
![Alt text](https://github.com/wq123456/cnode-electron/blob/master/preview/4.png)
![Alt text](https://github.com/wq123456/cnode-electron/blob/master/preview/5.png)
![Alt text](https://github.com/wq123456/cnode-electron/blob/master/preview/6.png)

[windows 64版本下载 ](http://pan.baidu.com/s/1sl7Ue7N)</br>
[mac 64版本下载 ](http://pan.baidu.com/s/1hrORjSg)</br>
使用方法:</br>
浏览器开发</br>
1 git clone https://github.com/wq123456/cnode-electron.git </br>
2 cd cnode-electron & npm install </br>
3 npm run dev </br>
4 打开浏览器 http://127.0.0.1:3000</br>

electron 预览</br>

1 注释掉 app/store/configureStore.js 里面的 devtools() </br>
2 运行 npm run buildapp 重新构建app.js </br>
3 npm start 启动 electron </br>

发布: </br>

1 从node_modules/electron-prebuild/dist 中复制Electron.app到任意目录</br>
2 mac上显示包内容，找到Resources 文件，创建 app文件，然后把css ,index.html,sound,main.js,SYS_Channel.js,author.json,app.js复制到app文件中退出。（windows也有resources）</br>
3 双击Elecron.app 即可看到效果。然后可以自行更改文件名图标等 </br>
ps: 官方的asar方法打包限制太多，不好使。 npm install 安装electron-prebuilt可能会失败，建议单独对其进行安装


