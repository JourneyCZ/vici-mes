const navTab = {
  state: () => ({
    tabKey: '/home',
    activeTabs: [
      {
        path: '/home',
        name: '首页',
      },
    ],
    allTabs: {
      '/home': [
        {
          path: '/home',
          name: '首页',
        },
      ]
    }
  }),
  mutations: {
    setTabKey (state, key) {
      state.tabKey = key
      if (!state.allTabs[key]) {
        state.allTabs[key] = []
      }
      state.activeTabs = state.allTabs[key]
    },
    setTabs (state, tabs) {
      const key = state.tabKey
      state.allTabs[key] = tabs
      state.activeTabs = state.allTabs[key]
    },
    addTab (state, tab) {
      const activeTabs = state.activeTabs
      if (activeTabs.findIndex(item => item.path === tab.path) === -1) {
        activeTabs.push(tab)
      }
    },
  }
}

export default navTab
