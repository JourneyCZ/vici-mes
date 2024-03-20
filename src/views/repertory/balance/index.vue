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
        <el-form-item label="产品编号" prop="productNumber">
          <el-input
            v-model="query.productNumber"
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
        <el-form-item label="出入库类型" prop="stockInOutType">
          <el-cascader
            v-model="query.stockInOutType"
            :options="stockInOutOptions"
          />
        </el-form-item>
        <el-form-item label="出入库单号" prop="stockInOutNumber">
          <el-input
            v-model="query.stockInOutNumber"
            placeholder="请输入出入库单号"
          />
        </el-form-item>
        <el-form-item label="实际收发时间" prop="stockInOutTimeArr">
          <el-date-picker
            v-model="query.stockInOutTimeArr"
            type="daterange"
            value-format="YYYY-MM-DD"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="创建人" prop="createUserName">
          <el-input
            v-model="query.createUserName"
            placeholder="请输入创建人"
          />
        </el-form-item>
        <el-form-item label="创建时间" prop="createTimeArr">
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
// 出入库类型
const stockInOutOptions = ref([
  {
    value: '1',
    label: '入库',
    children: [
      { value: '1', label: '成品入库' },
      { value: '2', label: '半成品入库' },
      { value: '3', label: '采购入库' },
      { value: '4', label: '调拨入库' },
      { value: '5', label: '销售退货入库' },
      { value: '6', label: '退料入库' },
      { value: '7', label: '其他出库' },
    ]
  }, {
    value: '2',
    label: '出库',
    children: [
      { value: '1', label: '普通出库' },
      { value: '2', label: '生产领料出库' },
      { value: '3', label: '调拨出库' },
      { value: '4', label: '采购退货出库' },
      { value: '5', label: '销售出库' },
      { value: '6', label: '其他出库' },
    ]
  }
])
// 表单数据
const query = ref({
  productNumber: null, // 产品编号
  productName: null, // 产品名称
  productSpecification: null, // 产品规格
  stockInOutType: null, // 出入库类型
  stockInOutTimeArr: [], // 实际收发时间
  createUserName: null, // 创建人
  createTimeArr: [], // 创建时间
})
// 表单搜索
function querySubmit (newQuery) {
  console.log('querySubmit', query.value)
}
// 表单重置
function queryReset (newQuery) {
  newQuery.orderAmountMax = undefined
  console.log('queryReset', query.value)
}

/**
 * 数据表格
 */
// 表格列数据
const tableCols = ref([
  {
    prop: 'productNumber',
    label: '产品编号',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'productName',
    label: '产品名称',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'productSpecification',
    label: '产品规格',
    minWidth: '180px',
  }, {
    prop: 'stockroomName',
    label: '仓库',
    minWidth: '180px',
  }, {
    prop: 'changeQuantity',
    label: '库存变更数量',
    minWidth: '180px',
  }, {
    prop: 'stockOutTime',
    label: '实际收发时间',
    minWidth: '180px',
  }, {
    prop: 'stockInOutType',
    label: '出入库类型',
    minWidth: '180px',
  }, {
    prop: 'stockInOutNumber',
    label: '出入库单据编号',
    minWidth: '180px',
  }, {
    prop: 'remark',
    label: '备注',
    minWidth: '180px',
  }, {
    prop: 'createUserName',
    label: '创建人',
    minWidth: '180px',
  }, {
    prop: 'createTime',
    label: '创建时间',
    minWidth: '180px',
  }
])
// 表格数据
const tableData = ref([
  {
    stockOutId: '1',
    productNumber: 'CUST1001',
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
