<template lang="html">
  <div id="contain">
    <div id="drag">
      <login></login>
      <div class="content">
        <div class="play">
          <!--          <play></play>-->
        </div>
        <div class="content_right">
          <div id="change">
            <div class="carousel">
              <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
                <van-swipe-item class="my-swipe-item" v-for="(item,index) in bannerList" :key="index" >
                  <img :src="item['imageUrl']" alt="" @focus="getIndex(index)">
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
        currentIndex:'',
      }
    },
    created() {
        this.getBanner()
    },
    methods:{
        getBanner() {
          /**@namespace res.data.banners**/
          this.$http('/banner')
            .then(res => {
              this.bannerList = res.data.banners
            })
            .catch(err => {
              console.log(err);
            })
        },
      getIndex(index){
        this.currentIndex = index
        console.log(this.currentIndex)
      }
      // sliderClick (i) {
      //   alert(i);
      // },
     }
  }
</script>

<style>
  #contain {
    background-image: url("../../static/img/bg-image.jpg");
    background-size: cover;
    z-index: -2;
  }

  #contain::after {
    content: "";
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(4px);
    z-index: -1;
  }

  #drag {
    width: 100vw;
    height: 100vh;
    position: absolute;
    color: white;
  }

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

  }
  .carousel {
    width: 800px;
    height: 300px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .carousel img{
    width: 800px;
    height: 300px;
    border-radius:20px;
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
