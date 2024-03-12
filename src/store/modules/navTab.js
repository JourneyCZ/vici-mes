const navTab = {
  state: () => ({
    tabs: [
      {
        value: '/home',
        label: '首页',
      },
    ],
  }),
  mutations: {
    setTabs (state, tabs) {
      state.tabs = tabs
    },
    addTab (state, tab) {
      if (state.tabs.findIndex(item => item.value === tab.value) === -1) {
        state.tabs.push(tab)
      }
    },
  }
}

export default navTab
