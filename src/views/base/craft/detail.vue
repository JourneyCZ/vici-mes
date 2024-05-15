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
        label="工艺路线编号"
        prop="craftCode"
      >
        <el-input
          v-model="formData.craftCode"
          placeholder="可填写，忽略将自动生成"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="工艺路线名称"
        prop="craftName"
      >
        <el-input
          v-model="formData.craftName"
          placeholder="请输入工艺路线名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        class="full-item"
        label="工序列表"
        prop="processName"
      >
        <el-select
          v-model="formData.processName"
          placeholder="请选择工序"
          clearable
        >
          <el-option value="工序1">工序1</el-option>
          <el-option value="工序2">工序2</el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="full-item"
        label="最后一道工序"
        prop="lastProcessName"
      >
        <el-select
          v-model="formData.lastProcessName"
          placeholder="请选择最后一道工序"
          clearable
        >
          <el-option value="工序1">工序1</el-option>
          <el-option value="工序2">工序2</el-option>
        </el-select>
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
const dialogTitle = ref('工艺路线信息')
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
  formData.value.craftId = formData.value.craftId || `CRAF${new Date().getTime()}`
  saveFunc('baseCraft', formData.value, 'craftId')
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
