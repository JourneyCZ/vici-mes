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
        label="方案编号"
        prop="schemeCode"
      >
        <el-input
          v-model="formData.schemeCode"
          placeholder="可填写，忽略将自动生成"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="方案名称"
        prop="schemeName"
      >
        <el-input
          v-model="formData.schemeName"
          placeholder="请输入方案名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="检验类型"
        prop="inspectionType"
      >
        <el-select
          v-model="formData.inspectionType"
          placeholder="请选择检验类型"
          clearable
        >
          <el-option value="1" label="开工检验"></el-option>
          <el-option value="2" label="过程检验"></el-option>
          <el-option value="3" label="最终检验"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="抽样类型"
        prop="sampleType"
      >
        <el-select
          v-model="formData.sampleType"
          placeholder="请选择抽样类型"
          clearable
        >
          <el-option value="1" label="定时"></el-option>
          <el-option value="2" label="定量"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogClose"
        >
          保存
        </el-button>
        <el-button @click="dialogClose">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watchEffect, defineProps, defineEmits } from 'vue'

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
const dialogTitle = ref('质检方案信息')
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
