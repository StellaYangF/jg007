
Component({

  options: {
    styleIsolation: 'isolated'
  },

  properties: {
    list: Array,
  },

  methods: {
    // 票种/入住选择
    onChange({detail: count, currentTarget: { dataset: { item, index }}}) {
      item.count = count;
      let list = this.data.list;
      list[index] = item;
      this.triggerEvent('change', list);
    }
  }
})
