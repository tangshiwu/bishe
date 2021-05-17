<template lang="html">
  <div>
    <song-list :list="playList1"></song-list>
  </div>
</template>

<script>
  import SongList from '../components/song-detail'

  export default {
    components:{
      SongList
    },
    data() {
      return {
        playList1:[]
      }
    },
    mounted() {
      this.getListInfo()
    },
    methods: {
      //获取歌单详情数据
      getListInfo() {
        let id = this.$route.params.id
        this.$http('/playlist/detail', {params: {id: id}})
          .then(res => {
            this.playList1 = res.data.playlist.tracks.slice(0,80)
          }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style>
</style>
