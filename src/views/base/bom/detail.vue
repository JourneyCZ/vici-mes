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
        label="物料编号"
        prop="materialCode"
      >
        <el-input
          v-model="formData.materialCode"
          placeholder="可填写，忽略将自动生成"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="物料名称"
        prop="materialName"
      >
        <el-input
          v-model="formData.materialName"
          placeholder="请输入物料名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="物料分类"
        prop="materialType"
      >
        <el-select
          v-model="formData.materialType"
          placeholder="请选择物料分类"
          clearable
        >
          <el-option value="普通物料">普通物料</el-option>
          <el-option value="易燃物料">易燃物料</el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="规格"
        prop="materialSpecification"
      >
        <el-input
          v-model="formData.materialSpecification"
          placeholder="请输入规格"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="单位"
        prop="materialUnit"
      >
        <el-select
          v-model="formData.materialUnit"
          placeholder="请选择单位"
          clearable
        >
          <el-option value="个">个</el-option>
          <el-option value="吨">吨</el-option>
          <el-option value="升">升</el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="基础数量"
        prop="baseQuantity"
      >
        <el-input-number
          v-model="formData.baseQuantity"
          :min="0"
          controls-position="right"
          placeholder="请输入基础数量"
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
      <el-form-item
        class="full-item"
        label="物料图片"
        prop="materialImage"
      >
        <el-upload
          list-type="picture-card"
          v-model:file-list="formData.imageList"
        >
          <el-icon><Plus /></el-icon>
          <template #tip>
            <div class="el-upload__tip">
              请上传 大小不超过 <span class="red-tip">30MB</span> 格式为 <span class="red-tip">png/jpg/jpeg</span> 的文件
            </div>
          </template>
        </el-upload>
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
import { Plus } from '@element-plus/icons-vue'

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
const dialogTitle = ref('物料信息')
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
  formData.value.materialCode = formData.value.materialCode || `MATE${new Date().getTime()}`
  saveFunc('baseBom', formData.value, 'materialCode')
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
