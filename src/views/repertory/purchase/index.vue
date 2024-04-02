<template>
  <div class="view-container">
    <!-- 查询表单 -->
    <QueryForm
      :query="query"
      @submit="querySubmit"
      @reset="queryReset"
    >
      <!-- 表单项 -->
      <template #FormItems="{ query }">
        <el-form-item label="采购编号" prop="purchaseCode">
          <el-input
            v-model="query.purchaseCode"
            placeholder="请输入采购编号"
          />
        </el-form-item>
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
      </template>
      <!-- 表单折叠项 -->
      <template #FoldedItems="{ query }">
        <el-form-item label="供应商" prop="supplierName">
          <el-input
            v-model="query.supplierName"
            placeholder="请输入供应商"
          />
        </el-form-item>
        <el-form-item label="交货日期" prop="deliveryDateArr">
          <el-date-picker
            v-model="query.deliveryDateArr"
            type="daterange"
            value-format="YYYY-MM-DD"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="创建日期" prop="createTimeArr">
          <el-date-picker
            v-model="query.createTimeArr"
            type="daterange"
            value-format="YYYY-MM-DD"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </template>
    </QueryForm>

    <!-- 数据表格-操作栏 -->
    <div class="data-table-handle">
      <div class="data-table-handle-left">
        <el-button type="warning" plain>
          <el-icon><Download /></el-icon>
          导出
        </el-button>
      </div>
      <div class="data-table-handle-right">
        <el-button type="primary" plain>
          <el-icon><Setting /></el-icon>
          列配置
        </el-button>
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
      <el-table-column type="index" label="序号" width="120" fixed="left" />
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

/**
 * 查询表单
 */
// 表单数据
const query = ref({
  purchaseCode: null, // 采购编号
  productCode: null, // 产品编号
  productName: null, // 产品名称
  supplierName: null, // 供应商名称
  deliveryDateArr: [], // 交货时间
  createTimeArr: [], // 创建时间
})
// 表单搜索
function querySubmit (newQuery) {
  console.log('querySubmit', query.value)
}
// 表单重置
function queryReset (newQuery) {
  console.log('queryReset', query.value)
}

/**
 * 数据表格
 */
// 表格列数据
const tableCols = ref([
  {
    prop: 'purchaseCode',
    label: '采购编号',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'purchaseDate',
    label: '采购日期',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'supplierName',
    label: '供应商',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'productCode',
    label: '产品编号',
    minWidth: '180px',
  }, {
    prop: 'productName',
    label: '产品名称',
    minWidth: '180px',
  }, {
    prop: 'productType',
    label: '产品分类',
    minWidth: '180px',
  }, {
    prop: 'productUnit',
    label: '单位',
    minWidth: '180px',
  }, {
    prop: 'productQuantity',
    label: '采购数量',
    minWidth: '180px',
  }, {
    prop: 'deliveryDate',
    label: '交货日期',
    minWidth: '180px',
  }, {
    prop: 'createUserName',
    label: '创建人',
    minWidth: '180px',
  }, {
    prop: 'createTime',
    label: '创建时间',
    minWidth: '180px',
  },
])
// 表格数据
const tableData = ref([
  {
    purchaseCode: 'PURC1001',
    productCode: 'PROD1001',
  }
])
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
