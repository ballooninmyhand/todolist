// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    todo: {},
    todoList: [],
    showDatePicker: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.index ? options.index : 1
    var todoList = wx.getStorageSync('todoList')
    this.setData({
      index: index,
      todo: todoList[index],
      todoList: todoList
    })
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
   * 保存待办描述
   */
  saveTodoDesc: function (e) {
    var desc = e.detail.value
    var data = this.data
    data.todo.desc = desc
    data.todoList[data.index] = data.todo
    this.setData({
      todo: data.todo,
      todoList: data.todoList
    })
    this.save()
  },

  /**
   * 保存待办事项到本地存储中
   */
  save: function () {
    wx.setStorageSync('todoList', this.data.todoList)
  },

  /**
   * 删除待办事项
   */
  deleteTodoHandle: function () {
    var index = this.data.index
    var todoList = this.data.todoList
    todoList.splice(index, 1)
    this.setData({
      todoList: todoList
    })
    this.save()
    wx.navigateBack()
  },

  /**
   * 选择日期-确定
   */
  submitDatePicker: function(e) {
    var dateInfo = e.detail
    var data = this.data
    data.todo.dateDesc = dateInfo.dateDesc
    data.todo.dateFormat = dateInfo.date
    data.todoList[data.index] = data.todo
    this.setData({
      todo: data.todo,
      todoList: data.todoList
    })
    this.save()
  },

  /**
   * 展示选择日期组件
   */
  showDatePickerPlus: function() {
    this.setData({
      showDatePicker: true
    })
  },

  /**
   * 保存待办事项标题
   */
  inputChangeHandle: function (e) {
    var title = e.detail.value
    var data = this.data
    data.todo.title = title
    data.todoList[data.index] = data.todo
    this.setData({
      todo: data.todo,
      todoList: data.todoList
    })
    this.save()
  }
})