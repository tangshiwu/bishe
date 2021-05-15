<template lang="html">
  <div>
    <p class="title">云音乐特色榜</p>
    <div class="header">
      <div class="topPic" v-for="item in topList" @click="goListInfo(item.id)">
        <img :src="item.coverImgUrl+'?param=120y120'" width="120px" height="120px" alt="">
      </div>
    </div>
    <p class="title">热门歌单</p>
    <div v-for="(item,index) in playLists" :key="index" class="play-list" >
      <div class="picU">
        <img :src="item['coverImgUrl']+'?param=100y100'" width="100px" height="100px" alt="">
      </div>
      <div class="info">
        <p>{{item['name']}}</p>
        <p class="creator_name"><span>from</span>{{item.creator.nickname}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        topList: [],
        playLists: []
      }
    },
    created() {
      this.getTopList()
      this.getPlayLists()
      this.getStatus()
    },
    methods: {
      //获取云音乐特色榜
      getTopList(){
        this.$http('/toplist/detail')
          .then(res => {
            this.topList = res.data.list.filter(v => v.ToplistType)
          })
          .catch(err => {
            console.log(err);
          })
      },
      //获取登录状态
      getStatus(){
        this.$http('/login/status')
          .then(res => {
            // if (!res.data.account){
            //
            // }
            console.log(res)
          })
          .catch(err => {
            console.log(err);
          })
      },
      //跳转榜单详情页
      goListInfo(id){
        this.$router.push('/playList/'+id)
      },
      //获取推荐歌单
      getPlayLists: function () {
        /**@namespace data.playlists**/
        this.$http('/top/playlist?order=hot')
          .then(res => {
            this.playLists = res.data.playlists
          })
          .catch(err => {
            console.log(err);
          })
      },
      // goPlay(id){
      //   this.$router.push('/play/'+id)
      // }
    }
  }
</script>

<style>
  .header{
    width: 100%;
    height: 130px;
  }
  .topPic{
    float: left;
    margin: 10px 20px 10px 0;
  }
  .title{
    text-align: left;
    font-size: 20px;
  }
  .play-list{
    float: left;
    width: 100px;
    height: 150px;
    overflow: hidden;
    margin: 10px 25px 10px 0;
  }

  .info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
    padding: 0;
  }
  .creator_name{
    font-size: 14px;
    text-align: left;
  }
  .creator_name span{
    font-size: 10px;
    background-color: chocolate;
    border-radius: 4px;

  }
</style>
