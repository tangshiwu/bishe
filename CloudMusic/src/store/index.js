import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import {getUserId,getHistoryList} from "../utils/storage";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playing: false, // 播放状态
    playlist: [], // 播放列表
    orderList: [], // 顺序列表
    currentIndex: -1, // 当前音乐索引
    uid: getUserId() || null, // 网易云用户UID
    historyList: getHistoryList() || [] // 播放历史列表
  },
  getters: {
// 播放状态
    playing: state => state.playing,
// 播放列表
    playlist: state => state.playlist,
// 顺序列表
    orderList: state => state.orderList,
// 当前音乐索引
    currentIndex: state => state.currentIndex,
// 当前音乐
    currentMusic: state => {
      return state.playlist[state.currentIndex] || {}
    },
// 播放历史列表
    historyList: state => state.historyList,
// 网易云用户UID
    uid: state => state.uid,

  },
  mutations,
  actions

})
