<template lang="html">
  <transition name="dialog-fade">
    <div class="dialog-contain" v-show="dialogShow">
      <div class="dialog-wrap">
        <div class="dialog-content">
          <div class="dialog-head" v-text="headText"></div>
          <slot>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="dialog-text" v-html="bodyText"></div>
          </slot>
          <div class="dialog-btns">
            <div
              v-if="dialogType!=='alert'"
              class="btn-cancel"
              @click="cancel"
              v-text="cancelBtnText"
            ></div>
            <slot name="btn"></slot>
            <div
              class="btn-confirm"
              @click="confirm"
              v-text="confirmBtnText"
            ></div>
          </div>
        </div>
      </div>

    </div>
  </transition>

</template>

<script>
  export default {
    name: 'myDialog',
    props: {
      // type：confirm、alert
      type: {
        type: String,
        default: 'confirm'
      },
      // 标题文本
      headText: {
        type: String,
        default: '提示'
      },
      // 内容文本（可以是html）
      bodyText: {
        type: String,
        default: ''
      },
      // 取消按钮文本
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      // 确定按钮文本
      confirmBtnText: {
        type: String,
        default: '确定'
      },
      // Dialog 是否插入至 body 元素下
      appendToBody: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dialogShow: false
      }
    },
    computed: {
      dialogType() {
        return this.type.toLowerCase()
      }
    },
    watch: {
      dialogShow(val) {
        if (val && this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      }
    },
    mounted() {
      if (this.dialogShow && this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    },
    destroyed() {
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    },
    methods: {
      // 显示事件
      show() {
        this.dialogShow = true
      },
      // 隐藏事件
      hide() {
        this.dialogShow = false
      },
      // 取消事件
      cancel() {
        this.hide()
        this.$emit('cancel')
      },
      // 确定事件
      confirm() {
        this.hide()
        this.$emit('confirm')
      }
    }

  }
</script>

<style lang="less">
  .dialog-contain {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.3);
    &.dialog-fade-enter-active {
      animation: dialog-fadein 0.3s;
      .dialog-content {
        animation: dialog-zoom 0.3s;
      }
    }
  }
  .dialog-wrap{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 420px;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,0.6);
    border-radius: 5px;
    .dialog-head {
      font-size: 18px;
      color: white;
    }
    .dialog-text {
      padding: 20px 15px;
      line-height: 22px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
    }
    .dialog-btns {
      display: flex;
      align-items: center;
      padding: 0 15px 10px;
      text-align: center;
      color: rgba(255, 255, 255, 0.7);
      @media (min-width: 768px) {
        justify-content: flex-end;
        div {
          display: block;
          padding: 8px 15px;
          margin-left: 10px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          font-size: 14px;
          cursor: pointer;
          &:hover {
            color: white;
            border: 1px solid white;
          }
        }
      }
    }
  }

</style>
