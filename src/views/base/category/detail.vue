<template>
  <el-dialog
    class="detail-dialog detail-dialog-small"
    v-model="dialogVisible"
    :title="dialogTitle"
    :before-close="dialogClose"
  >
    <el-form
      ref="DetailFormRef"
      class="detail-form"
      :model="formData"
      :inline="true"
      label-width="auto"
    >
      <el-form-item
        class="full-item"
        label="分类名称"
        prop="categoryName"
      >
        <el-input
          v-model="formData.categoryName"
          placeholder="请输入分类名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        class="full-item"
        label="存货计价方法"
        prop="valuationMethod"
      >
        <el-select
          v-model="formData.valuationMethod"
          placeholder="请选择存货计价方法"
          clearable
        >
          <el-option value="加权平均法" label="加权平均法"></el-option>
          <el-option value="个别计价法" label="个别计价法"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="full-item"
        label="库存周转期限"
        prop="turnaroundTime"
      >
        <el-input
          v-model="formData.turnaroundTime"
          placeholder="请输入库存周转期限"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          @click="detailSave"
        >
          保存
        </el-button>
        <el-button @click="dialogClose">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { addStorageItem, editStorageItem } from '@/utils/LocalStorageManage.js'

// 弹窗属性
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  operate: {
    type: String,
    default: 'add'
  },
  data: {
    type: Object,
    default () {
      return {}
    }
  }
})

// 弹窗数据
const dialogTitle = ref('产品分类')
const DetailFormRef = ref()
const formData = ref({})
watchEffect(() => {
  formData.value = props.data || {}
})
// 弹窗数据保存
const operate = computed({
  get: () => props.operate
})
function detailSave () {
  const saveFunc = operate.value === 'add' ? addStorageItem : editStorageItem
  formData.value.categoryId = formData.value.categoryId || `CATE${new Date().getTime()}`
  saveFunc('baseCategory', formData.value, 'categoryId')
  emits('save')
  dialogClose()
}

// 弹窗开关
const emits = defineEmits(['update:visible'])
const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => {
    emits('update:visible', val)
  }
})
function dialogClose () {
  dialogVisible.value = false
  DetailFormRef.value?.resetFields()
}

</script>

<style lang="scss">
@import '@/styles/common/DetailDialog.common.scss';
</style>
