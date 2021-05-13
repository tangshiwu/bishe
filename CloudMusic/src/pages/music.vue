<template>
  <!--歌曲列表-->
  <div class="musicList">
    <template v-if="list.length>0">
      <div class="list-item list-header">
        <span class="list-name">歌曲</span>
        <span class="list-artist">歌手</span>
        <span v-if="listType === 1" class="list-time">时长</span>
        <span v-else class="list-album">专辑</span>
      </div>
      <div ref="listContent" class="list-content" @scroll="listScroll($event)">
        <div
          v-for="(item,index) in list"
          :key="item.id"
          class="list-item"
          :class="{'on':playing&&currentMusic.id===item.id}"
          @dblclick="selectItem(item,index,$event)"
        >
          <span class="list-num" v-text="index+1"></span>
          <div class="list-name">
            <span>{{ item.name }}</span>
            <div class="list-menu">
              <mm-icon
                class="hover"
                :type="getPlayIconType(item)"
                :size="40"
                @click.stop="selectItem(item,index)"
              />
            </div>
          </div>
          <span class="list-artist">{{ item.singer }}</span>
          <span v-if="listType === 1" class="list-time">
            {{ (item.duration % 3600) | format }}
            <mm-icon
              class="hover list-menu-icon-del"
              type="delete-mini"
              :size="40"
              @click.stop="deleteItem(index)"
            />
          </span>
          <span v-else class="list-album">{{ item.album }}</span>
        </div>
        <slot name="listBtn"></slot>
      </div>
    </template>
    <p v-else>什么也没有！！！</p>
  </div>
</template>

<script>
  import NoResult from '../components/no-result'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'MusicList',
    components: {
      NoResult
    },
    // filters: {
    //   format
    // },
    props: {
      // 歌曲数据
      // list: {
      //   type: Array,
      //   default: () => []
      // },
      /**
       *  0：显示专辑栏目（默认）
       *  1：显示时长栏目
       */
      listType: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        list:[],
        // listType: {
        //   type: Number,
        //   default: 0
        // },
        lockUp: true // 是否锁定滚动加载事件,默认锁定
      }
    },
    computed: {
      ...mapGetters(['playing', 'currentMusic'])
    },
    watch: {
      list(newList, oldList) {
        if (this.listType !== 2) {
          return
        }
        if (newList.length !== oldList.length) {
          this.lockUp = false
        } else if (
          newList[newList.length - 1].id !== oldList[oldList.length - 1].id
        ) {
          this.lockUp = false
        }
      }
    },
    activated() {
      this.scrollTop &&
      this.$refs.listContent &&
      (this.$refs.listContent.scrollTop = this.scrollTop)
    },
    created() {
      this.getList()
    },
    methods: {
      getList(){
        this.$http('/playlist/detail',{params:{id:3778678}})
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      // 滚动事件
      listScroll(e) {
        const scrollTop = e.target.scrollTop
        this.scrollTop = scrollTop
        if (this.listType !== 2 || this.lockUp) {
          return
        }
        const { scrollHeight, offsetHeight } = e.target
        if (scrollTop + offsetHeight >= scrollHeight - 50) {
          this.lockUp = true // 锁定滚动加载
          this.$emit('pullUp') // 触发滚动加载事件
        }
      },
      // 回到顶部
      scrollTo() {
        this.$refs.listContent.scrollTop = 0
      },
      // 播放暂停事件
      selectItem(item, index, e) {
        if (e && /list-menu-icon-del/.test(e.target.className)) {
          return
        }
        if (this.currentMusic.id && item.id === this.currentMusic.id) {
          this.setPlaying(!this.playing)
          return
        }

        /**
         * 为了修复 safari、 ios 微信、安卓 UC 无法播放问题，暂时移除接口校验直接播放
         */
        this.$emit('select', item, index) // 触发点击播放事件

        // getMusicUrl(item.id)
        // .then(res => {
        //     if (!res.data.data[0].url) {
        //         this.$mmToast('当前音乐无法播放，请播放其他音乐')
        //     } else {
        //         this.$emit('select', item, index)//触发点击播放事件
        //     }
        // });
        // getCheckMusic(item.id)
        // .then(res => {
        //     if (res.data.message !== 'ok') {
        //         this.$mmToast('当前音乐无法播放，请播放其他音乐')
        //     } else {
        //         this.$emit('select', item, index)//触发点击播放事件
        //     }
        // }).catch(error => {
        //     this.$mmToast(error.response.data.message)
        // })
      },
      // 获取播放状态 type
      getPlayIconType({ id: itemId }) {
        const {
          playing,
          currentMusic: { id }
        } = this
        return playing && id === itemId ? 'pause-mini' : 'play-mini'
      },
      // 删除事件
      deleteItem(index) {
        this.$emit('del', index) // 触发删除事件
      },
      ...mapMutations({
        setPlaying: 'setPlaying'
      })
    }
  }
</script>

<style lang="less">
  .list-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.8);
    color: #fff;

    .list-name {
      padding-left: 40px;
      user-select: none;
    }
  }

  .list-content {
    width: 100%;
    height: calc(100% - 60px);
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .list-no {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: rgba(255, 255, 255, 0.6);
  }

  .list-item {
    display: flex;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    line-height: 50px;
    overflow: hidden;

    &.list-item-no {
      justify-content: center;
      align-items: center;
    }

    &.on {
      color: #fff;

      .list-num {
        font-size: 0;
        background: url('../../static/img/sign.gif') no-repeat center center;
      }
    }

    &:hover {
      .list-name {
        padding-right: 80px;

        .list-menu {
          display: block;
        }
      }
    }

    &:not([class*='list-header']):hover {
      .list-name {
        padding-right: 80px;

        .list-menu {
          display: block;
        }
      }

      .list-time {
        font-size: 0;

        .list-menu-icon-del {
          display: block;
        }
      }
    }

    .list-num {
      display: block;
      width: 30px;
      margin-right: 10px;
      text-align: center;
    }

    .list-name {
      position: relative;
      flex: 1;
      box-sizing: border-box;

      & > span {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }

      small {
        margin-left: 5px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
      }

      /*hover菜单*/

      .list-menu {
        display: none;
        position: absolute;
        top: 50%;
        right: 10px;
        height: 40px;
        font-size: 0;
        transform: translateY(-50%);
      }
    }

    .list-artist,
    .list-album {
      display: block;
      width: 300px;
      .no-wrap() {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      @media (max-width: 1440px) {
        width: 200px;
      }
      @media (max-width: 1200px) {
        width: 150px;
      }
    }

    .list-time {
      display: block;
      width: 60px;
      position: relative;

      .list-menu-icon-del {
        display: none;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }
  }

  @media (max-width: 960px) {
    .list-item .list-name {
      padding-right: 70px;
    }
  }

  @media (max-width: 768px) {
    .list-item {
      .list-name .list-menu {
        display: block;
      }

      .list-artist,
      .list-album {
        width: 20%;
      }
    }
  }

  @media (max-width: 640px) {
    .list-item {
      .list-artist {
        width: 80px;
      }

      .list-album,
      .list-time {
        display: none;
      }
    }
  }
</style>
