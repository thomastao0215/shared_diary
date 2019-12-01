import zx from 'weapp-zx'

Component({
  type: 'product-cell',

  properties: {
    productId: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    description: {
      type: String,
      value: ''
    },
    cover_image: {
      type: String,
      value: ''
    },
    status: {
      type: String,
      value: ''
    },
    priority: {
      type: String,
      value: ''
    },
    brand_id: {
      type: String,
      value: ''
    },
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
        url: '/packages/product/index?id=' + this.data.productId
      })
    },

  }
});