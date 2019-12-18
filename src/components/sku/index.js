
Component({
  type: 'sku',

  properties: {
    show: {
      type: Boolean,
      value: true
    },
    noneSku: {
      type: Boolean,
      value: false
    },
    productId: {
      type: String,
      value: ''
    },
    quota: {
      type: Number,
      value: 100
    },
    picUrl: {
      type: String,
      value: ''
    },
    specText: {
      type: String,
      value: ''
    },
    specTextNoCount: {
      type: String,
      value: ''
    },
    tree: {
      type: Array,
      value: []
    },
    list: {
      type: Array,
      value: []
    },
    selectedSku: {
      type: Object,
    },
    count: {
      type: Number,
      value: 10
    }

  },

  attached() {

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
    addToCart() {

    },
    shopNow() {

    }

  }
});
