<template lang="html">
  <song-detail v-if="flag" :list="list"></song-detail>
  <no-result v-else title="加载中！"></no-result>
</template>

<script>
  import SongDetail from '../components/song-detail'
  import NoResult from '../components/no-result'
  export default {
    components:{
      SongDetail,
      NoResult
    },
    data() {
      return {
        flag: false,
        list:[]
      }
    },
    created() {
      this.getListInfo()
    },
    methods: {
      //获取歌单详情数据
      getListInfo() {
        let id = this.$route.params.id
        this.$http('/api/playlist/detail', {params: {id: id}})
          .then(res => {
            this.list = res.data.playlist.tracks.slice(0,80)
            this.flag = !this.flag
          }).catch(err => {
          console.log(err)
        })
      },

    }
  }
</script>

<style>
</style>
