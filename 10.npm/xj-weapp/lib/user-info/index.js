Component({

  properties: {

  },

  data: {
    username: undefined,
    phone: undefined,
    message: undefined,
  },

  methods: {
    handleUsername ({detail}) {
      this.triggerEvent('nameChange', detail);
    },

    handlerPhone ({detail}) {
      this.triggerEvent('phoneChange', detail);
    },

    handlerMessage ({detail}) {
      this.triggerEvent('messageChange', detail);
    }
  }
})
