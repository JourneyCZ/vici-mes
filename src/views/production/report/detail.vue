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
        label="工单编号"
        prop="reportCode"
      >
        <el-input
          v-model="formData.reportCode"
          placeholder="可填写，忽略将自动生成"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="产品"
        prop="productCode"
      >
        <el-select
          v-model="formData.productCode"
          placeholder="请选择产品"
          clearable
        >
          <el-option value="水管1" label="水管1"></el-option>
          <el-option value="水管2" label="水管2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="计划数量"
        prop="planQuantity"
      >
        <el-input-number
          v-model="formData.planQuantity"
          :min="0"
          controls-position="right"
          placeholder="请输入计划数量"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="生产数量"
        prop="planQuantity"
      >
        <el-input-number
          v-model="formData.planQuantity"
          :min="0"
          controls-position="right"
          placeholder="请输入生产数量"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="交货时间"
        prop="deliveryTime"
      >
        <el-date-picker
          v-model="formData.deliveryTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="请选择交货时间"
        />
      </el-form-item>
      <el-form-item />
      <el-form-item
        label="计划开始时间"
        prop="planStartTime"
      >
        <el-date-picker
          v-model="formData.planStartTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="请选择计划开始时间"
        />
      </el-form-item>
      <el-form-item
        label="计划结束时间"
        prop="planEndTime"
      >
        <el-date-picker
          v-model="formData.planEndTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="请选择计划结束时间"
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
const dialogTitle = ref('生产报工信息')
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
  formData.value.reportCode = formData.value.reportCode || `REPO${new Date().getTime()}`
  saveFunc('productionReport', formData.value, 'reportCode')
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
