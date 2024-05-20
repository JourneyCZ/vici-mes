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
      state.activeTabs = state.allTabs[key] || []
    },
    setTabs (state, tabs) {
      const tabKey = state.tabKey
      state.activeTabs = tabs
      state.allTabs[tabKey] = tabs
    },
    addTab (state, tab) {
      const tabKey = state.tabKey
      const activeTabs = state.activeTabs
      const allTabs = state.allTabs[tabKey]
      if (activeTabs.findIndex(item => item.path === tab.path) === -1) {
        activeTabs.push(tab)
        allTabs.push(tab)
      }
    },
  }
}

export default navTab
