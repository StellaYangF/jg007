Component({

  options: {
    styleIsolation: 'isolated'
  },

  externalClasses: ['custom-class'],

  properties: {
    list: Array,
    activated: {
      type: Number,
      default: 0,
    }
  },

  methods: {
    toggleTab ({currentTarget: {dataset: {index}}}) {
      this.triggerEvent('toggleTab', index)
    }
  }
})
