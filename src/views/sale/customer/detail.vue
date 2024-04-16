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
        label="客户编号"
        prop="customerCode"
      >
        <el-input
          v-model="formData.customerCode"
          placeholder="可填写，忽略将自动生成"
          :disabled="operate != 'add'"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="客户"
        prop="customerName"
      >
        <el-input
          v-model="formData.customerName"
          placeholder="请输入客户名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="客户类型"
        prop="orderType"
      >
        <el-select
          v-model="formData.orderType"
          placeholder="请选择客户类型"
          clearable
        >
          <el-option value="1">客户类型1</el-option>
          <el-option value="2">客户类型2</el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="客户职位"
        prop="customerPosition"
      >
        <el-input
          v-model="formData.customerPosition"
          placeholder="请输入客户职位"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="联系人"
        prop="contactName"
      >
        <el-input
          v-model="formData.contactName"
          placeholder="请输入联系人"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="联系方式"
        prop="contactWay"
      >
        <el-input
          v-model="formData.contactWay"
          placeholder="请输入联系方式"
          clearable
        />
      </el-form-item>
      <el-form-item
        class="full-item"
        label="对公账号"
        prop="publicAccount"
      >
        <el-input
          v-model="formData.publicAccount"
          placeholder="请输入对公账号"
          clearable
        />
      </el-form-item>
      <el-form-item
        class="full-item"
        label="地址"
        prop="address"
      >
        <el-input
          v-model="formData.address"
          placeholder="请输入地址"
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
import { cloneDeep } from 'lodash-es'
import { ref, computed, watchEffect, defineEmits } from 'vue'
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

// 弹窗事件
const emits = defineEmits(['update:visible', 'save'])

// 弹窗数据
const dialogTitle = ref('客户信息')
const DetailFormRef = ref()
const formData = ref({})
watchEffect(() => {
  formData.value = props.data ? cloneDeep(props.data) : {}
})
const operate = computed({
  get: () => props.operate
})
function detailSave () {
  const saveFunc = operate.value === 'add' ? addStorageItem : editStorageItem
  saveFunc('saleCustomer', formData.value, 'customerCode')
  console.log('saveSaleCustomer', formData.value)
  emits('save')
  dialogClose()
}

// 弹窗开关
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
