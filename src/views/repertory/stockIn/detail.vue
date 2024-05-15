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
        label="入库编号"
        prop="stockInCode"
      >
        <el-input
          v-model="formData.stockInCode"
          placeholder="可填写，忽略将自动生成"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="入库类型"
        prop="stockInType"
      >
        <el-select
          v-model="formData.stockInType"
          placeholder="请选择入库类型"
          clearable
        >
          <el-option value="成品入库" label="成品入库"></el-option>
          <el-option value="半成品入库" label="半成品入库"></el-option>
          <el-option value="采购入库" label="采购入库"></el-option>
          <el-option value="调拨入库" label="调拨入库"></el-option>
          <el-option value="销售退货入库" label="销售退货入库"></el-option>
          <el-option value="退料入库" label="退料入库"></el-option>
          <el-option value="其他入库" label="其他入库"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="入库时间"
        prop="stockInTime"
      >
        <el-date-picker
          v-model="formData.stockInTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择入库时间"
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
const dialogTitle = ref('入库单信息')
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
