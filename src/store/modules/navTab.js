const navTab = {
  state: () => ({
    tabs: [
      {
        value: '/home',
        label: '首页',
      },
      {
        value: '/dashboard',
        label: '智能驾驶舱',
      },
    ],
  }),
  mutations: {
    setTabs (state, value) {
      state.tabs = value
    },
  }
}

export default navTab
