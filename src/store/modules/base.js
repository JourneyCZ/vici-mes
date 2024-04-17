const base = {
  state: () => ({
    theme: 'light',
    collapsed: false,
    submenu: []
  }),
  mutations: {
    setTheme (state, value) {
      state.theme = value
    },
    setCollapsed (state, value) {
      state.collapsed = value
    },
    setSubmenu (state, value) {
      state.submenu = value
    }
  }
}

export default base
