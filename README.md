# cnode-electron
用electron 结合 react 以及[material-ui ](http://www.material-ui.com/#/components/grid-list)  </br>
根据node中文社区提供的api制作的node中文社区客户端</br>


![Alt text](https://github.com/wq123456/cnode-electron/blob/master/preview/1.png)
![Alt text](https://github.com/wq123456/cnode-electron/blob/master/preview/2.png)
![Alt text](https://github.com/wq123456/cnode-electron/blob/master/preview/3.png)
![Alt text](https://github.com/wq123456/cnode-electron/blob/master/preview/4.png)
![Alt text](https://github.com/wq123456/cnode-electron/blob/master/preview/5.png)
![Alt text](https://github.com/wq123456/cnode-electron/blob/master/preview/6.png)

[windows 64版本下载 ](http://pan.baidu.com/s/1dFC2kQP)</br>
[mac 64版本下载 ](http://pan.baidu.com/s/1hrMppTM)</br>
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

最近收到打包的问题，我这边用的一种简单的办法 </br>
下载官网发布的demo然后修改</br>
官网发布地址 https://github.com/electron/electron/releases/ </br>
比如你想在mac 上 发布应用,下载 electron-v1.3.3-darwin-x64.zip </br>
解压后 右键 electron 显示包内容 </br>
在 Contents->Resources 创建 app 文件夹 </br>
然后把自己项目用到的依赖以及资源文件放到里面就可以 </br>
之后再去修改 electron 变成自己的应用名 </br>
windows上同理官方提供的模板中把自己的内容放在resources文件夹里 </br>
![Alt text](https://github.com/wq123456/cnode-electron/blob/master/preview/packshow1.jpg) </br>
![Alt text](https://github.com/wq123456/cnode-electron/blob/master/preview/packshow2.jpg) </br>
这种方式好处是不会受权限限制，但是因为你的源码也会暴露出来，有些敏感信息也需要去加密。所以应用上线可能还需要用其他的办法。




