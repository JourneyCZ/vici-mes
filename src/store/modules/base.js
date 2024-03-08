const base = {
  state: () => ({
    theme: 'light',
    collapsed: false
  }),
  mutations: {
    setTheme (state, value) {
      state.theme = value
    },
    setCollapsed (state, value) {
      state.collapsed = value
    }
  }
}

export default base
