<template lang="html">
  <div class="SongList">
    <div v-if="songList.length > 0">
      <div
        v-for="item in songList"
        :style="item.id"
        class="list-item"
      >
        <img :src="item.coverImgUrl+'?param=180y180'">
        <p class="name">{{item.name}}</p>
      </div>
    </div>
    <no-result v-else title="还没有登录哦！"></no-result>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import NoResult from '../components/no-result'
  export default {
    components:{
      NoResult
    },
    data() {
      return {
        songList: []
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
        this.$http('/user/playList', {params: {uid: this.uid}})
          .then(res => {
            console.log(res);
            if (res.data.playlist.length === 0) {
              this.songList = '还没有新建歌单哦!'
            } else {
              this.songList = res.data.playlist
            }
          }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style>
  .list-item{
    display: inline-block;
    margin: 10px 15px 0 0;
    float: left;
  }
  .list-item p{
    margin: 0;
  }
</style>
