<template>
  <Layout />
</template>

<script setup>
import Layout from '@/components/Layout/index.vue'
import jsonData from '@/data/data.json'
import { getStorageItem, setStorageItem } from '@/utils/LocalStorageManage.js'

// 遍历 jsonData 对象，写入 localStorage
for (const key in jsonData) {
  if (Object.hasOwnProperty.call(jsonData, key)) {
    const value = jsonData[key]
    if (!getStorageItem(key)) {
      setStorageItem(key, value)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
