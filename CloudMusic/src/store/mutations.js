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
  }
}
export default  mutations
