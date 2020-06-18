// pages/index/index.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: '',
    todoList: [],
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.load()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 新增待办事项
   */
  addTodoHandle: function () {
    if (!this.data.input || !this.data.input.trim()) return
    var todoList = this.data.todoList ? this.data.todoList : []
    var date = util.getDate(new Date())
    // 将待办事项 push 到列表中
    todoList.push({
      title: this.data.input,
      dateDesc: util.formatDate(date[0], date[1], date[2], 'CN'),
      dateFormat: util.formatDate(date[0], date[1], date[2]),
      completed: false,
      desc: ''
    })
    this.setData({
      todoList: todoList
    })
    setTimeout(() => {
      this.setData({
        input: ''
      })
    }, 100)
    this.save()
    this.load()
  },

  /**
   * 保存待办事项到本地存储中
   */
  save: function () {
    wx.setStorageSync('todoList', this.data.todoList)
  },

  /**
   * 待办事项输入框 value 值变化
   */
  inputChangeHandle: function (e) {
    this.setData({
      input: e.detail.value
    })
  },

  /**
   * 获取本地存储中的待办事项
   */
  load: function () {
    var todoList = wx.getStorageSync('todoList')
    var count = 0
    for (var i = 0; i < todoList.length; i++) {
      if (!todoList[i].completed) {
        count++
      }
      var dateArr = this.getDateStr(todoList[i].dateFormat)
      todoList[i].dateStr = dateArr[0]
      todoList[i].timestamp = dateArr[1]
    }
    todoList.sort(this.sortFun(`timestamp`))
    this.setData({
      input: '',
      todoList: todoList,
      count: count
    })
    this.save()
  },

  /**
   * 完成待办事项
   */
  checkboxChangeHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var todoList = this.data.todoList
    todoList[index].completed = true
    this.setData({
      todoList: todoList
    })
    this.save()
    this.load()
  },

  /**
   * 跳转到详情页
   */
  gotoDetailPage: function (e) {
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/detail/index?index=' + index,
    })
  },

  /**
   * 获取日期格式
   */
  getDateStr: function (n) {
    var dateStr = ''
    var repTime = n.replace(/-/g, '/')
    var timestamp = Date.parse(repTime) / 1000
    var date = util.getDate(new Date(timestamp * 1000))
    var currentDate = util.getDate(new Date())
    var currentTimestamp = Date.parse(currentDate[0] + '/' + currentDate[1] + '/' + currentDate[2]) / 1000
    if (timestamp == currentTimestamp) {
      dateStr = '今天'
    } else if (timestamp == currentTimestamp - 86400) {
      dateStr = '昨天'
    } else if (timestamp == currentTimestamp + 86400) {
      dateStr = '明天'
    } else if (currentDate[0] == date[0]) {
      dateStr = date[1] + '月' + date[2] + '日'
    } else {
      dateStr = date[0] + '年' + date[1] + '月' + date[2] + '日'
    }

    return [dateStr, timestamp]
  },

  /**
   * 排序
   */
  sortFun: function (attr, rev) {
    if (rev == undefined) {
      rev = 1
    } else {
      rev = rev ? 1 : -1
    }

    return function (a, b) {
      a = a[attr]
      b = b[attr]
      if (a < b) {
        return rev * -1
      }
      if (a > b) {
        return rev * 1
      }
      return 0
    }
  }
})