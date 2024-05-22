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
        label="供应商名称"
        prop="supplierName"
      >
        <el-input
          v-model="formData.supplierName"
          placeholder="请输入供应商名称"
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
        label="地址"
        prop="address"
      >
        <el-input
          v-model="formData.address"
          placeholder="请输入地址"
          clearable
        />
      </el-form-item>
      <el-form-item
        class="full-item"
        label="备注"
        prop="remark"
      >
        <el-input
          v-model="formData.remark"
          type="textarea"
          :rows="2"
          placeholder="请输入备注"
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
const dialogTitle = ref('供应商信息')
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
  formData.value.supplierId = formData.value.supplierId || `SUPP${new Date().getTime()}`
  saveFunc('baseSupplier', formData.value, 'supplierId')
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
