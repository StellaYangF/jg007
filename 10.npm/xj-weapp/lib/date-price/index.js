
Component({
  
  options: {
    styleIsolation: 'isolated'
  },

  properties: {
    list: Array,
  },

  lifetimes: {

    ready () {
      let list = this.data.list;
      this.setData({
        filteredList: list.length < 6 ? list: list.filter((value, index) => index < 5),
      })
    }
  },

  observers: {
    "list": function (list) {
      this.setData({
        hideCheckMore: list.length < 6 ? true : false,
      })
    }
  },

  methods: {
    handleHideCheckMore () {
      this.setData({
        hideCheckMore: true,
      })
    },

    toggleItemOne ({currentTarget: {dataset: {id}}}) {
      this.handleToggleItem(id);
    },

    toggleItemTwo ({currentTarget: { dataset: {id}}}) {
      this.handleToggleItem(id);
    },

    handleToggleItem (id) {
      let list = this.data.list,
          filteredList = null,
          index = undefined;
      list.forEach((item, i )=> {
        if (item.id == id) {
          item.selected = true;
          index = i;
        } else {
          item.selected = false;
        }
      });
      filteredList =  index > 2 ? list.slice(index-2, index + 3) : list.slice(0, 5);
      this.setData({list, filteredList});
      this.triggerEvent('change', list[index]);
    },

    onClose () {
      this.setData({
        hideCheckMore: false,
      })
    },

  },

})
