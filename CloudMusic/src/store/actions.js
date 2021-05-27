import {setUserId,setHistoryList} from "../utils/storage";

export const setPlaylist = function (context, list) {
  context.commit('setPlayList', list)
}
export const setUid = function (context, uid) {
  context.commit('setUid', setUserId(uid))
}
export const setHistory = function (context,music) {
  context.commit('setHistoryList',setHistoryList(music))
}
