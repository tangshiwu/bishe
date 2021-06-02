<template lang="html">
  <div class="SongList">
    <div v-if="songList.length > 0">
      <div
        v-for="item in songList"
        :key="item.id"
        class="song-list"
      >
        <router-link :to="'/userList/'+ item.id">
          <img :src="item.coverImgUrl+'?param=180y180'" alt="">
        </router-link>
        <p class="name">{{item.name}}</p>
      </div>
    </div>
    <no-result v-else title="还没有登录哦！"></no-result>
    <div class="create-btn"  @click="openDialog">
      <span>新建歌单</span>
    </div>
    <my-dialog
      ref="createDialog"
      head-text="新建歌单"
      confirm-btn-text="新建"
      cancel-btn-text="关闭"
      @confirm="createList">
      <div class="dialog-text">
        <input
          v-model.trim="message"
          class="dialog-input"
          autofocus
          placeholder="请输入名称"
          maxlength="200"
        />
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import NoResult from '../components/no-result'
  import myDialog from "../components/myDialog";
  export default {
    components:{
      NoResult,
      myDialog
    },
    data() {
      return {
        songList: [],
        message:''
      }
    },
    computed:{
      ...mapGetters(["uid"])
    },
    created() {
      this.getSongList(this.uid)
    },
    methods: {
      getSongList(uid) {
        this.$http('/api/user/playList', {params: {uid: uid}})
          .then(res => {
            if (res.data.playlist.length === 0) {
              this.songList.push('还没有新建歌单哦!')
            } else {
              this.songList = res.data.playlist
            }
          }).catch(err => {
          console.log(err)
        })
      },
      openDialog(){
        this.$refs.createDialog.show()
      },
      createList(){

      }
    }
  }
</script>

<style lang="less">
  .song-list{
    width: 180px;
    height: 210px;
    display: inline-block;
    margin: 10px 15px 0 0;
    float: left;
  }
  .song-list p{
    margin: 0;
  }
  /*.add-btn {*/
  /*  background: url("../../static/img/delete.png") no-repeat;*/
  /*  background-size: contain;*/
  /*}*/
  /*.song-item:hover {*/
  /*  color: white;*/
  /*  .add-btn {*/
  /*    background: url("../../static/img/delete.png") no-repeat;*/
  /*    background-size: contain;*/
  /*  }*/
  /*}*/
  .create-btn {
    position: fixed;
    width: 150px;
    height: 35px;
    bottom: 30px;
    right: 30%;
    background-color: dimgray;
    border-radius: 20px;
    color: ghostwhite;
    padding-top: 10px;
    z-index: 99;
  }
  .create-btn:hover{
    font-size: larger;
    cursor: pointer;
  }
  .dialog-input {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0 15px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    outline: 0;
    background: transparent;
    color: white;
    font-size: 14px;
    box-shadow: 0 0 1px 0 white inset;
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
</style>
