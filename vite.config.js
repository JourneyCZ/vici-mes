import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8888, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
  },
  plugins: [
    vue(),
    eslintPlugin({
      fix: true, // 修复错误
      include: [
        'src/**/*.vue',
        'src/**/*.ts',
        'src/**/*.js'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 路径别名
    },
    extensions: ['.js', '.json', '.vue'] // 使用路径别名时想要省略的后缀名
  },
  css: {
    /* CSS 预处理器 */
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/styles/theme/theme.scss";'
      }
    }
  }
})
