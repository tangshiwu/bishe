<template lang="html">
  <div  class="searchPage">
    <div class="search">
      <span v-for="item in hotSearch"
            class="hot-word" @click="search(item.first)">{{item.first}}</span>
      <input type="text"
             v-model="searchWord"
             placeholder="请输入要查询歌曲的信息"
             class="search-input"
             @keydown="enterSearch(searchWord)"
      >
    </div>
    <search-detail v-if="searchResult.length > 0" :list="list"></search-detail>
  </div>

</template>

<script>
  import SearchDetail from '../components/search-detail'

  export default {
    components: {
      SearchDetail
    },
    data() {
      return {
        searchWord: '',
        hotSearch: [],
        searchResult: [],
        list:[]
      }
    },
    created() {
      this.getHot()
    },
    methods: {
      //获取热搜歌曲列表
      getHot() {
        this.$http('/api/search/hot')
          .then(res => {
            this.hotSearch = res.data.result.hots.slice(0, 4);
          }).catch(err => {
          console.log(err);
        })
      },
      //根据关键字搜索歌曲
      search(word) {
        this.$http('/api/search', {params: {keywords: word}})
          .then(res => {
            this.searchResult = res.data.result.songs
            this.list = this.searchResult
          }).catch(err => {
          console.log(err);
        })
      },
      //手动输入歌曲或歌手搜索歌曲
      enterSearch(word) {
        if (event.keyCode === 13) {
          if (word === '') {
            alert("请输入信息")
          } else {
            this.search(word)
          }
        }
      },
    }
  }
</script>

<style lang="less">
  .searchPage{
    width: 100%;
    height: calc(100% - 5px);
  }
  .search {
    width: 100vw;
    height: 60px;
    display: flex;
    flex-direction: row;
    background: rgba(0, 0, 0, .3);
    margin-top: 5px;
    white-space: nowrap;

    .search-input {
      box-sizing: border-box;
      padding: 0 5px;
      margin: 8px 5px 0;
      flex: 1;
      height: 40px;
      background: transparent;
      border: white 1px solid;

      &::placeholder {
        font-size: 15px;
        color: ghostwhite;
      }
    }
  }

  .hot-word {
    display: inline-block;
    margin: 0 10px;
    line-height: 60px;
  }

  .hot-word:hover {
    cursor: pointer;
    color: white;
  }

  @media (max-width: 545px) {
    .hot-word {
      display: none;
    }
  }
</style>
