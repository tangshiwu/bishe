<template lang="html">
  <div class="play-content">
    <div class="song-img">
      <img :src="defaultImg+'?param=200y200'" class="info-img" alt="">
      <audio ref="audioE" :src="playUrl"
             autoplay
             class="audioEle"></audio>
      <div class="play-info" v-if="currentMusic.id">
        <p>歌曲：{{currentMusic.name}}</p>
        <p>歌手：{{currentMusic.ar ? currentMusic.ar[0].name : currentMusic.artists[0].name}}</p>
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
      <div class="progress">
        <span class="progress-text" v-text="currentTimeSee"></span>
        <div ref="bar" class="bar">
          <span ref="proIcon" class="progress-icon"></span>
        </div>
        <span class="progress-text" v-text="duration"></span>
      </div>
      <img src="../../static/img/previous.png" class="both-side" alt="" @click="playPrev">
      <img :src="isPlayImgs[Number(playing)]" class="center" alt="" @click="turn">
      <img src="../../static/img/next.png" class="both-side" alt="" @click="playNext">
      <img src="../../static/img/comment.png" class="comment-btn" alt="" @click="goComment(currentMusic.id)">
    </div>
  </div>
</template>

<script>
  import Lyric from '../components/lyric'
  import {mapGetters, mapMutations,mapActions} from 'vuex'
  import {parseLyric,myToast,format} from "../utils/util";


  export default {
    components: {
      Lyric
    },
    filters:{
      format
    },
    computed: {
      ...mapGetters(['playing', 'playlist', 'currentMusic', 'currentIndex','historyList']),
    },
    data() {
      return {
        defaultImg: '../../static/img/music-play.png',
        isPlayImgs: ['../../static/img/pause.png', '../../static/img/play.png'],
        audioInfo: '',
        currentTime: 0, // 当前播放时间
        currentTimeSee:'00:00',
        duration: '00:00',
        dt:'',
        //歌词模块
        lyric: [], // 歌词
        nolyric: false, // 是否有歌词
        lyricIndex: 0, // 当前播放歌词下标
        scrollWidth:0,
        playUrl:''
      }
    },
    watch: {
      //监听currentMusic的变化
      currentMusic(value) {
        //判断是否是初建时的变化
        if (Number(this.currentIndex) !== -1) {
          this.lyric = []
          this.lyricIndex = this.currentTime = 0
          this.$http('/api/song/detail',{params:{ids:value.id}})
          .then(res => {
            this.defaultImg = res.data.songs[0].al.picUrl
            this.dt = res.data.songs[0].dt
            this.duration = format(this.dt)
          })

          //请求歌词
          this.$http('/api/lyric', {params: {id: value.id}})
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
          //判断网易云是否能播放
          this.$http('/api/song/url',{params:{id:value.id}})
          .then(res => {
            if (res.data.data[0].url !== null&& res.data.data[0].fee!==1){
              this.playUrl = 'https://music.163.com/song/media/outer/url?id='+value.id+'.mp3'
              this.setPlaying(true)
            }else {
              this.$http('/Kw',
                {params:{vipver:'1',ft:'music',encoding:'utf8',rformat:'json',vermerge:'1',mobi:'1',all:value.name}})
              .then(response => {
                let MusicId = response.data.abslist[0].MUSICRID
                this.$http('/PlayK',{params:{response:'url',format:'mp3',type:'convert_url',rid:MusicId}})
                .then(res => {
                  this.playUrl = res.data
                  this.setPlaying(true)
                })
              })
            }
          })


          this.setHistory(this.currentMusic)
        }
      },
      currentTime(newTime) {
        if (this.nolyric) {
          return
        }
        let lyricIndex = 0
        for (let i = 0; i < this.lyric.length; i++) {
          if (newTime > this.lyric[i].time) {
            lyricIndex = i
          }
        }
        this.currentTimeSee = format(newTime*1000)
        this.lyricIndex = lyricIndex
        this.$refs.proIcon.style.transform = `translate(${this.scrollWidth * (this.currentTime * 1000 / this.dt)}px,-50%)`
      },
      playing(newVal){
        if (this.currentMusic.id){
          if (newVal){
            this.$nextTick(() => {
              this.$refs.audioE.play()
            })
          }else {
            this.$refs.audioE.pause()
          }
        }
      },
    },
    mounted() {
      this.$refs.audioE.addEventListener('timeupdate',() => {
        this.currentTime = this.$refs.audioE.currentTime

      })
      this.$nextTick(() => {
        let bar = this.$refs.bar
        let icon = this.$refs.proIcon
        this.scrollWidth = bar.offsetWidth - icon.offsetWidth
      })
     },
    methods: {
      ...mapMutations(['setPlaying','setCurrentIndex']),
      ...mapActions(['setHistory']),
      turn() {
        if (this.currentMusic.id) {
          this.setPlaying(!this.playing)
        }
      },
      playPrev(){
        let index = this.currentIndex
        if (index === -1){
          myToast('还未播放歌曲哦！',1000)
        }else if (index === 0){
          myToast('已经是列表第一首了哦！',1000)
          // this.setPlaying()
        }else if (index > 0){
          this.setCurrentIndex(index-1)
          this.setPlaying(true)
        }
      },
      playNext(){
        let index = this.currentIndex
        let len = this.playlist.length - 1
        if (index === -1){
          myToast('还未播放歌曲哦！',1000)
        }else if (index < len){
          this.setCurrentIndex(index + 1)
          this.setPlaying(true)
        }else if (index === len){
          myToast('已经是列表最后一首了哦！',1000)
        }
      },
      goComment(id){
        if (id){
          this.$router.push('/comment/'+id)
        }

      }
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
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .lyric{
      height: 100%;
    }
    mask-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.6) 15%,
      rgba(255, 255, 255, 1) 25%,
      rgba(255, 255, 255, 1) 75%,
      rgba(255, 255, 255, 0.6) 85%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  .status-btn {
    width: 100%;
    height: 80px;
    .progress{
      width: 76%;
      height: 28px;
      position: relative;
      left: 12%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .bar{
      flex: 1;
      height: 2px;
      background: gainsboro;
      position: relative;
      .progress-icon{
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0,-50%);
        display: block;
        width: 6px;
        height: 6px;
        background: orangered;
        border: gainsboro 1px solid;
        border-radius: 3px;
      }
      &::before{
        content: "";
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
      }
    }
    .progress-text{
      font-size: 14px;
      padding: 0 8px;
    }
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
  .comment-btn{
    position: absolute;
    width: 30px;
    height: 30px;
    padding: 7px 0 0 20px;
  }
</style>

