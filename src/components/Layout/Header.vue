<template>
  <div class="header-container">
    <el-switch
      class="header-theme-check"
      v-model="themeChecked"
      inline-prompt
      :active-icon="MoonNight"
      :inactive-icon="Sunny"
      @change="themeChange"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Sunny, MoonNight } from '@element-plus/icons-vue'

const emit = defineEmits(['themeChange'])

// 获取状态管理仓库
const store = useStore()

// 主题
const Theme = computed(() => store.state.base.theme)
const themeChecked = ref(Theme.value === 'dark')
function themeChange (checked) {
  emit('themeChange', checked ? 'dark' : 'light')
}
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba($color: #000000, $alpha: 0);

  .header-theme-check {
    display: none;
  }
}
</style>
