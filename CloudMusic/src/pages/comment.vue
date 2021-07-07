<template lang="html">
  <div class="comment-contain">
    <div class="post-btn"  @click="openDialog(1)">
      <img src="../../static/img/pen.png" class="pen" alt="">
      <span>发表评论</span>
    </div>
    <p class="comment-title">精彩评论</p>
    <div v-for="item in hotComment" class="comment-item">
      <img :src="item.user.avatarUrl+'?param=40y40'" class="comment-item-img" alt="">
      <div class="comment-info">
          <span class="comment-name">
            {{item.user.nickname}}:<span class="comment-content">{{item.content}}</span>
          </span>
        <p class="comment-time">{{item.time | format}}</p>
      </div>
      <div class="like">
        <img src="../../static/img/like.png" class="like-icon" alt="">
        <span class="like-count">{{item.likedCount}}</span>
      </div>
    </div>
    <p class="comment-title">最新评论</p>
    <div v-for="item in newComment" class="comment-item">
      <img :src="item.user.avatarUrl+'?param=40y40'" class="comment-item-img" alt="">
      <div class="comment-info">
          <span class="comment-name">
            {{item.user.nickname}}:<span class="comment-content">{{item.content}}</span>
          </span>
        <p class="comment-time">{{item.time | format}}</p>
      </div>
      <div class="like">
        <img src="../../static/img/like.png" class="like-icon" alt="">
        <span class="like-count">{{item.likedCount}}</span>
      </div>
    </div>
    <my-dialog
      ref="postDialog"
      confirm-btn-text="发表"
      cancel-btn-text="关闭"
      @confirm="publish">
      <div class="dialog-text">
        <textarea
          v-model.trim="message"
          class="dialog-area"
          autofocus
          placeholder="下一个神评就是你！"
          maxlength="200"
        ></textarea>
      </div>
    </my-dialog>
  </div>

</template>

<script>
  import {zero,myToast} from '../utils/util'
  import myDialog from "../components/myDialog";
  export default {
    components:{
      myDialog
    },
    data() {
      return {
        hotComment: [],
        newComment:[],
        message:''
      }
    },
    filters: {
      format(time) {
        let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let timestamp = (new Date()).getTime()
        if (timestamp-time<600000){
          return '刚刚'
        }else {
          return year + '年' + zero(month) + '月' + zero(day) + '日 ' + zero(hours) + ':' + zero(minutes)
        }
      }
    },
    created() {
      this.getComment()
    },
    methods: {
      getComment() {
        let id = this.$route.params.id
        this.$http('/api/comment/music', {params: {id: id, limit: 30}})
          .then(res => {
            this.hotComment = res.data.hotComments
            this.newComment = res.data.comments
          })
      },
      openDialog(key){
        switch (key) {
          case 1:
            this.$refs.postDialog.show()
                break
          case 2:
            this.$refs.postDialog.hide()
                break
        }
      },
      publish(){
        let id = this.$route.params.id
        this.$http('/api/comment',{params: {t:1,type:0,id: id,content:this.message}})
        .then(res => {
          myToast('评论成功',1000)
        }).catch(err => {
          console.log(err)
        })

      }
    }
  }
</script>
<style lang="less">
  .comment-contain {
    position: relative;
  }
  .comment-title{
    text-align: left;
    color: ghostwhite;
    font-size: 18px;
    padding: 10px 0 15px;
    border-bottom: ghostwhite 1px solid;
  }
  .post-btn {
    position: fixed;
    width: 150px;
    height: 35px;
    bottom: 20px;
    right: 30%;
    background-color: rgba(160,160,170,.8);
    border-radius: 20px;
    color: ghostwhite;
    padding-top: 10px;
    z-index: 99;
    .pen{
      vertical-align: middle;
      margin-right: 8px;
      width: 21px;
      height: 21px;
    }
  }
  .post-btn:hover{
    color: skyblue;
    cursor: pointer;
  }

  .comment-item {
    position: relative;
    width: 100%;
    height: 95px;
    border-bottom: rgba(160, 160, 160, .7) 1px solid;
    text-align: left;
    display: flex;
    z-index: 50;
    .comment-item-img {
      position: absolute;
      left: 0;
      top: 20px;
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }

  }

  .comment-info {
    height: 100px;
    margin-left: 60px;
    flex: 1;

    .comment-name {
      position: relative;
      display: inline-block;
      color: skyblue;
      opacity: 0.9;
      margin-top: 15px;

      .comment-content {
        color: lightgrey;
        margin-left: 10px;
        font-size: 15px;
      }
    }

    .comment-time {
      position: absolute;
      margin-top: 15px;
      font-size: 14px;
      color: darkgrey;

    }
  }

  .like {
    width: 90px;
    height: 20px;
    margin-top: 40px;

    .like-icon {
      vertical-align: middle;
      width: 20px;
      height: 20px;
    }

    .like-count {
      vertical-align: bottom;
      font-size: 14px;
    }
  }
.dialog-area{
  width: 375px;
  height: 150px;
  background: transparent;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
