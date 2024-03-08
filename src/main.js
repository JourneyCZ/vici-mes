import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/styles/reset.css'
import '@/styles/main.scss'
import store from '@/store/'
import router from '@/router'
import App from '@/App.vue'

// 创建 Vue 应用
const app = createApp(App)

// 应用 vuex
app.use(store)

// 应用路由
app.use(router)

// 应用 ElementPlus
app.use(ElementPlus)
// 注册 ElementPlus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 挂载根实例
app.mount('#app')
