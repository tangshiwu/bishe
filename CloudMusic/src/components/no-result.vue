<template>
  <!--暂无数据提示-->
  <div class="no-result">
    <p class="no-result-text">{{ title }}</p>
  </div>
</template>

<script>
  export default {
    name: 'NoResult',
    props: {
      // 无数据提示文本
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="less">
  .no-result {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    &-text {
      margin-top: 30px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
</style>
