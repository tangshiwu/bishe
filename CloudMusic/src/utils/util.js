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
// 歌词解析
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g
export function parseLyric(lrc) {
  const lines = lrc.split('\n')
  const lyric = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const result = timeExp.exec(line)
    if (!result) {
      continue
    }
    const text = line.replace(timeExp, '').trim()
    if (text) {
      lyric.push({
        time: (result[1] * 6e4 + result[2] * 1e3 + (result[3] || 0) * 1) / 1e3,
        text
      })
    }
  }
  return lyric
}
