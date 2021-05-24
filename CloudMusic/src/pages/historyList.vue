<template lang="html">
  <div>
    <search-detail :list="list"></search-detail>
    <no-result title="还未播放过音乐哦！"></no-result>
  </div>
</template>

<script>
  import SearchDetail from '../components/search-detail'
  import NoResult from '../components/no-result'

  export default {
    components: {
      NoResult,
      SearchDetail
    },
    data() {
      return {
        list:[]
      }
    },
    methods:{
      getHistory(){
        
      }
    }

  }
</script>

<style>
</style>
