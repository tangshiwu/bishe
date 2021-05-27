<template lang="html">
  <div>
    <p class="msg">一首歌 | 一个故事</p>
    <div v-if="user.userId" class="login-msg">
<!--      <img :src="user.avatarUrl+'?param=35y35'" alt="">-->
      <span class="username">{{user.nickname}}</span>
      <span @click="openDialog(1)">退出登录</span>
    </div>
    <span v-else class="login-msg" @click="openDialog(0)">登录</span>

    <!--    登录-->
    <my-dialog
      ref="loginDialog"
      confirm-btn-text="登录"
      cancel-btn-text="关闭"
      @confirm="login">
      <div class="dialog-text">
        <input
          v-model.trim="phone"
          class="dialog-input"
          type="number"
          autofocus
          placeholder="请输入您的网易云绑定手机号"
        />
        <input
          v-model.trim="password"
          class="dialog-input"
          type="password"
          autofocus
          placeholder="请输入您的网易云密码"
        />
      </div>
    </my-dialog>
    <!--退出-->
    <my-dialog
      ref="outDialog"
      body-text="确定退出当前用户吗？"
      @confirm="out"
    ></my-dialog>
  </div>
</template>

<script>
  import myDialog from "./myDialog";
  import {mapGetters, mapActions} from 'vuex'
  import {myToast} from '../utils/util'

  export default {
    components: {
      myDialog
    },
    computed: {
      ...mapGetters(['uid'])
    },
    created() {
      this.uid && this.getUserPlaylist(this.uid)
    },
    data() {
      return {
        user: {},
        phone:'',
        password:''
      }
    },
    methods: {
      openDialog(key) {
        switch (key) {
          case 0:
            this.$refs.loginDialog.show()
            break
          case 1:
            this.$refs.outDialog.show()
            break
          case 2:
            this.$refs.loginDialog.hide()
            break

        }
      },
      // 退出登录
      out() {
        this.user = {}
        this.setUid(null)
        myToast('退出成功！', 2000)
      },
      // 登录
      login() {
        if (this.phone === ''||this.password === '') {
          myToast('手机号和密码不能为空', 2000)
          this.openDialog(0)
          return
        }
        this.openDialog(2)
        this.getUserInfo(this.phone,this.password)
      },
      getUserInfo(phone,password) {
        this.$http('/login/cellphone', {params: {phone: phone,password:password}})
          .then(res => {
            if (!res.data.account.id) {
              myToast(`未查询找手机号为 ${phone} 的用户信息`, 2000)
              return
            }
            this.getUserPlaylist(res.data.account.id)
          })
      },
      getUserPlaylist(uid){
        this.setUid(uid)
        this.$http('/user/playlist', {params: {uid: uid}})
        .then(res => {
          this.user = res.data.playlist[0].creator
          setTimeout(() => {
            myToast(`${this.user.nickname},很高兴和你在此相遇！`, 1000)
          }, 200)
        })
      },
      ...mapActions(['setUid'])
    },

  }
</script>

<style lang="less">
  .msg {
    font-size: 18px;
    display: inline-block;
    margin: 15px;
    color: white;
  }

  .login-msg {
    float: right;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    margin-right: 14px;
    color: gainsboro;
  }
  .username{
    color: white;
    font-size: 16px;
    margin-right: 5px;
  }

  .dialog-text {
    text-align: left;

    .dialog-input {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      padding: 0 15px;
      border: 1px solid rgba(255, 255, 255, 0.6);
      outline: 0;
      background: transparent;
      color: white;
      font-size: 14px;
      box-shadow: 0 0 1px 0 white inset;
      &:nth-child(1){
        margin-bottom: 10px;
      }
      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }

      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }

    a {
      color: rgba(255, 255, 255, 0.7);
    }

    a:hover {
      color: #d43c33;
    }
  }


</style>
