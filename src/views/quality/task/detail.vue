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
        />
      </el-form-item>
      <el-form-item
        label="产品名称"
        prop="productCode"
      >
        <el-select
          v-model="formData.productCode"
          placeholder="请选择产品"
          clearable
        >
          <el-option value="产品1" label="产品1"></el-option>
          <el-option value="产品2" label="产品2"></el-option>
          <el-option value="3" label="产品3"></el-option>
        </el-select>
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
const dialogTitle = ref('质检任务信息')
const DetailFormRef = ref()
const formData = ref({})
watchEffect(() => {
  formData.value = props.data || {}
})

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
