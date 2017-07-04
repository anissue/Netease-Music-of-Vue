# SoulBeats音乐播放器

> 基于vue的SPA(sing page application)单页面应用,PC端
> 技术栈:vue+vue-router+axios+mdui+stylus
> [点击预览](http://112.74.202.2) 请务必配合chrome桌面端进行食用
> [前往github](https://github.com/hackerwen/SoulBeats-Online)

1. Vue-router实现路由切换.
2. axios发送http请求.
3. mdui作界面ui.
4. stylus作css预处理.
5. 初始化数据通过html5提供的localstorage.

没有用vuex的原因是这是自己的第一个vue项目,秉承着由难到易的原则,组件间的通信还没写过几次,现在就上手vuex自己心里不舒服.当然以后会用vuex重构.
###实现功能：
1. 热门歌单
2. 本地搜藏
3. 搜索
4. 在线播放
5. 上/下一曲
6. 播放模式（顺序播放、循环播放、单曲循环、列表循环）
7. 音量调节
8. 进度调节
9. 其中7,8基于html5 audio控件重写

### 预计添加功能：
1. 播放页面
2. 歌词同步
3. 主题切换
4. 滑动至底部加载

### 遇到的问题
1. 父子组件之间的通信(emit)
2. 数据获取异步渲染([vue-router-数据获取](https://router.vuejs.org/zh-cn/advanced/data-fetching.html))
3. keep-alive会对localstorage造成影响=>有选择性的keep-alive不同router-view([github issue](https://github.com/vuejs/vue-router/issues/811)或者[点击这里](https://segmentfault.com/a/1190000008123035))
4. 动态路由匹配([vue-router-动态路由匹配](https://router.vuejs.org/zh-cn/essentials/dynamic-matching.html))
5. npm run build 后发布至服务器图标字体以及静态图片失效,其实我现在还是不能很好的理解打包后的路径问题,如有好的文章请分享一二([解决办法](https://github.com/vuejs-templates/webpack/issues/166))
6. 之前不同组件公用的方法是复制一遍(- -!!),现在挂载到了Vue.prototype上

7. vue的api真的十分完善，基本你能碰到的问题api里大部分都能找到.
8. h5播放控件的重写


### 还未解决的问题
1. 布置到服务器后路由刷新会报404错误,vue-router官方文档中有解决办法,还没深入研究
2. 如何更优雅的编写vue项目,自己第一次写vue,很多地方都是想怎么写就怎么写，很多问题都没有考虑，甚至很多地方自己都觉得很"脏",真的很惭愧,希望有同学可以指点一二.
3. 交互和UI太丑...

### 关于api
特别谢谢我的室友.
1. 轮播图、热门歌单、榜单是通过爬虫获取.
2. 音乐直链是通过伪造客户端请求加解密网易云音乐官方api获取数据.
3. 当然除了轮播图、热门歌单、榜单，其余api都可以从https://api.imjad.cn/ (共享给大家啦)获取,十分感谢开发者,api文档也十分详细.
4. 大家爬虫一定要注意控制并发数,不要问为什么.

如有错误之处或者是做得不好可以改进的地方一定要指出来,谢谢谢谢,共同进步.

[如果您觉得对您的学习有所帮助,欢迎去github给我一颗star](https://github.com/hackerwen/SoulBeats-Online)

[SoulBeats播放器本地版，配置json播放歌曲](http://www.jianshu.com/p/6e18347c3ae2)