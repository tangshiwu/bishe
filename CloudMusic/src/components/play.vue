<template lang="html">
  <div class="play-content">
    <div class="song-img">
      <img :src="defaultImg" class="info-img" alt="">
      <div class="play-info" v-if="currentMusic.id">
        <p>歌曲：{{currentMusic.name}}</p>
        <p>歌手：{{currentMusic.ar[0].name}}</p>
        <audio v-show="playing" :src="'https://music.163.com/song/media/outer/url?id='+currentMusic.id+'.mp3'"
               autoplay
               class="audioEle"></audio>
      </div>
      <p v-else>一首歌，一个故事</p>
    </div>
    <div class="lyrics">
      <lyric
        ref="lyric"
        class="lyric"
        :lyric="lyric"
        :nolyric="nolyric"
        :lyric-index="lyricIndex"></lyric>
    </div>
    <div class="status-btn">
      <img src="../../static/img/previous.png" class="both-side" alt="">
      <img :src="isPlayImgs[Number(playing)]" class="center" alt="" @click="turn">
      <img src="../../static/img/next.png" class="both-side" alt="">
    </div>
  </div>
</template>

<script>
  import Lyric from '../components/lyric'
  import {mapGetters, mapMutations} from 'vuex'
  import {parseLyric} from "../utils/util";

  export default {
    components: {
      Lyric
    },
    computed: {
      ...mapGetters(['playing', 'playlist', 'currentMusic', 'currentIndex'])
    },
    data() {
      return {
        defaultImg: '../../static/img/music-play.png',
        isPlayImgs: ['../../static/img/pause.png', '../../static/img/play.png'],
        audioInfo: '',
        currentTime1: 0, // 当前播放时间
        //歌词模块
        lyric: [], // 歌词
        nolyric: false, // 是否有歌词
        lyricIndex: 0, // 当前播放歌词下标
      }
    },
    watch: {
      //监听currentMusic的变化
      currentMusic(value) {
        //判断是否是初建时的变化
        if (Number(this.currentIndex) !== -1) {
          this.$http('/song/url', {params: {id: value.id}})
            .then(response => {
              this.audioInfo = response.data.data[0].url
            })
        }

        this.lyricIndex = this.currentTime1 = 0
        //请求歌词
        this.$http('/lyric', {params: {id: value.id}})
          .then(res => {
            if (res.data.nolyric) {
              this.nolyric = true
            } else {
              this.nolyric = false
              this.lyric = parseLyric(res.data.lrc.lyric)
            }
          }).catch(err => {
          console.log(err)
        })
      },
      CurrentTime1(newTime) {
        if (this.nolyric) {
          return
        }
        let lyricIndex = 0
        for (let i = 0; i < this.lyric.length; i++) {
          if (newTime > this.lyric[i].time) {
            lyricIndex = i
          }
        }
        this.lyricIndex = lyricIndex
      },
    },
    // mounted() {
    //   this.$nextTick(function () {
    //     let audio = document.getElementsByClassName("audioEle")[0]
    //     console.log('ccc')
    //     // audio.addEventListener("timeupdate", function(){
    //     //   console.log(Math.floor(this.currentTime))
    //     // })
    //   })
    // },
    methods: {
      ...mapMutations(['setPlaying']),
      turn() {
        let audio = document.getElementsByClassName("audioEle")[0]
        if (this.currentMusic.id) {
          if (this.playing){
            audio.pause()
          }else {
            audio.play()
          }
          this.setPlaying(!this.playing)
        }
      },


    }
  }
</script>

<style lang="less">
  .play-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .song-img {
    width: 100%;
    height: 250px;

    p {
      margin: 0;
    }
  }

  .info-img {
    width: 200px;
    height: 200px;
    margin-bottom: 5px;
    background: rgba(128, 128, 128, 0.5);
    opacity: 0.8;
    border-radius: 8px;

  }

  .play-info p {
    margin: 0;
    color: gainsboro;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .lyrics {
    width: 100%;
    flex: 1;
    border: solid 1px red;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .status-btn {
    width: 100%;
    height: 50px;
    border: solid 1px red;

    .center {
      width: 40px;
      height: 40px;
      margin: 0 17px;
      cursor: pointer;
    }

    .both-side {
      width: 35px;
      height: 35px;
      cursor: pointer;
    }
  }
</style>

