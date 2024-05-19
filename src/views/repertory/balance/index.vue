<template>
  <div class="view-container">
    <!-- 查询表单 -->
    <QueryForm
      :query="query"
      @submit="search"
      @reset="reset"
    >
      <!-- 表单项 -->
      <template #FormItems="{ query }">
        <el-form-item label="产品编号" prop="productCode">
          <el-input
            v-model="query.productCode"
            placeholder="请输入产品编号"
          />
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input
            v-model="query.productName"
            placeholder="请输入产品名称"
          />
        </el-form-item>
        <el-form-item label="产品规格" prop="productSpecification">
          <el-input
            v-model="query.productSpecification"
            placeholder="请输入产品规格"
          />
        </el-form-item>
      </template>
      <!-- 表单折叠项 -->
      <template #FoldedItems="{ query }">
        <el-form-item label="产品分类" prop="productType">
          <el-select
            v-model="query.productType"
            placeholder="请选择产品分类"
            clearable
          >
            <el-option value="产成品" label="产成品"></el-option>
            <el-option value="半成品" label="半成品"></el-option>
            <el-option value="零部件" label="零部件"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库" prop="stockName">
          <el-input
            v-model="query.stockName"
            placeholder="请输入仓库"
          />
        </el-form-item>
        <el-form-item label="库存区间" prop="stockQuantityMin">
          <el-input-number
            v-model="query.stockQuantityMin"
            :min="0"
            :max="query.stockQuantityMax"
            controls-position="right"
            placeholder="请输入最小值"
          />
          <div :span="2" class="query-form-separator">-</div>
          <el-input-number
            v-model="query.stockQuantityMax"
            :min="query.stockQuantityMin"
            controls-position="right"
            placeholder="请输入最大值"
          />
        </el-form-item>
      </template>
    </QueryForm>

    <!-- 数据表格-操作栏 -->
    <div class="data-table-handle">
      <div class="data-table-handle-left">
        <!-- <el-button type="warning" plain>
          <el-icon><Download /></el-icon>
          导出
        </el-button> -->
      </div>
      <div class="data-table-handle-right">
        <!-- <el-button type="primary" plain>
          <el-icon><Setting /></el-icon>
          列配置
        </el-button> -->
      </div>
    </div>
    <!-- 数据表格 -->
    <el-table
      ref="DataTable"
      class="data-table"
      :data="tableData"
      header-cell-class-name="data-table-header"
      stripe
      border
    >
      <el-table-column type="index" label="序号" width="80" fixed="left" />
      <el-table-column
        v-for="col in tableCols"
        :key="col.prop"
        :prop="col.prop || null"
        :label="col.label || null"
        :width="col.width || null"
        :minWidth="col.minWidth || null"
        :fixed="col.fixed || null"
      />
    </el-table>
    <!-- 数据表格-分页 -->
    <el-pagination
      class="data-table-page"
      v-model:current-page="page.current"
      v-model:page-size="page.size"
      :page-sizes="page.sizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @current-change="pageCurrentChange"
      @size-change="pageSizeChange"
    />
  </div>
</template>

<script setup>
import QueryForm from '@/components/TableView/QueryForm.vue'
import { ref } from 'vue'
import { getStorageItem } from '@/utils/LocalStorageManage.js' // , deleteStorageItem

/**
 * 查询表单
 */
// 表单数据
const query = ref({
  productCode: null, // 产品编号
  productName: null, // 产品名称
  productSpecification: null, // 产品规格
  productType: null, // 产品分类
  stockName: [], // 仓库
  stockQuantityMin: undefined, // 订单金额-最小值
  stockQuantityMax: undefined, // 订单金额-最大值
})
// 表单搜索
function search (newQuery) {
  console.log('search', query.value)
}
// 表单重置
function reset (newQuery) {
  newQuery.stockQuantityMax = undefined
  console.log('reset', query.value)
}

/**
 * 数据表格
 */
// 表格列数据
const tableCols = ref([
  {
    prop: 'productCode',
    label: '产品编号',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'productName',
    label: '产品名称',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'productType',
    label: '产品分类',
    minWidth: '180px',
  }, {
    prop: 'productSpecification',
    label: '产品规格',
    minWidth: '180px',
  }, {
    prop: 'productUnit',
    label: '单位',
    minWidth: '180px',
  }, {
    prop: 'stockroomCode',
    label: '仓库编号',
    minWidth: '180px',
  }, {
    prop: 'stockroomName',
    label: '仓库名称',
    minWidth: '180px',
  }, {
    prop: 'safetyWarningInventory',
    label: '安全预警库存',
    minWidth: '180px',
  }, {
    prop: 'stockQuantity',
    label: '库存余额',
    minWidth: '180px',
  }, {
    prop: 'purchasingAgent',
    label: '采购人员',
    minWidth: '180px',
  }
])
// 表格数据
const tableData = ref({})
loadTableData()
function loadTableData () {
  const DATA = getStorageItem('repertoryBalance')
  tableData.value = DATA
}
// 表格分页
const page = ref({
  current: 1,
  size: 10,
  sizes: [10, 20, 30, 40, 50],
  total: tableData.value?.length || 0,
})
function pageCurrentChange () {

}
function pageSizeChange () {

}
</script>

<style lang="scss" scoped>
@import '@/styles/common/TableView.common.scss';
</style>
