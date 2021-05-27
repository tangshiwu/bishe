<template lang="html">
  <div>
    <search-detail v-if="historyList" :list="historyList"></search-detail>
    <no-result v-else title="还未播放过音乐哦！"></no-result>
  </div>
</template>

<script>
  import NoResult from '../components/no-result'
  import {mapGetters} from 'vuex'
  import SearchDetail from '../components/search-detail'

  export default {
    components: {
      NoResult,
      SearchDetail
    },
    computed:{
      ...mapGetters(['uid','historyList'])
    },
    data() {
      return {}
    },
    methods:{
      // ...mapActions(['setHistory']),
      // getHistoryList(){
      //   this.$http('/user/record',{params:{uid:this.uid}})
      //   .then(res => {
      //     console.log(res)
      //   })
      // }
    }

  }
</script>

<style>
</style>
