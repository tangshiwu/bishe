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
// 创建toast弹窗
export function myToast(msg, duration) {
  duration = isNaN(duration) ? 3000 : duration;
  let myDiv = document.createElement('div');
  myDiv.innerHTML = msg;
  myDiv.style.cssText = " max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
  document.body.appendChild(myDiv);
  setTimeout(function () {
    let d = 0.5;
    myDiv.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    myDiv.style.opacity = '0';
    setTimeout(function () {
      document.body.removeChild(myDiv)
    }, d * 1000);
  }, duration);
}
