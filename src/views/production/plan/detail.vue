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
        label="计划编号"
        prop="planCode"
      >
        <el-input
          v-model="formData.planCode"
          placeholder="可填写，忽略将自动生成"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="客户"
        prop="customerName"
      >
        <el-select
          v-model="formData.customerName"
          placeholder="请选择客户"
          clearable
        >
          <el-option value="李总" label="李总"></el-option>
          <el-option value="刘总" label="刘总"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="订单类型"
        prop="orderType"
      >
        <el-select
          v-model="formData.orderType"
          placeholder="请选择订单类型"
          clearable
        >
          <el-option value="订单类型1" label="订单类型1"></el-option>
          <el-option value="订单类型2" label="订单类型2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="订单金额"
        prop="orderAmount"
      >
        <el-input-number
          v-model="formData.orderAmount"
          :min="0"
          controls-position="right"
          placeholder="请输入订单金额"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="跟单员"
        prop="merchandiser"
      >
        <el-input
          v-model="formData.merchandiser"
          placeholder="请输入跟单员"
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
const dialogTitle = ref('生产计划信息')
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
  formData.value.planCode = formData.value.planCode || `PLAN${new Date().getTime()}`
  saveFunc('productionPlan', formData.value, 'planCode')
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
