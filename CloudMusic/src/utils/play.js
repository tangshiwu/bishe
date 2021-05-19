const playMode = {
  listLoop: 0,  //列表循环
  order: 1,     //顺序
  loop: 3,      //单曲循环
  random: 2    //随机
}
const playMusic = {

}
// 获取歌词
export function getLyric(id) {
  const url = '/lyric'
  return this.$http(url, {
    params: {
      id
    }
  })
}
