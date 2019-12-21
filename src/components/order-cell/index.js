
Component({
  type: 'order-cell',

  properties: {
    orderId: {
      type: String,
      value: ''
    },
    productList: {
      type: Array
    },
    status: {
      type: String
    },
    totalCost: {
      type: Number
    },
    time: {
      type: Date
    },
    species: {
      type: String
    },
    opertaion: {
      type: String
    }
  },

  attached() {
    // console.log(this.data.seekerStatus)
    // const { companyId } = this.data
    // if (companyId) {
    //   zx.get('companies', companyId)
    //     .then(res => {
    //       const { data } = res
    //       this.setData({
    //         company1: data.company_name,
    //         companyLogo1: data.logo
    //       })
    //     })
    // }
  },

  methods: {
    navToDetail() {
      wx.navigateTo({
        url: '/packages/product/index?productId=' + this.data.productId
      });
    },
    pay() {

    },
    confirm() {

    },
    comment() {
      console.log('ok');
    }

  }
});
