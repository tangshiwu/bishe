<template lang="html">
    <div>
      <p>歌单详情页</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {
          this.getListInfo()
        },
      methods:{
          getListInfo(){
            let id = this.$route.params.id
            this.$http('/playlist/detail',{params: {id:id}})
            .then(res => {
              console.log(res)
            }).catch(err => {
              console.log(err)
            })
          }
        }
    }
</script>

<style>
</style>
