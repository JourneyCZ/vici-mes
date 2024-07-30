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
        label="任务编号"
        prop="taskCode"
      >
        <el-input
          v-model="formData.taskCode"
          placeholder="可填写，忽略将自动生成"
          clearable
          disabled
        />
      </el-form-item>
      <el-form-item
        label="产品"
        prop="productName"
      >
        <el-select
          v-model="formData.productName"
          placeholder="请选择产品"
          clearable
          disabled
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
          disabled
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
          disabled
        />
      </el-form-item>
      <el-form-item
        label="计划开始时间"
        prop="planStartTime"
      >
        <el-date-picker
          v-model="formData.planStartTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="请选择计划开始时间"
          disabled
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
          disabled
        />
      </el-form-item>
      <el-form-item
        label="生产开始时间"
        prop="productionStartTime"
      >
        <el-date-picker
          v-model="formData.productionStartTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="请选择生产开始时间"
          :disabled="operate !== 'start'"
        />
      </el-form-item>
      <el-form-item
        v-if="operate === 'finish' || operate === 'check'"
        label="生产结束时间"
        prop="productionEndTime"
      >
        <el-date-picker
          v-model="formData.productionEndTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="请选择生产开始时间"
          :disabled="operate !== 'finish'"
        />
      </el-form-item>
      <el-form-item v-else />
      <template v-if="operate === 'report' || operate === 'check'">
        <el-form-item
          label="工序名称"
          prop="processName"
        >
          <el-input
            v-model="formData.processName"
            placeholder="请输入工序名称"
            clearable
            :disabled="operate !== 'report'"
          />
        </el-form-item>
        <el-form-item
          label="工序状态"
          prop="processStatus"
        >
          <el-input
            v-model="formData.processStatus"
            placeholder="请输入工序状态"
            clearable
            :disabled="operate !== 'report'"
          />
        </el-form-item>
        <el-form-item
          label="生产数量"
          prop="productionQuantity"
        >
          <el-input-number
            v-model="formData.productionQuantity"
            :min="0"
            controls-position="right"
            placeholder="请输入生产数量"
            clearable
            :disabled="operate !== 'report'"
          />
        </el-form-item>
      <el-form-item />
        <el-form-item
          label="良品数量"
          prop="goodProductQuantity"
        >
          <el-input-number
            v-model="formData.goodProductQuantity"
            :min="0"
            controls-position="right"
            placeholder="请输入良品数量"
            clearable
            :disabled="operate !== 'report'"
          />
        </el-form-item>
        <el-form-item
          label="不良品数量"
          prop="defectiveProductQuantity"
        >
          <el-input-number
            v-model="formData.defectiveProductQuantity"
            :min="0"
            controls-position="right"
            placeholder="请输入不良品数量"
            clearable
            :disabled="operate !== 'report'"
          />
        </el-form-item>
      </template>
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
          :disabled="operate === 'check'"
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
const dialogTitle = ref('生产任务信息')
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
  formData.value.taskCode = formData.value.taskCode || `TASK${new Date().getTime()}`
  if (operate.value === 'start') {
    formData.value.productionStatus = '进行中'
  } else if (operate.value === 'pause') {
    formData.value.productionStatus = '已暂停'
  } else if (operate.value === 'recove') {
    formData.value.productionStatus = '进行中'
  } else if (operate.value === 'report') {
    addStorageItem('productionReport', formData.value, 'reportCode')
  } else if (operate.value === 'finish') {
    formData.value.productionStatus = '已完成'
  }
  saveFunc('productionTask', formData.value, 'taskCode')
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
