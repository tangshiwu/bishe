const mutations = {
  // 修改播放列表
  setPlayList(state, playlist) {
    state.playlist = playlist
  },
  setPlaying(state,playing){
    state.playing = playing
  },
  setCurrentIndex(state,currentIndex){
    state.currentIndex = currentIndex
  },
  setUid(state,uid) {
    state.uid = uid
  },
  setHistoryList(state, historyList){
    state.historyList = historyList
  }
}
export default  mutations
