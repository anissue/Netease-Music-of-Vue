<template>
  <div class="about">
    <h2>高仿网易云音乐播放器 PC端</h2>

    <ul>
      <li>UI基本对着网易切...</li>
      <li>技术栈:vue+vue-router+axios+stylus</li>
      <li>vue-router实现路由切换.</li>
      <li>vuex进行共享状态管理、处理组件间通信</li>
      <li>axios发送http请求</li>
      <li>tylus作css预处理</li>
      <li>初始化收藏歌单/歌曲通过html5提供的localstorage</li>
      <li>api来源(爬虫+<a href="https://api.imjad.cn/">戳这里</a>)</li>
      <li><a href="https://github.com/hackerwen/SoulBeats-Online/tree/master">前往github</a></li>
    </ul>

    <h2>实现功能</h2>
    <ul>
      <li>歌单（推荐歌单、收藏/删除歌单、歌单详情页）</li>
      <li>收藏/删除歌曲</li>
      <li>歌手详情页</li>
      <li>搜索 （单曲、歌手、歌单）</li>
      <li>在线播放（切歌、顺序、循环、单曲、列表）</li>
      <li>排行榜</li>
      <li>html5 audio控件重写</li>
      <li>歌词同步</li>
      <li>滑动至底部加载（歌单及搜索部分）</li>
      <li>个性推荐轮播图（其实个性推荐那一页就一个轮播图）</li>
    </ul>

    <h2>预计添加功能</h2>
    <ul>
      <li>添加歌曲播放页面评论分页</li>
      <li>精细歌曲播放页动画</li>
    </ul>

    <h2>还未解决的问题</h2>
    <ul>
      <li>布置到服务器后路由刷新会报404错误,vue-router官方文档中有解决办法,还没深入研究</li>
      <li>轮播图使用很传统的方式写的，不知道vue在处理轮播图这一块有没有什么独特的优势</li>
      <li>如何更优雅的编写vue项目,很多地方都是想怎么写就怎么写，很多重复代码写了也懒得去抽象出来进行整理，很多问题都没有考虑，甚至很多地方自己都觉得很"脏",真的很惭愧,希望有同学可以指点一二.</li>
    </ul>

    <h2>关于api</h2>
    <ul>
      <li>轮播图、热门歌单、榜单是通过爬虫获取.</li>
      <li>音乐直链是通过伪造客户端请求加解密网易云音乐官方api获取数据</li>
      <li>当然除了轮播图、热门歌单、榜单，其余api都可以从前面的AD's api获取获取,十分感谢开发者,api文档也十分详细</li>
    </ul>

    <p>如有错误之处或者是做得不好可以改进的地方一定要指出来,谢谢谢谢,共同进步.</p>

    <p>如果您觉得对您的学习有所帮助,欢迎给我一颗star</p>

    <a href="https://github.com/hackerwen/SoulBeats-Online/tree/master">前往github</a><br>

    <a href="http://www.jianshu.com/p/6e18347c3ae2"> 前置项目：利用html+css+javascript写一个本地播放器</a><br>

    <a href="http://blog.hackerwen.tech">作者博客</a><br>
  </div>
</template>

<script type="es6">
  export default {}
</script>

<style>
  .about {
    font-size: 16px;
    line-height: 25px;
    text-align: left;
    padding: 20px 40px;
  }

  .about h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .about ul {
    margin: 10px;
  }

  .about ul li {
    list-style: decimal !important;
  }
</style>
