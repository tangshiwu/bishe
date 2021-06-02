<template lang="html">
  <!--歌曲列表-->
  <div class="musicList">
    <div class="list-title">
      <span class="song-name">歌曲</span>
      <span class="add-btn"></span>
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
        <button class="add-btn" @click="openDialog(item.id)"></button>
        <button class="play-btn" @click="itemPlay(item.id,index)"></button>
        <span class="singer">{{item.ar[0].name}}</span>
        <span class="song-album">{{item.al.name}}</span>
        <span class="song-time">{{item.dt | format}}</span>
      </div>
    </div>
    <my-dialog
      ref="addDialog"
      head-text="添加到歌单"
    >
      <div class="dialog-text">
        <span v-for="item in myList" class="add-list" @click="addList(item.id)">
          {{item.name}}
        </span>
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import myDialog from "./myDialog";
  import {format} from "../utils/util";
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import {myToast} from "../utils/util";

  export default {
    name: 'SongDetail',
    filters: {
      format
    },
    components: {
      myDialog
    },
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      ...mapGetters(['playlist', 'playing', 'currentMusic', 'uid'])
    },
    data() {
      return {
        myList: [],
        songId:''
      }
    },
    methods: {
      ...mapMutations(['setCurrentIndex', 'setPlaying']),
      ...mapActions(['setPlaylist']),
      addList(listId) {
        this.$refs.addDialog.hide()
        this.$http('/api/playlist/tracks',{params:{op:'add',pid:listId,tracks:this.songId}})
        .then(res => {
          if (res.data.body.code===502){
            myToast('已经添加过该歌曲啦！',2000)
          }else if (res.data.body.code===200){
            myToast('添加成功！',2000)
          }
        })
      },
      openDialog(id) {
        this.$refs.addDialog.show()
        this.$http('/api/user/playList', {params: {uid: this.uid}})
          .then(res => {
            if (res.data.playlist.length === 0) {
              this.myList.push('还没有新建歌单哦!')
            } else {
              this.myList = res.data.playlist
              this.songId = id
            }
          }).catch(err => {
          console.log(err)
        })
      },
      itemPlay(id, index) {
        //id===this.currentMusic.id 点击歌曲是当前播放歌曲
        if (id === this.currentMusic.id) {
          this.setPlaying(!this.playing)
        } else {
          this.setPlaying(false)
          // this.setCurrentIndex(-1)
          this.$http('/api/song/url', {params: {id: id}})
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
  .musicList {
    width: 100%;
    height: 100%;
  }

  .list-title {
    border-bottom: solid rgba(220, 220, 220, 0.8) 1px;
    text-align: left;
    width: 100%;
    height: 50px;
    display: flex;
    color: white;

    .song-name {
      margin-left: 50px;
    }

    span {
      display: inline-block;
      line-height: 50px;

    }
  }
  .add-btn,
  .play-btn {
    width: 40px;
    height: 40px;
    margin: 10px 10px 0 0;
    border: none;
    background: transparent;
  }

  .list-content-song {
    width: 100%;
    height: calc(100% - 51px);
    overflow: auto;
  }

  .list-content-song::-webkit-scrollbar {
    display: none;
  }

  .song-item {
    border-bottom: solid rgba(220, 220, 220, 0.5) 1px;
    text-align: left;
    width: 100%;
    height: 50px;
    display: flex;

    span {
      display: inline-block;
      line-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .song-item:hover {
    color: white;
    .add-btn {
      background: url("../../static/img/add.png") no-repeat;
      background-size: contain;
    }

    .play-btn {
      background: url("../../static/img/play-btn.png") no-repeat;
      background-size: contain;
    }
  }

  .song-name {
    width: calc(100% - 310px)
  }

  .singer {
    width: 200px;
  }

  .song-album {
    width: 200px;
  }

  .song-time {
    width: 80px;
  }

  .num {
    text-align: center;
    width: 60px;
  }
  .add-list{
    display: block;
    font-size: 16px;
    margin-bottom: 6px;
    &:hover{
      cursor: pointer;
      color: white;
    }
  }
  /*display不生效时，隐藏元素，不占据空间*/
  /*.btn-confirm{*/
  /*  position: absolute;*/
  /*  visibility: hidden;*/
  /*}*/
</style>
