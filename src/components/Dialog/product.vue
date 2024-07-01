<template>
  <el-dialog
    class="product-dialog"
    v-model="dialogVisible"
    :title="dialogTitle || '产品'"
    :before-close="dialogClose"
  >
    <el-transfer
      v-model="selectedList"
      :data="productData"
      :titles="['待选产品', '已选产品']"
      :button-texts="['取消', '选中']"
      :props="{
        key: 'productCode',
        label: 'productName',
      }"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      filterable
      style="text-align: left; display: inline-block"
    >
      <template #default="{ option }">
        <span>{{ option.productName }}({{ option.productCode }})</span>
      </template>
    </el-transfer>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          @click="confirmSelect"
        >
          确认选择
        </el-button>
        <el-button @click="dialogClose">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { getStorageItem } from '@/utils/LocalStorageManage.js'

const emits = defineEmits(['save'])

// 弹窗数据
const dialogVisible = ref(false)
const dialogTitle = ref('')
// 弹窗初始化
function dialogInit (title, data) {
  dialogVisible.value = true
  dialogTitle.value = title || ''
  selectedList.value = data
}
// 弹窗关闭
function dialogClose () {
  dialogVisible.value = false
  selectedList.value = []
}
// 确认选择
function confirmSelect () {
  const productList = []
  productData.forEach(item => {
    if (selectedList.value.includes(item.productCode)) {
      productList.push(item)
    }
  })
  emits('save', productList)
  dialogClose()
}

// 产品数据
let productData = []
loadProductData()
function loadProductData () {
  const DATA = getStorageItem('baseProduct')
  productData = DATA
}
// 已选产品列表
const selectedList = ref([])

// 向父组件导出属性、方法
defineExpose({
  dialogInit
})
</script>

<style lang="scss">
.product-dialog {
  width: fit-content;
  padding: 0;
}
</style>
