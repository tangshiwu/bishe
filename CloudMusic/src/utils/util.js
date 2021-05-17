//歌曲时长转换
export function format(time) {
  let duration = time/1000
  let minute = Math.floor(duration / 60)
  let second = Math.floor(duration % 60)
  return `${zero(minute)}:${zero(second)}`
}
//小于10则补0
export function zero(digit) {
  return digit < 10 ? '0' + digit : digit
}
