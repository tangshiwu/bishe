<template lang="html">
  <!--歌曲列表-->
  <div class="searchList">
    <div class="list-title">
      <span class="song-name">歌曲</span>
      <span class="play-btn"></span>
      <span class="singer">歌手</span>
      <span class="song-time">时长</span>
    </div>
      <div v-for="(item,index) in list"
           :key="item.id"
           class="song-item">
        <span class="num">{{index + 1}}</span>
        <span class="song-name">{{item.name}}</span>
        <span class="play-btn" @click="itemPlay(item.id,index)"></span>
          <span class="singer">{{item.ar ? item.ar[0].name : item.artists[0].name}}</span>
          <span class="song-time">{{item.ar ? item.dt : item.duration | format}}</span>

      </div>
  </div>
</template>

<script>
  import {format} from "../utils/util";
  import {mapGetters,mapActions,mapMutations} from 'vuex'

  export default {
    name:'SearchDetail',
    filters:{
      format
    },
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    computed:{
      ...mapGetters(['playing','playlist','currentMusic'])
    },
    data() {
      return {}
    },
    methods:{
      ...mapMutations(['setCurrentIndex','setPlaying']),
      ...mapActions(['setPlaylist']),
      itemPlay(id,index){
        //id===this.currentMusic.id 点击歌曲是当前播放歌曲
        if (id===this.currentMusic.id){
          this.setPlaying(!this.playing)
        }else {
          this.setPlaying(false)
          this.$http('/api/song/url',{params:{id:id}})
            .then(res => {
              this.setPlaylist(this.list)
              this.setCurrentIndex(index)
            }).catch(err => {
              console.log(err)
            })
        }
      }
    }
  }
</script>

<style lang="less">
  .searchList{
    width: inherit;
    height: 100%;
  }
  .list-title{
    border-bottom: solid rgba(220,220,220,0.8) 1px;
    text-align: left;
    width: 100%;
    height: 50px;
    display: flex;
    color: white;
    .song-name{
      margin-left: 50px;
    }
    span{
      display: inline-block;
      line-height: 50px;

    }
  }
  .list-content{
    width: 100%;
    height: calc(100% - 51px);
    overflow: auto;
  }
  .list-content::-webkit-scrollbar{
    display: none;
  }
  .song-item{
    border-bottom: solid rgba(220,220,220,0.5) 1px;
    text-align: left;
    width: 100%;
    height: 50px;
    display: flex;
    span{
      display: inline-block;
      line-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .song-item:hover{
    color: white;
    .play-btn{
      background: url("../../static/img/play-btn.png") no-repeat;
      background-size: contain;
    }
  }
  .song-name{
    width: calc(100% - 310px)
  }
  .play-btn{
    width: 40px;
    height: 40px;
    margin: 8px 10px 0 0;
    border: none;
  }

  .singer{
    width: 200px;
  }
  .song-time{
    width: 80px;
  }
  .num{
    text-align: center;
    width:50px;
  }
</style>
