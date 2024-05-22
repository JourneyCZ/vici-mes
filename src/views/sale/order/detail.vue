<template>
  <el-dialog
    class="detail-dialog"
    v-model="dialogVisible"
    :title="dialogTitle"
    :before-close="dialogClose"
  >
    <!-- 详情表单 -->
    <el-form
      ref="DetailFormRef"
      class="detail-form"
      :model="formData"
      :inline="true"
      label-width="auto"
    >
      <el-form-item
        label="销售编号"
        prop="orderCode"
      >
        <el-input
          v-model="formData.orderCode"
          placeholder="可填写，忽略将自动生成"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="客户"
        prop="customerName"
      >
        <el-select
          v-model="formData.customerName"
          placeholder="请选择客户"
          clearable
        >
          <el-option value="李总" label="李总"></el-option>
          <el-option value="刘总" label="刘总"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="订单类型"
        prop="orderType"
      >
        <el-select
          v-model="formData.orderType"
          placeholder="请选择订单类型"
          clearable
        >
          <el-option value="订单类型1" label="订单类型1"></el-option>
          <el-option value="订单类型2" label="订单类型2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="订单金额"
        prop="orderAmount"
      >
        <el-input-number
          v-model="formData.orderAmount"
          :min="0"
          controls-position="right"
          placeholder="请输入订单金额"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="交付时间"
        prop="deliveryTime"
      >
        <el-date-picker
          v-model="formData.deliveryTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="请选择计划交付时间"
        />
      </el-form-item>
      <el-form-item
        label="跟单员"
        prop="merchandiser"
      >
        <el-input
          v-model="formData.merchandiser"
          placeholder="请输入跟单员"
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
    </el-form>
    <!-- 详情表格 -->
    <div class="detail-title">
      <div class="detail-title-text">订单产品列表</div>
      <el-button
        class="detail-title-button"
        type="primary"
        plain
        :icon="Plus"
        @click="initProductDialog"
      >添加订单产品</el-button>
    </div>
    <el-table
      ref="DetailTable"
      class="detail-table"
      :data="formData.productList"
      header-cell-class-name="data-table-header"
      height="300"
      stripe
      border
    >
      <el-table-column type="index" label="序号" width="80" fixed="left" />
      <el-table-column prop="productCode" label="产品编号" minWidth="80" fixed="left" />
      <el-table-column prop="productName" label="产品名称" minWidth="80" fixed="left" />
      <el-table-column prop="productSpecification" label="产品规格" minWidth="80" />
      <el-table-column prop="productUnit" label="产品单位" minWidth="80" />
    </el-table>
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
    <!-- 订单产品弹窗 -->
    <ProductDialog
      ref="ProductDialogRef"
      @save="productSelected"
    />
  </el-dialog>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import ProductDialog from './product.vue'
import { addStorageItem, editStorageItem } from '@/utils/LocalStorageManage.js'

const emits = defineEmits(['save', 'update:visible'])

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
const dialogTitle = ref('销售订单信息')
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
  formData.value.orderCode = formData.value.orderCode || `ORDE${new Date().getTime()}`
  saveFunc('saleOrder', formData.value, 'orderCode')
  emits('save')
  dialogClose()
}

// 弹窗开关
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

// 订单产品弹窗初始化
const ProductDialogRef = ref()
function initProductDialog () {
  const productData = []
  formData.value.productList?.forEach(item => {
    productData.push(item.productCode)
  })
  ProductDialogRef.value?.dialogInit(productData)
}
function productSelected (data) {
  formData.value.productList = data
}

</script>

<style lang="scss">
@import '@/styles/common/DetailDialog.common.scss';
</style>
