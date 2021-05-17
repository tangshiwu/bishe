<template>
  <div v-if="true">
    <song-detail :list="playlist"></song-detail>
  </div>
  <no-result v-else title="还没有歌曲数据哦！"></no-result>
</template>

<script>
  import NoResult from '../components/no-result'
  import SongDetail from '../components/song-detail'
  import { mapGetters,mapActions } from 'vuex'

  export default {
    components: {
      NoResult,SongDetail
    },
    data(){
      return {

      }
    },
    computed:{
      ...mapGetters(['playlist'])
    },
    created() {
      this.getList()
    },
    methods: {
      getList(){
        this.$http('/playlist/detail',{params:{id:3778678}})
        .then(res => {
          let initList = res.data.playlist.tracks.slice(0,80)
          this.setPlaylist(initList)
        }).catch(err => {
          console.log(err)
        })
      },
      ...mapActions(['setPlaylist'])
    },

  }
</script>

