<template lang="html">
<div class="play-content">
  <div class="song-img">pic</div>
  <div class="lyrics">play歌词
  </div>
  <div class="play-btn">
    <img src="../../static/img/previous.png" class="both-side" alt="">
    <img :src="isPlayImgs[Number(isPlaying)]" class="center" alt="" @click="turn">
    <img src="../../static/img/next.png" class="both-side" alt="">
  </div>
</div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed:{
      ...mapGetters(['playlist'])
    },
    data() {
      return {
        isPlaying:false,
        isPlayImgs:['../../static/img/pause.png','../../static/img/play.png']
      }
    },
    methods: {
      turn() {
        this.isPlaying = !this.isPlaying
        console.log(this.playlist)
      }
    }
  }
</script>

<style lang="less">
  .play-content{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
.song-img{
  width: 100%;
  height: 250px;
  border: solid 1px red;
}
.lyrics{
  width: 100%;
  flex: 1;
  border: solid 1px red;
}
.play-btn{
  width: 100%;
  height: 50px;
  border: solid 1px red;
  .center{
    width: 40px;
    height: 40px;
    margin: 0 17px;
    cursor: pointer;
  }
  .both-side{
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
}
</style>

