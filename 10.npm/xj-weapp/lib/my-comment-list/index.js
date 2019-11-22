Component({

  options: {
    styleIsolation: 'isolated'
  },

  properties: {
    list: Array,
    hidden: {
      type: Boolean,
      default: false,
    }
  },

  externalClasses: ['custom-class', 'header-class'],

  methods: {
    handlePreviewImg ({ currentTarget: { dataset: { imgindex, index } } }) {
      let imgList = this.data.list[index].imgList;
      imgList.length > 0 && wx.previewImage({
        current: imgList[imgindex],
        urls: imgList,
        success: function (res) {
          console.log('Preview img success: ', res);
        },
        fail: function (res) {
          console.log('Preview img fail: ', res);
        },
      });
    },
    jump({ currentTarget: { dataset: { index, state } } }) {
      this.triggerEvent('jump', { index, state });
    }

  }
})
