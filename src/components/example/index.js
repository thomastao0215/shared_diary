// components/component-tag-name.js
Component({
  // externalClasses: ['my-class'], ///组件希望接受外部传入的样式类
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持(一般只支持一个)多个slot，以不同的 name 来区分。
  },
  /**
   * 组件的属性列表
   */
  properties: {
    propName: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    text: 'Hello Mini App'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    sayHello(e) {
      console.log(e, 'hello');
    },
    onClose() {
      this.setData({ show: false });
    },
    showPopup() {
      this.setData({ show: true });
    }
  }
});
