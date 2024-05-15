<template>
  <el-dialog
    class="detail-dialog"
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
        label="计价方式"
        prop="pricingManner"
      >
        <el-select
          v-model="formData.pricingManner"
          placeholder="请选择计价方式"
          clearable
        >
          <el-option value="计件" label="计件"></el-option>
          <el-option value="计时" label="计时"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="产品名称"
        prop="productName"
      >
        <el-input
          v-model="formData.productName"
          placeholder="请输入产品名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="工序名称"
        prop="processName"
      >
        <el-input
          v-model="formData.processName"
          placeholder="请输入工序名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="工资单价"
        prop="wageUnitPrice"
      >
        <el-input-number
          v-model="formData.wageUnitPrice"
          :min="0"
          controls-position="right"
          placeholder="请输入工资单价"
          clearable
        />
      </el-form-item>
      <el-form-item
        class="full-item"
        label="标准效率"
      >
        <el-input-number
          class="quarter-input"
          v-model="formData.standardOutput"
          :min="0"
          controls-position="right"
          clearable
        />
        <span class="form-separator">/</span>
        <el-input-number
          class="quarter-input"
          v-model="formData.standardHours"
          :min="0"
          controls-position="right"
          clearable
        />
        <span class="form-separator">时</span>
        <el-input-number
          class="quarter-input"
          v-model="formData.standardMinutes"
          :min="0"
          controls-position="right"
          clearable
        />
        <span class="form-separator">分</span>
        <el-input-number
          class="quarter-input"
          v-model="formData.standardSeconds"
          :min="0"
          controls-position="right"
          clearable
        />
        <span class="form-separator">秒</span>
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
const dialogTitle = ref('物料信息')
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
  formData.value.performanceCode = formData.value.performanceCode || `PERF${new Date().getTime()}`
  saveFunc('basePerformance', formData.value, 'performanceCode')
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
