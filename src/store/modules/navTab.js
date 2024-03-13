const navTab = {
  state: () => ({
    tabs: [
      {
        path: '/home',
        name: '首页',
      },
    ],
  }),
  mutations: {
    setTabs (state, tabs) {
      state.tabs = tabs
    },
    addTab (state, tab) {
      if (state.tabs.findIndex(item => item.path === tab.path) === -1) {
        state.tabs.push(tab)
      }
    },
  }
}

export default navTab
