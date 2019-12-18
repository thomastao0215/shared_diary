
Component({
  type: 'sku',

  properties: {
    show: {
      type: Boolean,
      value: false
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
    specText: '',
    specTextNoCount: '',
    tree: [
      {
        k: '规格',
        v: [
          {
            id: 1,
            name: '3ml',
            picUrl: '',
            selected: false,
            disabled: false
          },
          {
            id: 1,
            name: '5ml',
            picUrl: '',
            selected: false,
            disabled: false
          },
          {
            id: 1,
            name: '10ml',
            picUrl: '',
            selected: false,
            disabled: false
          },
          {
            id: 1,
            name: '15ml',
            picUrl: '',
            selected: false,
            disabled: false
          },
          {
            id: 1,
            name: '30ml',
            picUrl: '',
            selected: false,
            disabled: false
          }
        ]
      }
    ],
    list: [
      {
        id: 1,
        price: 1.00,
        s1: 1,
        s2: 3,
        stockNum: 50
      }
    ],
    selectedSku: {

    },
    count: 1
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
