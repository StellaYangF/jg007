Component({

  options: {
    styleIsolation: 'isolated'
  },

  externalClasses: ['custom-class', 'custom-item-class', 'custom-price-class'],

  properties: {
    list: Array,
    hidden: {
      type: Boolean,
      defualt: false,
    }
  },

  methods: {
    jump({ currentTarget: { dataset: {index, state}}}) {
      this.triggerEvent('jump', {index,state});
    },
    cancel({ currentTarget: { dataset: { index, state } } }) {
      this.triggerEvent('cancel', { index, state });
    }
  }

})
