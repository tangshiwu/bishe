<template lang="html">
  <div>
    <p class="msg">一首歌 | 一个故事</p>
    <div v-if="user.userId" class="login-msg">
      <span>退出登录</span>
    </div>
    <span v-else class="login-msg">登录</span>
  </div>

</template>

<script>
  // import dialog from "./dialog";
    export default {
      // components:{
      //   dialog
      // },
        data() {
            return {
              user:{

              },
              UID:''
            }
        },

    }
</script>

<style lang="less">
  .msg{
    font-size: 18px;
    display: inline-block;
    margin: 15px;
    color: white;
  }
  .login-msg{
    float: right;
    margin: 15px;
    font-size: 14px;
    color: white;
  }

</style>
