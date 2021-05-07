<template lang="html">
  <div>
    <div class="one">one</div>
    <div class="two">two</div>
<!--      <div class="item-header">-->
<!--        <span>歌曲</span>-->
<!--        <span>歌手</span>-->
<!--        <span>专辑</span>-->
<!--        <span>时长</span>-->
<!--      </div>-->
<!--    <div id="item-content">-->
<!--      <div class="item-list" v-for="item in songLists">-->
<!--        <p>{{item.name}}</p>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        songLists: []
      }
    },
    created() {
      this.getSongLists()
    },
    methods:{
      getSongLists(){
        this.$http('/playlist/detail',{params:{id:3778678}})
          .then(res => {
            this.songLists = res.data.playlist.tracks
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style>
  .one{
    /*width: 100%;*/
    /*height: 50px;*/
    /*position:fixed;!*固定作用*!*/
    /*!*ie6下样式，加下划线表示只针对ie6 的hack *!*/
    /*_position:absolute;!* 把导航栏位置定义为绝对位置  关键*!*/
    /*z-index:9999;*/
  }
  .two{
    width: 100%;
    height: 300px;
    background-color: palevioletred;
    overflow: hidden;
  }
  /**{*/
  /*  color: white;*/
  /*}*/
  /*.item-header{*/
  /*  border-bottom: 1px solid rgba(255,255,255,0.8);*/
  /*  width: 100%;*/
  /*  height: 50px;*/
  /*  position: fixed;*/
  /*  z-index: 99;*/
  /*}*/
  /*#item-content{*/
  /*  width: 100%;*/
  /*  height: calc(100% - 60px);*/
  /*  overflow-x: hidden;*/
  /*  overflow-y: auto;*/
  /*  -webkit-overflow-scrolling: touch;*/
  /*  background-color: skyblue;*/
  /*}*/
  /*.item-list{*/
  /*  display: flex;*/
  /*  width: 100%;*/
  /*  height: 50px;*/
  /*  border-bottom: 1px solid white;*/
  /*  line-height: 50px;*/
  /*  overflow: hidden;*/
  /*}*/
</style>
