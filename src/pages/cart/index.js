import { getImageUrl } from 'utils/image'
import { api, request } from 'utils/api'
import Toast from 'vant-weapp/dist/toast/toast'
import Dialog from 'vant-weapp/dist/dialog/dialog'
import Config from 'utils/config'

const app = getApp()

Component({
  properties: {
    productList: {
      type: Array,
      value: [
        {
          isSelected: false,
          front_image_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
          name: 'test',
          brandname: '祖马龙',
          qiaqia_price: 10,
          retail_price: 20
        },
        {
          isSelected: false,
          front_image_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iaDglTRObbzqnXL.jpg',
          name: 'test',
          brandname: '祖马龙',
          qiaqia_price: 10,
          retail_price: 20
        },
        {
          isSelected: false,
          front_image_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iaDglTRObbzqnXL.jpg',
          name: 'test',
          brandname: '祖马龙',
          qiaqia_price: 10,
          retail_price: 20
        },
        {
          isSelected: false,
          front_image_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iaDglTRObbzqnXL.jpg',
          name: 'test',
          brandname: '祖马龙',
          qiaqia_price: 10,
          retail_price: 20
        },
      ],
      observer(value) {
        let selectAll = true
        value.forEach(item => {
          if (!item.isSelected) {
            selectAll = false
          }
        })
        this.setData({ selectAll })
      }
    },
    orderProductList: {
      type: Array,
      value: []
    },
    totalPrice: {
      type: Number,
      value: 0
    },
    totalOriginPrice: {
      type: Number,
      value: 0
    },
    orderId: {
      type: String,
      value: ''
    }
  },

  data: {
    selected: '/slice/Productlist/list_selected.png',
    unselected: '/slice/Productlist/list_unselected.png',
    vip: '/slice/membership/membership.png',
    icon1: getImageUrl('slice/Productlist/list_all.png'),
    icon2: getImageUrl('slice/Productlist/list_all_unselected.png'),
    show: false,
    selectAll: true,
    assetsUrl: Config.assetsUrl
  },

  methods: {
    selectOne(e) {
      const index = e.currentTarget.dataset.index
      this.index = index // 记录当前点击的商品
      if (this.data.productList[index].isSelected) {
        this.setData({ show: true })
        this.remark = ''
        this.setData({ selectedReasons: [false, false, false, false] })
      } else {
        this.triggerEvent('select-one', { index })
      }
    },

    toggleActionSheet() {
      this.setData({ show: false })
    },

    onSelectAll() {
      if (!this.data.selectAll) {
        this.triggerEvent('select-all')
      }
      this.setData({ selectAll: !this.data.selectAll })
    },

    reasonInput(e) {
      this.remark = e.detail.value
    },

    toggleReason(e) {
      const { index } = e.currentTarget.dataset
      const { selectedReasons } = this.data
      selectedReasons[index] = !selectedReasons[index]
      this.setData({ selectedReasons })
    },

    confirmBack() {
      const { selectedReasons, reasons } = this.data
      let reason = ''
      selectedReasons.forEach((i, index) => {
        if (i) {
          reason = !reason ? reasons[index] : `${reason};${reasons[index]}`
        }
      })
      this.setData({ show: false, selectAll: false })
      this.triggerEvent('confirm-back', { index: this.index, reason, remark: this.remark })
    },

    onClickBuy() {
      const {
        productList, orderProductList, totalPrice, totalOriginPrice, orderId
      } = this.data
      const orderInfo = {
        productList, orderProductList, totalPrice, totalOriginPrice, orderId
      }
      app.globalData.orderInfo = orderInfo
      wx.navigateTo({ url: '/packages/order/index' })
    },

    onClickAllBack() {
      Dialog.confirm({
        message: '确定全部寄回吗？'
      })
        .then(() => {
          request({
            ...api.pay_nothing,
            id: this.data.orderId
          })
            .then(() => {
              if (getCurrentPages().length != 0) {
                getCurrentPages()[getCurrentPages().length - 1].onShow()
              }
            })
            .catch(() => {
              Toast('请求失败')
            })
        })
        .catch(() => {})
    }
  },
})
