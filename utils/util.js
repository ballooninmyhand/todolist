const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = function (year, month, day, connect = '-') {
  let date = '';
  switch (connect) {
    case 'CN':
      date = year + '年' + month + '月' + day + '日'
      break
    default:
      date = [year, month, day].join('-')
      break
  }

  return date
}

const getDate = date => {
  const year = formatNumber(date.getFullYear())
  const month = formatNumber(date.getMonth() + 1)
  const day = formatNumber(date.getDate())

  return [year, month, day].map(formatNumber)
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  getDate: getDate
}
