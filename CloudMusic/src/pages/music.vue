<template>
  <div v-if="flag">
    <song-detail :list="playlist"></song-detail>
  </div>
  <no-result v-else title="加载中！"></no-result>
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
        flag: false
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
          this.flag = !this.flag
        }).catch(err => {
          console.log(err)
        })
      },
      ...mapActions(['setPlaylist'])
    },

  }
</script>

