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
        label="工序编号"
        prop="processCode"
      >
        <el-input
          v-model="formData.processCode"
          placeholder="可填写，忽略将自动生成"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="工序名称"
        prop="processName"
      >
        <el-input
          v-model="formData.processName"
          placeholder="请输入工序名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="报工权限"
        prop="reportAuthority"
      >
        <el-input
          v-model="formData.reportAuthority"
          placeholder="请输入报工权限"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="报工数配比"
        prop="reportRatio"
      >
        <el-input-number
          v-model="formData.reportRatio"
          :min="0"
          :step="0.1"
          controls-position="right"
          placeholder="请输入报工数配比"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="不良品项列表"
        prop="rejectsList"
      >
        <el-select
          v-model="formData.rejectsList"
          placeholder="请选择不良品项列表"
          clearable
        >
          <el-option value="不良品1">不良品1</el-option>
          <el-option value="不良品2">不良品2</el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="full-item"
        label="工序图片"
        prop="processImage"
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
      <el-form-item
        class="full-item"
        label="工序附件"
        prop="processFile"
      >
        <el-upload
          v-model:file-list="formData.fileList"
          multiple
          :limit="3"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">请上传 大小不超过 <span class="red-tip">100MB</span> 格式为 <span class="red-tip">doc/xls/ppt/txt/pdf/mp4/png/jpg/jpeg</span> 的文件</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item
        class="full-item"
        label="质检方案"
        prop="qualityScheme"
      >
        <el-select
          v-model="formData.qualityScheme"
          placeholder="请选择质检方案"
          clearable
        >
          <el-option value="质检方案1">质检方案1</el-option>
          <el-option value="质检方案2">质检方案2</el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item
        class="full-item"
        label="设备组列表"
        prop="equipmentGroup"
      >
        <el-select
          v-model="formData.equipmentGroup"
          placeholder="请选择设备组"
          clearable
        >
          <el-option value="设备组1">设备组1</el-option>
          <el-option value="设备组2">设备组2</el-option>
        </el-select>
      </el-form-item> -->
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
import { Plus } from '@element-plus/icons-vue'
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
const dialogTitle = ref('工序信息')
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
  formData.value.processId = formData.value.processId || `PROC${new Date().getTime()}`
  saveFunc('baseProcess', formData.value, 'processId')
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
