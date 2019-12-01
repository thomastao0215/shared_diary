Component({
  properties: {
    pid: {
      type: String,
      value: ''
    }
  },

  data: {
    translateX: 0,
    animate: false,
    startX: 0,
    startY: 0,
  },

  methods: {
    handleTouchStart(e) {
      this.setData({
        animate: false,
        startX: e.changedTouches[0].clientX,
        startY: e.changedTouches[0].clientY,
      })
    },

    handleTouchMove(e) {
      let startX = this.data.startX // 开始X坐标
      let startY = this.data.startY // 开始Y坐标
      let touchMoveX = e.changedTouches[0].clientX // 滑动变化坐标
      let touchMoveY = e.changedTouches[0].clientY // 滑动变化坐标
      let angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
      if (Math.abs(angle) > 30) return
      if (touchMoveX > startX) this.setData({ animate: false }) // 右滑
      else this.setData({ animate: true })
    },

    angle(start, end) {
      const X = end.X - start.X
      const Y = end.Y - start.Y
      return 360 * Math.atan(Y / X) / (2 * Math.PI);
    },

    handleAction({ currentTarget: { dataset: data } }) {
      this.setData({ animate: false })
      this.triggerEvent('click', {
        type: data.type,
        id: this.data.pid
      })
    }
  }
})
