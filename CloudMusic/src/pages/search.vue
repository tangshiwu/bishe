<template lang="html">
  <div>
    <div class="search">
      <span v-for="item in hotSearch"
            class="hot-word" @click="search(item.first)">{{item.first}}</span>
      <input type="text"
             v-model="searchWord"
             placeholder="请输入歌曲或歌手"
             class="search-input"
             @keydown="enterSearch(searchWord)"
      >
    </div>
    <div class="result" v-if="searchResult.length>0">
      <search-detail :list="searchResult"></search-detail>
    </div>

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
        searchResult: []
      }
    },
    created() {
      this.getHot()
    },
    methods: {
      //获取热搜歌曲列表
      getHot() {
        this.$http('/search/hot')
          .then(res => {
            this.hotSearch = res.data.result.hots.slice(0, 4);
          }).catch(err => {
          console.log(err);
        })
      },
      //根据关键字搜索歌曲
      search(word) {
        this.$http('/search', {params: {keywords: word}})
          .then(res => {
            this.searchResult = res.data.result.songs
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
      }
    }
  }
</script>

<style lang="less">
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
