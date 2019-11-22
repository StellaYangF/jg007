Component({

  options: {
    styleIsolation: 'isolated'
  },

  externalClasses: ['xj-cover-class'],

  properties: {
    comfirmMoney: Number,
    showConfirm: Boolean,
  },

  methods: {
    handleCloseButton() {
      this.triggerEvent('closeModal');
    }
  }
})
