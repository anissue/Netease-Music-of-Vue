//全局方法 挂载到Vue原型上
export default{
  install(Vue,options)
  {
    Vue.prototype.scrollMore = function (elem, flag) {//滚动到底部加载更多
      let scroll = this.$refs[elem].scrollTop;
      let visiHeight = this.$refs[elem].clientHeight;
      let fullHeight = this.$refs[elem].scrollHeight;
      if (scroll + visiHeight >= fullHeight && this.ajaxFlag === 1) {
        this.fetchData(this.limit, this.offset, flag);
        this.ajaxFlag = 0;
      }
    }
    Vue.prototype.fetchData = function (limit, offset, flag) {
      let url;
      if (flag == "searchSong") {
        url = " https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=";
      } else if (flag == "searchArtist") {
        url = " https://api.imjad.cn/cloudmusic/?type=search&search_type=100&s=";
      } else if (flag == "searchPlaylist") {
        url = " https://api.imjad.cn/cloudmusic/?type=search&search_type=1000&s=";
      }
      if(this.$route.query['key']==""){
        alert("请输入关键字");
        return ;
      }else{
        url = url + this.$route.query['key'] + "&limit=" + limit + "&offset=" + offset;
      }
      this.$http.get(url).then(response => {
        this.loading = false;
        if (flag === "searchSong") {
          this.searchRes = [...this.searchRes, ...response.data.result.songs];
        } else if (flag === "searchArtist") {
          if(response.data.result.artists==undefined){
            alert('Api无法提供该歌手信息');
            return ;
          }else{
            this.searchRes = [...this.searchRes, ...response.data.result.artists];
          }
        } else if (flag === "searchPlaylist") {
          this.searchRes = [...this.searchRes, ...response.data.result.playlists];
        }
        this.offset = this.offset + 1;
        this.ajaxFlag = 1;
      }, response => {
        console.log('searchSong error');
      });
    }
    Vue.prototype.animate=function(elem, json, fn){
    //首先清除定时器
    var that = this;
    clearInterval(elem.timer);
    elem.timer=setInterval(function(){
      //开闭原则
      var bool= true;
      //遍历属性和值，分别单独处理json
      //k:属性名 json[k]:属性值
      for(var k in json){
        var leader;
        //获取当前属性值,如果没有则设为0
        //如果是透明度属性取值方式不同
        if(k==="opacity"){
          if(!that.getStyle(elem,k)){
            leader=100;
          }else{
            leader=that.getStyle(elem,k)*100;
          }
          //leader = parseInt(getStyle(elem,k))*100||1;//最后还要用1乘100也就是100
        }else{
          leader = parseInt(that.getStyle(elem,k))||0;
        }
        //获取步长,，步长会随着leader的增大而减小，使得动画更平缓
        var step = (json[k]-leader)/10;
        //二次处理步长，判断正负
        step = step>0?Math.ceil(step):Math.floor(step);
        leader=leader+step;
        //赋值给属性
        //特殊情况特殊赋值
        if(k==="opacity"){
          //最后除以100变成[0,1]之间的数
          elem.style["opacity"]=leader/100;
          //兼容IE678
          elem.style.filter = "alpha(opacity="+leader+")";
        }else if(k==="zIndex"){
          //如果是层级 就一次性赋值，没有理由，需求！
          elem.style.zIndex=json[k];
        }else{
          elem.style[k]=leader+"px";
        }
        //直到这里运动完毕后定时器却并没有清除，需手动清除
        //而不是等下一次移动再清除，太被动，且占内存
        //清除定时器
        //判断每一个属性的目标值和当前值的差是否大于步长
        //如果大于步长说明还没到目标值(考虑小数)
        /*if(Math.abs(json[k]-leader)>Math.abs(step)){
         bool=false;
         }*/
        //不考虑小数
        if(json[k]!==leader){
          bool=false;
        }
      }
      if(bool){
        clearInterval(elem.timer);
        if(fn){
          fn();
        }
      }
    },20);
  }
    Vue.prototype.animate1=function(elem,final_x){
    if(elem){
      clearInterval(elem.timer);
      elem.timer = setInterval(function(){
        var x = parseInt(elem.style.left)||0;
        if(Math.abs(x-final_x)<=5){
          clearInterval(elem.timer);
          //console.log(1);
          return true;
        }
        var dist;
        //dist会随着x的增大而变小，也就是加速度变小了，有一个渐变的效果
        var distx=(final_x-x)/10;
        distx=distx>0?Math.ceil(distx):Math.floor(distx);
        x=x+distx;
        elem.style.left=x+"px";
      },25);
    }
  }
    Vue.prototype.getStyle=function(elem, attr){
    if (window.getComputedStyle) {
      return window.getComputedStyle(elem, null)[attr];
    }
    return elem.currentStyle[attr];
  }
  },
}
