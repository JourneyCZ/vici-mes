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
        label="出库编号"
        prop="stockOutCode"
      >
        <el-input
          v-model="formData.stockOutCode"
          placeholder="可填写，忽略将自动生成"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="出库类型"
        prop="stockOutType"
      >
        <el-select
          v-model="formData.stockOutType"
          placeholder="请选择出库类型"
          clearable
        >
          <el-option value="普通出库" label="普通出库"></el-option>
          <el-option value="生产领料出库2" label="生产领料出库"></el-option>
          <el-option value="调拨出库" label="调拨出库"></el-option>
          <el-option value="采购退货出库" label="采购退货出库"></el-option>
          <el-option value="销售出库" label="销售出库"></el-option>
          <el-option value="其他出库" label="其他出库"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="出库时间"
        prop="stockOutTime"
      >
        <el-date-picker
          v-model="formData.stockOutTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择出库时间"
        />
      </el-form-item>
      <el-form-item
        class="full-item"
        label="备注"
        prop="remark"
      >
        <el-input
          v-model="formData.remark"
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
const dialogTitle = ref('出库单信息')
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
  formData.value.stockOutCode = formData.value.stockOutCode || `STOU${new Date().getTime()}`
  saveFunc('repertoryStockOut', formData.value, 'stockOutCode')
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
