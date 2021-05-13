import Vue from 'vue'
import Vuex from 'vuex'
import {
  clearHistoryList,
  setHistoryList,
  removeHistoryList,
  setMode,
  setUserId,
  getHistoryList,
  getMode,
  getUserId
} from '../utils/storage'
import {playMode} from '../utils/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audioEle: null, // audio元素
    mode: Number(getMode()) || playMode.listLoop, // 播放模式，默认列表循环
    playing: false, // 播放状态
    playlist: [], // 播放列表
    orderList: [], // 顺序列表
    currentIndex: -1, // 当前音乐索引
    historyList: getHistoryList() || [], // 播放历史列表
    uid: getUserId() || null // 网易云用户UID
  },
  getters: {
    // audio元素
    audioEle: state => state.audioEle,
// 播放模式
    mode: state => state.mode,
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
  mutations: {
    setAudioEle(state, audioEle) {
      state.audioEle = audioEle
    },
    // 修改播放模式
    setPlayMode(state, mode) {
      state.mode = mode
    },
    // 修改播放状态
    setPlaying(state, playing) {
      state.playing = playing
    },
    // 修改播放列表
    setPlayList(state, playlist) {
      state.playlist = playlist
    },
    // 修改顺序列表
    setOrderList(state, orderList) {
      state.orderList = orderList
    },
    // 修改当前音乐索引
    setCurrentIndex(state, currentIndex) {
      state.currentIndex = currentIndex
    },
    // 修改播放历史列表
    setHistoryList(state, historyList) {
      state.historyList = historyList
    },
    // 修改网易云用户UID
    setUid(state, uid) {
      state.uid = uid
    }
  },
  actions: {
    findIndex(list, music) {
      return list.findIndex(item => {
        return item.id === music.id
      })
    },
// 设置播放列表
    setPlaylist({commit}, {list}) {
      commit("setPlayList", list)
      commit("setOrderList", list)
    },

// 选择播放（会更新整个播放列表）
    selectPlay({commit}, {list, index}) {
      commit("setPlayList", list)
      commit("setOrderList", list)
      commit("setCurrentIndex", index)
      commit("setPlaying", true)
    },
// 选择播放（会插入一条到播放列表）
    selectAddPlay({commit, state}, music) {
      let list = [...state.playlist]
      // 查询当前播放列表是否有代插入的音乐，并返回其索引值
      let index = this.findIndex(list, music)
      // 当前播放列表有待插入的音乐时，直接改变当前播放音乐的索引值
      if (index > -1) {
        commit("setCurrentIndex", index)
      } else {
        list.unshift(music)
        commit("setPlayList", list)
        commit("setOrderList", list)
        commit("setCurrentIndex", 0)
      }
      commit("setPlaying", true)
    },

// 清空播放列表
    clearPlayList({commit}) {
      commit("setPlaying", false)
      commit("setCurrentIndex", -1)
      commit("setPlayList", [])
      commit("setOrderList", [])
    },

// 删除正在播放列表中的歌曲
    removerPlayListItem({commit, state}, {list, index}) {
      let currentIndex = state.currentIndex
      if (index < state.currentIndex || list.length === state.currentIndex) {
        currentIndex--
        commit("setCurrentIndex", currentIndex)
      }
      commit("setPlayList", list)
      commit("setOrderList", list)
      if (!list.length) {
        commit("setPlaying", false)
      } else {
        commit("setPlaying", true)
      }
    },
// 设置播放历史
    setHistory({commit}, music) {
      commit("setHistoryList", setHistoryList(music))
    },
// 删除播放历史
    removeHistory({commit}, music) {
      commit("setHistoryList", removeHistoryList(music))
    },
// 清空播放历史
    clearHistory({commit}) {
      commit("setHistoryList", clearHistoryList())
    },
// 设置播放模式
    setPlayMode({commit}, mode) {
      commit("setPlayMode", setMode(mode))
    },
// 设置网易云用户UID
    setUid({commit}, uid) {
      commit("setUid", setUserId(uid))
    }
  },
})
