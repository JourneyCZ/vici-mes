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
        label="产品编号"
        prop="productCode"
      >
        <el-input
          v-model="formData.productCode"
          placeholder="可填写，忽略将自动生成"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="产品名称"
        prop="productName"
      >
        <el-input
          v-model="formData.productName"
          placeholder="请输入产品名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="产品分类"
        prop="productType"
      >
        <el-select
          v-model="formData.productType"
          placeholder="请选择产品分类"
          clearable
        >
          <el-option value="1">普通产品</el-option>
          <el-option value="2">寄售库</el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="单位"
        prop="productUnit"
      >
        <el-select
          v-model="formData.productUnit"
          placeholder="请选择单位"
          clearable
        >
          <el-option value="个">个</el-option>
          <el-option value="吨">吨</el-option>
          <el-option value="升">升</el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="业务范围"
        prop="businessScope"
      >
        <el-input
          v-model="formData.businessScope"
          placeholder="请输入业务范围"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="产品状态"
        prop="productStatus"
      >
        <el-radio-group v-model="formData.productStatus">
          <el-radio value="1">启用</el-radio>
          <el-radio value="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="产品规格"
        prop="productSpecification"
      >
        <el-input
          v-model="formData.productSpecification"
          placeholder="请输入产品规格"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="工艺路线"
        prop="processRoute"
      >
        <el-input
          v-model="formData.processRoute"
          placeholder="请输入工艺路线"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="所在仓库"
        prop="stockroomName"
      >
        <el-select
          v-model="formData.stockroomName"
          placeholder="请选择所在仓库"
          clearable
        >
          <el-option value="成品仓">成品仓</el-option>
          <el-option value="半成品仓">半成品仓</el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="安全预警库存"
        prop="warningInventory"
      >
        <el-input-number
          v-model="formData.purchasStaff"
          :min="0"
          controls-position="right"
          placeholder="请输入安全预警库存"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="采购人员"
        prop="purchasStaff"
      >
        <el-input
          v-model="formData.purchasStaff"
          placeholder="请输入采购人员"
          clearable
        />
      </el-form-item>
      <el-form-item
        class="full-item"
        label="产品附件"
        prop="productFile"
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
        label="产品图片"
        prop="productImage"
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
const dialogTitle = ref('产品信息')
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
