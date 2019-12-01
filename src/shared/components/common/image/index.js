import {
  SHOW_TYPES
} from './constants';

Component({
  type: 'image',

  properties: {
    autoPlay: {
      type: Boolean,
      value: true
    },
    hasDots: {
      type: Boolean,
      value: false
    },
    showType: {
      type: String,
      value: SHOW_TYPES.SWIPE
    },
    imageList: {
      type: Array,
      value: []
    },
    pageMargin: {
      type: [String, Number],
      value: 10
    },
    imageHeight: {
      type: Number,
      value: 140
    },
    needDesc: {
      type: Boolean,
      value: false
    }
  },

  data: {
    swiperCurrent: 0,
  },

  methods: {
    handleImageClick(e) {
      const { imgIndex } = e.currentTarget.dataset;
      const { imageList: images } = this.data;
      const image = images[imgIndex];
      image.index = imgIndex;
      this.triggerEvent('item-click', image);
    },

    handleImageChange(e) {
      const { listData } = this.data;
      const { current } = e.detail;
      this.setData({
        current,
        currentItemHasTitle: this.computeCurrentHasTitle(listData, current)
      });

      this.triggerEvent('itemChange', { value: current });
    },

    swiperChange(e) {
      this.setData({
        swiperCurrent: e.detail.current
      });
    }
  }
});
