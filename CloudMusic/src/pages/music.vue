<template>
  <div class="music-detail">
    <div id="change">
      <div class="change-Pic" :style="{backgroundImage:'url('+image+')'}"></div>
      <div class="carousel">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="getIndex">
          <van-swipe-item class="my-swipe-item" v-for="(item,index) in bannerList" :key="index">
            <img :src="item.imageUrl" class="carousel-img" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="song-detail">
      <song-detail :list="initList" v-if="flag"></song-detail>
      <no-result v-else title="加载中！"></no-result>
    </div>

  </div>


</template>

<script>
  import NoResult from '../components/no-result'
  import SongDetail from '../components/song-detail'
  import { mapGetters,mapActions } from 'vuex'

  export default {
    components: {
      NoResult,SongDetail
    },
    data(){
      return {
        flag: false,
        initList:[],
        bannerList: [],
        currentIndex: 0,
        image: ''
      }
    },
    created() {
      this.getBanner()
      this.getList()
    },
    methods: {
      //获取轮播图数据
      getBanner() {
        /**@namespace res.data.banners**/
        this.$http('/banner')
          .then(res => {
            this.bannerList = res.data.banners
            this.image = this.bannerList[0].imageUrl
          })
          .catch(err => {
            console.log(err);
          })
      },
      getIndex() {
        if (this.currentIndex < this.bannerList.length - 1) {
          this.currentIndex++
        } else {
          this.currentIndex = 0
        }
        this.image = this.bannerList[this.currentIndex].imageUrl
      },
      //获取热歌榜音乐详情
      getList(){
        this.$http('/playlist/detail',{params:{id:3778678}})
        .then(res => {
          this.initList = res.data.playlist.tracks.slice(0,80)
          this.flag = !this.flag
        }).catch(err => {
          console.log(err)
        })
      },
    },

  }
</script>
<style>
  .music-detail{
    width: 100%;
    height: 100%;
  }
  .song-detail{
    width: inherit;
    height: calc(100% - 300px);
  }
  #change {
    width: 100%;
    height: 300px;
    position: relative;
    overflow: hidden;
  }

  .change-Pic {
    width: 100%;
    height: inherit;
    position: absolute;
    background-size: cover;
    background-position-x: 70%;
    background-repeat: no-repeat;
    filter: blur(15px);
  }

  .carousel {
    width: 800px;
    height: inherit;
    margin-left: 50%;
    transform: translateX(-50%);
    z-index: 4;
  }

  .carousel-img {
    width: 800px;
    height: 300px;
    border-radius: 20px;
  }
  @media (max-width: 805px) and (min-width: 605px) {
    #change {
      height: 230px;
    }
    .carousel-img {
      width: 600px;
      height: 230px;
    }
  }
  @media (max-width: 604px) {
    #change {
      height: 180px;
    }
    .carousel-img {
      width: 500px;
      height: 180px;
    }
    .song-detail{
      height: calc(100% - 180px);
    }
  }
</style>

