<template lang="html">
  <div v-if="flag">
    <song-list :list="playlist"></song-list>
  </div>
  <no-result v-else title="加载中！"></no-result>
</template>

<script>
  import SongList from '../components/song-detail'
  import NoResult from '../components/no-result'
  import {mapGetters,mapActions} from 'vuex'
  export default {
    components:{
      SongList,
      NoResult
    },
    computed:{
      ...mapGetters(['playlist'])
    },
    data() {
      return {
        flag: false
      }
    },
    created() {
      this.getListInfo()
    },
    methods: {
      //获取歌单详情数据
      getListInfo() {
        let id = this.$route.params.id
        this.$http('/playlist/detail', {params: {id: id}})
          .then(res => {
            let list = res.data.playlist.tracks.slice(0,80)
            this.setPlaylist(list)
            this.flag = !this.flag
          }).catch(err => {
          console.log(err)
        })
      },
      ...mapActions(['setPlaylist'])
    }
  }
</script>

<style>
</style>
