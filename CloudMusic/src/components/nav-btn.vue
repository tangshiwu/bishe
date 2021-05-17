<template lang="html">
    <div class="nav">
      <router-link to="/music" class="btn">发现音乐</router-link>
      <router-link to="/recommend" class="btn short">推荐</router-link>
      <router-link to="/search" class="btn short">搜索</router-link>
      <router-link to="/songList" class="btn">我的歌单</router-link>
      <router-link to="/listened" class="btn">我听过的</router-link>
    </div>
</template>

<script>

</script>

<style>
  .btn {
    text-decoration: none;
    height: 37px;
    border: gray solid 1px;
    line-height: 37px;
    padding: 0 10px;
    border-radius: 3px;
    margin: 0 10px;
    overflow: hidden;
    color: gray;
  }
  .router-link-active, .btn:hover{
    border: black solid 1px;
    color: black;
    height: 40px;
    line-height: 40px;
  }
  .short{
    width: 60px;
  }
</style>
