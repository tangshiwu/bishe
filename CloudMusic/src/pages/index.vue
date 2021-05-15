<template lang="html">
  <div id="contain">
    <div id="drag"></div>
      <login></login>
      <div class="content">
        <div class="play">
          <!--          <play></play>-->
        </div>
        <div class="content_right">
          <div id="change" >
            <div class="change-Pic" :style="{backgroundImage:'url('+image+')'}"></div>
            <div class="carousel" >
              <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="getIndex">
                <van-swipe-item class="my-swipe-item" v-for="(item,index) in bannerList" :key="index" @click="cli(index)">
                    <img :src="item['imageUrl']" alt="">
                </van-swipe-item>
              </van-swipe>
            </div>

            <!--            <carousel class="carousel"-->
            <!--                      :list="bannerList"-->
            <!--                      :width="900"-->
            <!--                      :height="260"-->
            <!--                      @sliderClick="sliderClick"></carousel>-->
          </div>
          <nav-btn class="nav_btn"></nav-btn>
          <div class="context">
            <router-view></router-view>
          </div>

        </div>

      </div>



  </div>
</template>

<script>
  import navBtn from '../components/nav-btn'
  import play from '../components/play'
  // import carousel from '../components/carousel'
  import login from '../components/login'

  export default {
    components: {
      navBtn,
      play,
      // carousel,
      login
    },
    data() {
      return {
        bannerList: [],
        currentIndex: 0,
        image:''
      }
    },
    created() {
      this.getBanner()

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
        if (this.currentIndex<9){
          this.currentIndex++
        }else {
          this.currentIndex = 0
        }
        this.image = this.bannerList[this.currentIndex].imageUrl
      }
    }
  }
</script>

<style>
  #contain {
    z-index: -2;
    width: 100vw;
    height: 100vh;
    color: white;
  }
  #drag {
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-image: url("../../static/img/bg-image.jpg");
    background-size: cover;
    z-index: -4;
  }
  /*加模糊效果，同时去白边*/
  #drag::after {
    content: "";
    width: inherit;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(4px);
    z-index: -1;
  }
  /*@media (min-width: 1500px){*/
  /*  #contain{*/
  /*    width: 1500px;*/
  /*    height: 100vh;*/
  /*    position: relative;*/
  /*    left: 50%;*/
  /*    transform: translateX(-50%);*/
  /*  }*/
  /*}*/


  .play {
    background-color: grey;
    width: 350px;
    height: 90vh;
    margin: 0 10px 0 0;
    opacity: 0.3;
  }

  @media (max-width: 1160px) {
    .play {
      display: none;
    }
  }

  .content {
    display: flex;
    justify-content: space-around;
    overflow: hidden;
  }

  .content_right {
    width: 100%;
    height: 90vh;
    flex: 1;
  }

  #change {
    width: 100%;
    height: 300px;
    position: relative;
    overflow: hidden;
  }
  .change-Pic{
    width: 100%;
    height: 300px;
    position: absolute;
    background-size: cover;
    background-position-x: 70%;
    background-repeat: no-repeat;
    filter: blur(15px);
  }
  .carousel {
    width: 800px;
    height: 300px;
    margin-left: 50%;
    transform: translateX(-50%);
    z-index: 4;
  }

  .carousel img {
    width: 800px;
    height: 300px;
    border-radius: 20px;
  }

  .nav_btn {
    width: 100%;
    height: 68px;
    background-color: aliceblue;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .context {
    width: 100%;
    height: 50vh;
    overflow: auto;
  }

  .context::-webkit-scrollbar {
    display: none;
  }
</style>
