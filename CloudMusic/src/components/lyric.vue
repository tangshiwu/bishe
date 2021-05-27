<template lang="html">
    <div>
      <!--歌词-->
      <div ref="musicLyric" class="music-lyric">
        <div class="music-lyric-items" :style="lyricTop">
          <p v-if="!currentMusic.id">还没有播放音乐哦！</p>
          <p v-else-if="nolyric">暂无歌词！</p>
          <template v-else-if="lyric.length > 0">
            <p
              v-for="(item, index) in lyric"
              :key="index"
              :class="{ on: lyricIndex === index }"
            >
              {{ item.text }}
            </p>
          </template>
          <p v-else>歌词加载失败！</p>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
    export default {
        name:'Lyric',
      props: {
        // 歌词数据
        lyric: {
          type: Array,
          default: () => []
        },
        // 是否无歌词
        nolyric: {
          type: Boolean,
          default: false
        },
        // 当前歌词下标
        lyricIndex: {
          type: Number,
          default: 0
        }
      },
      data() {
        return {
          top: 0 // 歌词居中
        }
      },
      computed: {
        ...mapGetters(['currentMusic']),
        //歌词位置
        lyricTop() {
          return `transform :translate3d(0, ${-34 *
          (this.lyricIndex - this.top)}px, 0)`
        },
      },
      mounted() {
        window.addEventListener('resize', () => {
          clearTimeout(this.resizeTimer)
          this.resizeTimer = setTimeout(() => this.clacTop(), 60)
        })
        this.$nextTick(() => this.clacTop())
      },
      methods: {
        // 计算歌词居中的 top值
        clacTop() {
          const dom = this.$refs.musicLyric
          const { display = '' } = window.getComputedStyle(dom)
          if (display === 'none') {
            return
          }
          const height = dom.offsetHeight
          this.top = Math.floor(height / 34 / 2)
        }
      }
    }
</script>

<style lang="less">
  /*歌词部分*/
  .music-lyric {
    height: 100%;
    overflow: hidden;
    text-align: center;
    .music-lyric-items {
      text-align: center;
      line-height: 34px;
      font-size: 12px;
      transform: translate3d(0, 50%, 0);
      transition: transform 0.6s ease-out;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      .on {
        color: #40ce8f;
      }
      p{
        margin: 0;
      }
    }
  }
</style>
