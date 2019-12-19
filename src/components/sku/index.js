
Component({
  type: 'sku',

  properties: {
    show: {
      type: Boolean,
      value: true
    },
    selected: {
      type: Boolean,
      value: false
    },
    noneSku: {
      type: Boolean,
      value: false
    },
    defaultImage: {
      type: String
    },
    productId: {
      type: String,
      value: ''
    },
    quota: {
      type: Number,
      value: 100
    },
    propKeys: {
      type: Array
    },
    skuGroup: {
      type: Array,
    },
    skuList: {
      type: Array
    },
    selectedSku: {
      type: Object,
    },
    count: {
      type: Number,
      value: 10
    },
    selectedKeys: {
      type: Array,
      value: [
        0,
        0
      ]
    },
    operation: {
      type: String,
      value: '加入购物车'
    },
    credit: {
      type: Number,
      value: 100
    }

  },
  lifetimes: {

  },

  methods: {
    navToDetail() {
    },
    showPopup() {
      this.setData({ show: true });
    },
    onClose() {
      this.setData({
        show: false
      });
    },
    shopNow() {

    },
    onClickAddCart() {
      var waitList = this.data.skuList;
      for (var i = 0; i < waitList.length; i++) {
        for (var j = 0; j < this.data.skuGroup.length; j++) {
          if (waitList[i].species[j] !== this.data.skuGroup.value[this.data.selectedSku[j]]) {
            console.log(waitList[i]);
          }
        }
      }
    },
    select(e) {
      var groupIndex = e.currentTarget.dataset.group;
      var selectId = e.currentTarget.id;
      var selectedKey = 'selectedKeys[' + groupIndex + ']';
      this.setData({
        [selectedKey]: Number(selectId)
      });
    },
    onCountChange(e) {
      this.setData({
        count: e.detail
      });
    }

  }
});
