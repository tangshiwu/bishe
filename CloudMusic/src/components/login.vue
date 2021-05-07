<template lang="html">
  <div>
    <p class="msg">一首歌|一个故事</p>
    <div v-if="user.userId" class="login-msg">
      <span>退出登录</span>
    </div>
    <span v-else class="login-msg">登录</span>
  </div>
<!--  &lt;!&ndash;登录&ndash;&gt;-->
<!--  <dialog-->
<!--    ref="loginDialog"-->
<!--    head-text="登录"-->
<!--    confirm-btn-text="登录"-->
<!--    cancel-btn-text="关闭"-->
<!--    @confirm="login">-->
<!--    <div class="mm-dialog-text">-->
<!--      <input-->
<!--        v-model.trim="UID"-->
<!--        class="mm-dialog-input"-->
<!--        type="number"-->
<!--        autofocus-->
<!--        placeholder="请输入您的网易云 UID"-->
<!--        @keyup.enter="login"-->
<!--      />-->
<!--    </div>-->
<!--    <div slot="btn">帮助</div>-->
<!--  </dialog>-->
<!--  &lt;!&ndash;帮助&ndash;&gt;-->
<!--  <dialog-->
<!--    ref="helpDialog"-->
<!--    head-text="登录帮助"-->
<!--    confirm-btn-text="去登录"-->
<!--    cancel-btn-text="关闭"-->
<!--  >-->
<!--    <div class="mm-dialog-text">-->
<!--      <p>-->
<!--        1、-->
<!--        <a target="_blank" href="https://music.163.com">-->
<!--          点我(https://music.163.com)-->
<!--        </a>-->
<!--        打开网易云音乐官网-->
<!--      </p>-->
<!--      <p>2、点击页面右上角的“登录”</p>-->
<!--      <p>3、点击您的头像，进入我的主页</p>-->
<!--      <p>4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）</p>-->
<!--    </div>-->
<!--  </dialog>-->
<!--  &lt;!&ndash;退出&ndash;&gt;-->
<!--  <dialog-->
<!--    ref="outDialog"-->
<!--    body-text="确定退出当前用户吗？"-->
<!--    @confirm="out"-->
<!--  ></dialog>-->
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

<style>
  .msg{
    font-size: 18px;
    display: inline-block;
  }
  .login-msg{
    float: right;
    margin: 20px 15px;
    font-size: 14px;
  }

</style>
