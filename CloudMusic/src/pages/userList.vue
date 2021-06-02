<template lang="html">
  <user-detail v-if="flag" :list="list"></user-detail>
  <no-result v-else title="加载中！"></no-result>
</template>

<script>
  import userDetail from '../components/user-detail'
  import NoResult from '../components/no-result'
  export default {
    components:{
      userDetail,
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
        let timestamp = (new Date()).getTime()
        this.$http('/api/playlist/detail', {params: {id: id,timestamp:timestamp}})
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

<style lang="less">
</style>
