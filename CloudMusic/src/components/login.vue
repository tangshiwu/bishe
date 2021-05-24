<template lang="html">
  <div>
    <p class="msg">一首歌 | 一个故事</p>
    <div v-if="user.userId" class="login-msg">
<!--      <img :src="user.avatarUrl+'?param=35y35'" alt="">-->
      <span class="username">{{user.nickname}}</span>
      <span @click="openDialog(2)">退出登录</span>
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
          v-model.trim="uidValue"
          class="dialog-input"
          type="number"
          autofocus
          placeholder="请输入您的网易云 UID"
          @keyup.enter="login"
        />
      </div>
      <div slot="btn" @click="openDialog(1)">帮助</div>
    </my-dialog>
    <!--帮助-->
    <my-dialog
      ref="helpDialog"
      head-text="登录帮助"
      cancel-btn-text="关闭"
      confirm-btn-text="去登录"
      @confirm="openDialog(0)"
    >
      <div class="dialog-text">
        <p>
          1、
          <a target="_blank" href="https://music.163.com">
            点我(https://music.163.com)
          </a>
          打开网易云音乐官网
        </p>
        <p>2、点击页面右上角的“登录”</p>
        <p>3、点击您的头像，进入我的主页</p>
        <p>4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）</p>
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

  export default {
    components: {
      myDialog
    },
    computed: {
      ...mapGetters(['uid'])
    },
    created() {
      this.uid && this._getUserPlaylist(this.uid)
    },
    data() {
      return {
        user: {},
        uidValue: ''
      }
    },
    methods: {
      openDialog(key) {
        switch (key) {
          case 0:
            this.$refs.loginDialog.show()
            break
          case 1:
            this.$refs.loginDialog.hide()
            this.$refs.helpDialog.show()
            break
          case 2:
            this.$refs.outDialog.show()
            break
          case 3:
            this.$refs.loginDialog.hide()
            break
        }
      },
      // 退出登录
      out() {
        this.user = {}
        this.setUid(null)
        this.myToast('退出成功！', 2000)
      },
      // 登录
      login() {
        if (this.uidValue === '') {
          this.myToast('UID 不能为空', 2000)
          this.openDialog(0)
          return
        }
        this.openDialog(3)
        this._getUserPlaylist(this.uidValue)
      },
      _getUserPlaylist(uid) {
        this.$http('/user/playlist', {params: {uid: uid}})
          .then(res => {
            if (!res.data.playlist[0].creator) {
              this.myToast(`未查询找 UID 为 ${uid} 的用户信息`, 2000)
              return
            }
            this.setUid(uid)
            this.user = res.data.playlist[0].creator
            setTimeout(() => {
              this.myToast(`${this.user.nickname},很高兴和你在此相遇！`, 1000)
            }, 200)

          })
        // .then(({ playlist = [] }) => {
        //   this.uidValue = ''
        //   if (playlist.length === 0 || !playlist[0].creator) {
        //     this.myToast(`未查询找 UID 为 ${uid} 的用户信息`,2000)
        //     return
        //   }
        //   const creator = playlist[0].creator
        //   this.setUid(uid)
        //   this.user = creator
        //   setTimeout(() => {
        //     this.myToast(`${this.user.nickname},很高兴和你在此相遇！`,1500)
        //   }, 200)
        // })
      },
      // 创建toast弹窗
      myToast(msg, duration) {
        duration = isNaN(duration) ? 3000 : duration;
        let myDiv = document.createElement('div');
        myDiv.innerHTML = msg;
        myDiv.style.cssText = " max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
        document.body.appendChild(myDiv);
        setTimeout(function () {
          let d = 0.5;
          myDiv.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
          myDiv.style.opacity = '0';
          setTimeout(function () {
            document.body.removeChild(myDiv)
          }, d * 1000);
        }, duration);
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
