## 基于Vue的高仿网易云音乐
![歌单页.png](http://upload-images.jianshu.io/upload_images/4869616-4fa1a61eca7fac96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> UI基本对着网易切...
> 技术栈:vue+vue-router+axios+stylus
> [点击预览](http://blog.hackerwen.tech/SoulBeats-Online/#/playlist) 请务必配合chrome桌面端进行食用全屏更佳
> [前往github](https://github.com/hackerwen/SoulBeats-Online/tree/master)

![动态预览.gif](http://upload-images.jianshu.io/upload_images/4869616-a7fbcdbbf3680110.gif?imageMogr2/auto-orient/strip)
1. vue-router实现路由切换.
2. vuex进行共享状态管理、处理组件间通信
2. axios发送http请求.
3. stylus作css预处理.
4. 初始化收藏歌单/歌曲通过html5提供的localstorage.
5. api来源(爬虫+[戳这里](https://api.imjad.cn/))

### 实现功能：
1. 歌单（推荐歌单、收藏/删除歌单、歌单详情页）
2. 收藏/删除歌曲
3. 歌手详情页
4. 搜索 （单曲、歌手、歌单）
5. 在线播放（切歌、顺序、循环、单曲、列表）
6. 排行榜
7. html5 audio控件重写
8. 歌词同步
9. 滑动至底部加载（歌单及搜索部分）
10. 个性推荐轮播图（其实个性推荐那一页就一个轮播图）

### 预计添加功能：
1. 添加歌曲播放页面评论分页
2. 精细歌曲播放页动画

### 还未解决的问题
1. 布置到服务器后路由刷新会报404错误,vue-router官方文档中有解决办法,还没深入研究
2. 轮播图使用很传统的方式写的，不知道vue在处理轮播图这一块有没有什么独特的优势
3. 如何更优雅的编写vue项目,很多地方都是想怎么写就怎么写，很多重复代码写了也懒得去抽象出来进行整理，很多问题都没有考虑，甚至很多地方自己都觉得很"脏",真的很惭愧,希望有同学可以指点一二.

### 关于api
特别谢谢我的室友.
1. 轮播图、热门歌单、榜单是通过爬虫获取.
2. 音乐直链是通过伪造客户端请求加解密网易云音乐官方api获取数据.
3. 当然除了轮播图、热门歌单、榜单，其余api都可以从前面的AD's api获取获取,十分感谢开发者,api文档也十分详细.

如有错误之处或者是做得不好可以改进的地方一定要指出来,谢谢谢谢,共同进步.

如果您觉得对您的学习有所帮助,欢迎给我一颗star
[前往github](https://github.com/hackerwen/SoulBeats-Online/tree/master)

前置项目：
[利用html+css+javascript写一个音乐播放器](http://www.jianshu.com/p/6e18347c3ae2)
