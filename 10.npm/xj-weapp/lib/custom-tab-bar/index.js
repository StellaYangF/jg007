Component({
	data: {
		active: 0,
		list: [
			{
				icon: 'wap-home',
				text: '首页',
				url: '/pages/index/index'
			},
			{
				icon: 'search',
				text: '发现',
        url: '/pages/discover/discover'
      },
      {
        icon: 'add',
        text: '发布',
        url: '/pages/more/more'
      },
      {
        icon: 'chat',
        text: '消息',
        url: '/pages/message/message'
      },
      {
        icon: 'manager',
        text: '我的',
        url: '/pages/admin/admin'
      }
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
