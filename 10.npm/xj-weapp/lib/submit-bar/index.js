Component({

  options: {
    styleIsolation: 'isolated'
  },

  properties: {
    count: Number,
    sum: {
      type: Number,
      default: 0,
    }
  },

  methods: {
    onsubmit () {
      let count = this.data.count;
      let sum = this.data.sum;
      this.triggerEvent('submitOrder',{count, sum});
    }
  }
})
