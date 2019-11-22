
Component({

  properties: {
    list: Array,
  },

  data: {

  },

  methods: {
    handleConfirmDelivery ({currentTarget: {dataset: {item}}}) {
      this.triggerEvent('handleConfirmDelivery',item);
    },

    handleUseQR({ currentTarget: { dataset: { item } } }) {
      this.triggerEvent('handleUseQR', item);
    },

    handleCancelOrder({ currentTarget: { dataset: { item } } }) {
      this.triggerEvent('handleCancelOrder', item);
    },

    handlePayImmediately({ currentTarget: { dataset: { item } } }) {
      this.triggerEvent('handlePayImmediately', item);
    },

    handleComment({ currentTarget: { dataset: { item } } }) {
      this.triggerEvent('handleComment', item);
    },

    handleRefund({ currentTarget: { dataset: { item } } }) {
      this.triggerEvent('handleRefund', item);
    },

    handleService({ currentTarget: { dataset: { item } } }) {
      this.triggerEvent('handleService', item);
    }
  }
})
