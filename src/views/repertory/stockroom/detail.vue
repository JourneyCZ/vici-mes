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
        label="仓库名称"
        prop="stockroomName"
      >
        <el-input
          v-model="formData.stockroomName"
          placeholder="请输入仓库名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="仓库编号"
        prop="stockroomNumber"
      >
        <el-input
          v-model="formData.stockroomNumber"
          placeholder="可填写，忽略将自动生成"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="仓库类型"
        prop="stockroomType"
      >
        <el-select
          v-model="formData.stockroomType"
          placeholder="请选择仓库类型"
          clearable
        >
          <el-option value="1">普通仓库</el-option>
          <el-option value="2">寄售库</el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="仓库管理员"
        prop="stockroomKeeper"
      >
        <el-input
          v-model="formData.stockroomKeeper"
          placeholder="请输入仓库管理员"
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
        label="仓库状态"
        prop="stockroomStatus"
      >
        <el-radio-group v-model="formData.stockroomStatus">
          <el-radio value="1">启用</el-radio>
          <el-radio value="0">停用</el-radio>
        </el-radio-group>
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
const dialogTitle = ref('仓库信息')
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
