<template lang="html">
  <!--歌曲列表-->
  <div class="musicList">
    <div class="list-title">
      <span class="song-name">歌曲</span>
      <span class="play-btn"></span>
      <span class="singer">歌手</span>
      <span class="song-album">专辑</span>
      <span class="song-time">时长</span>
    </div>
    <div ref="songContent" class="list-content-song" @scroll="">
      <div v-for="(item,index) in list"
           :key="item.id"
           class="song-item">
        <span class="num">{{index + 1}}</span>
        <span class="song-name">{{item.name}}</span>
        <button class="play-btn" @click="itemPlay(item.id,index)"></button>
        <span class="singer">{{item.ar[0].name}}</span>
        <span class="song-album">{{item.al.name}}</span>
        <span class="song-time">{{item.dt | format}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {format} from "../utils/util";
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name:'SongDetail',
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
      ...mapGetters(['playlist','playing','currentMusic'])
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
          // this.setCurrentIndex(-1)
          this.$http('/api/song/url',{params:{id:id}})
            .then(res => {
              this.setPlaylist(this.list)
              this.setCurrentIndex(index)
            }).catch(err => {
            console.log(err)
          })
        }
      }
    },
  }
</script>

<style lang="less">
  .musicList{
    width: 100%;
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
.play-btn{
  width: 40px;
  height: 40px;
  margin: 10px 10px 0 0;
  border: none;
  background: transparent;
}

.list-content-song{
  width: 100%;
  height: calc(100% - 51px);
  overflow: auto;
}
.list-content-song::-webkit-scrollbar{
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
.singer{
  width: 200px;
}
.song-album{
  width: 200px;
}
.song-time{
  width: 80px;
}
.num{
  text-align: center;
  width:60px;
}
</style>
