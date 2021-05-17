<template lang="html">
  <!--歌曲列表-->
  <div class="musicList">
    <div class="list-title">
      <span class="song-name">歌曲</span>
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
        <span class="singer">{{item.ar[0].name}}</span>
        <span class="song-album">{{item.al.name}}</span>
        <span class="song-time">{{item.dt | format}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {format} from "../utils/util";

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
    data() {
      return {}
    }
  }
</script>

<style lang="less">
.list-title{
  border-bottom: solid rgba(220,220,220,0.8) 1px;
  text-align: left;
  width: 100%;
  height: 50px;
  display: flex;
  .song-name{
    margin-left: 50px;
  }
  span{
    display: inline-block;
    line-height: 50px;

  }
}
.list-content-song{
  width: 100%;
  height: 475px;
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
