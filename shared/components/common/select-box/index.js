// Componet/Componet.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      value: '',
      observer(newValue) {
        if (newValue) {
          this.setData({
            nowText: newValue,
            hasSelected: true
          })
        }
      }
    },
    propArray: {
      type: Array,
    },
    initText: {
      type: String,
      value: '请选择'
    },
    boxWidth: {
      type: String,
      value: '200px'
    },
    boxHeight: {
      type: String,
      value: '35px'
    },
    boxLineHeight: {
      type: String,
      value: '35px'
    },
    borderRadius: {
      type: String,
      value: '2px'
    },
    mode: {
      type: Number,
      value: 2
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false, // 初始option不显示
    nowText: '请选择', // 初始内容
    animationData: {}, // 右边箭头的动画
    hasSelected: false,
  },

  attached() {
    const { initText, value } = this.data
    if (!value) {
      this.setData({ nowText: initText })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // option的显示与否
    selectToggle() {
      var nowShow = this.data.selectShow; // 获取当前option显示的状态
      // 创建动画
      var animation = wx.createAnimation({
        timingFunction: 'ease',
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
      this.triggerEvent('show')
    },
    // 设置内容
    setText(e) {
      var nowData = this.properties.propArray; // 当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var nowIdx = e.target.dataset.index; // 当前点击的索引
      var nowText = nowData[nowIdx]; // 当前点击的内容
      this.animation.rotate(0).step();
      this.setData({
        hasSelected: true,
        selectShow: false,
        nowText,
        animationData: this.animation.export()
      })
      this.triggerEvent('click', nowText)
    },
    onConfirm({ detail }) {
      const { value } = detail
      this.animation.rotate(0).step();
      this.setData({
        hasSelected: true,
        selectShow: false,
        nowText: value,
        animationData: this.animation.export()
      })
      this.triggerEvent('click', value)
    },
    onCancel() {
      this.setData({
        selectShow: false
      })
      this.triggerEvent('cancel')
    }
  }
})
