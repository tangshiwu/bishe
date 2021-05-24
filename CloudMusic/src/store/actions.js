import {setUserId} from "../utils/storage";

export const setPlaylist = function (context, list) {
  context.commit('setPlayList', list)
}
export const setUid = function (context, uid) {
  context.commit('setUid', setUserId(uid))
}
