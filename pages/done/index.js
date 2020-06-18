// pages/done/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
   * 获取本地存储中的待办事项
   */
  load: function () {
    var todoList = wx.getStorageSync('todoList')
    var count = 0
    for (var i = 0; i < todoList.length; i++) {
      if (todoList[i].completed) {
        count++
      }
    }
    todoList.sort(this.sortFun(`timestamp`, false))
    this.setData({
      todoList: todoList,
      count: count
    })
    this.save()
  },

  /**
   * 取消完成待办事项
   */
  checkboxChangeHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var todoList = this.data.todoList
    todoList[index].completed = false
    this.setData({
      todoList: todoList
    })
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
   * 跳转到详情页
   */
  gotoDetailPage: function (e) {
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/detail/index?index=' + index,
    })
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