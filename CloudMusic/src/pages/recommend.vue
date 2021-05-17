<template lang="html">
  <div>
    <p class="title">云音乐特色榜</p>
    <div class="header">
      <div class="topPic" v-for="item in topList" @click="goListInfo(item.id)">
        <img :src="item.coverImgUrl+'?param=120y120'" class="coverImg" alt="">
      </div>
    </div>
    <p class="title">热门歌单</p>
    <div v-for="(item,index) in playLists" :key="index" class="play-list" @click="goListInfo(item.id)">
      <div class="picU">
        <img :src="item['coverImgUrl']+'?param=120y120'" class="coverImg"  alt="">
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

<style lang="less">
  .header{
    display: flex;
    flex: 1;
    width: 100%;
    height: 130px;
  }
  .topPic{
    float: left;
    width: 125px;
    height: 125px;
    margin: 10px 20px 10px 0;
  }
  .coverImg{
    width: 120px;
    height: 120px;
  }
  .coverImg:hover{
    cursor: pointer;
    width: 125px;
    height: 125px;
  }
  .title{
    text-align: left;
    font-size: 20px;
    color: white;
  }
  .play-list{
    float: left;
    width: 120px;
    height: 170px;
    overflow: hidden;
    margin: 10px 25px 10px 0;
  }
  .play-list:hover{
    cursor: pointer;
    color: white;
    .coverImg{
      width: 125px;
      height: 125px;
    }
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
  @media (max-width: 520px) {
    .header{
      height: 110px;
    }
    .coverImg{
      width: 105px;
      height: 105px;
    }
    .topPic{
      width: 110px;
      height: 110px;
      margin: 0 5px 0 0;
    }
    .play-list{
      width: 110px;
      margin: 0 15px 0 0 ;
    }
  }
</style>
