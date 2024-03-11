import { createStore } from 'vuex'
import base from './modules/base.js'
import navTab from './modules/navTab.js'

const store = createStore({
  modules: {
    base,
    navTab
  }
})

export default store
