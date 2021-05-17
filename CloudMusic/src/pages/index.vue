<template lang="html">
  <div id="contain">
    <div id="drag"></div>
    <login></login>
    <div class="content">
      <div class="play">
        <play></play>
      </div>
      <div class="content_right">
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
  import login from '../components/login'

  export default {
    components: {
      navBtn,
      play,
      login
    },
    data() {
      return {}
    },
  }
</script>

<style>
  #contain {
    z-index: -2;
    width: 100vw;
    height: 100vh;
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


  .play {
    background-color: grey;
    width: 350px;
    height: 100%;
    margin: 0 10px 0 0;
    opacity: 0.3;
  }

  @media (max-width: 1160px) {
    .play {
      display: none;
    }
  }

  .content {
    width: inherit;
    height: calc(100% - 60px);
    display: flex;
    justify-content: space-around;
    overflow: hidden;
  }

  .content_right {
    width: calc(100% - 360px);
    height: 100%;
    flex: 1;
  }


  .context {
    width: 100%;
    height: calc(100% - 68px);
    overflow: auto;
  }
  .context::-webkit-scrollbar {
    display: none;
  }

  .nav_btn {
    width: 100%;
    height: 68px;
    background: rgba(255, 255, 255, .7);
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }


</style>
