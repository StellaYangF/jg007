Component({

  options: {
    styleIsolation: 'isolated'
  },

  properties: {
    list: Array,
    hidden: {
      default: false,
      type: Boolean,
    }
  },

  methods : {
    jump({ currentTarget: { dataset: { index, state } } }) {
      this.triggerEvent('jump', { index, state });
    },
    cancel({ currentTarget: { dataset: { index, state } } }) {
        this.triggerEvent('cancel', { index, state });
    }
  }

})
