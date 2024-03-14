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
        <el-form-item label="计划编号" prop="planNumber">
          <el-input
            v-model="query.planNumber"
            placeholder="请输入计划编号"
          />
        </el-form-item>
        <el-form-item label="计划开始时间" prop="planStartTimeArr">
          <el-date-picker
            v-model="query.planStartTimeArr"
            type="daterange"
            value-format="YYYY-MM-DD"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="计划结束时间" prop="planEndTimeArr">
          <el-date-picker
            v-model="query.planEndTimeArr"
            type="daterange"
            value-format="YYYY-MM-DD"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </template>
      <!-- 表单折叠项 -->
      <template #FoldedItems="{ query }">
        <el-form-item label="产品名称" prop="productName">
          <el-input
            v-model="query.productName"
            placeholder="请输入产品名称"
          />
        </el-form-item>
        <el-form-item label="销售编号" prop="orderNumber">
          <el-input
            v-model="query.orderNumber"
            placeholder="请输入销售编号"
          />
        </el-form-item>
      </template>
    </QueryForm>

    <!-- 数据表格-操作栏 -->
    <div class="data-table-handle">
      <div class="data-table-handle-left">
        <el-button
          type="primary"
          plain
          @click="handleDetail('add')"
        >
          <el-icon><Plus /></el-icon>
          添加计划订单
        </el-button>
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
      <el-table-column label="操作" width="120" fixed="right">
        <template v-slot="{ row }">
          <el-button type="primary" link @click="handleDetail('edit', row)">编辑</el-button>
          <el-button type="danger" link @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
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

    <!-- 详情弹窗 -->
    <DetailDialog
      v-model:visible="detailVisible"
      :operate="detailOperate"
      :data="detailData"
    />
  </div>
</template>

<script setup>
import QueryForm from '@/components/TableView/QueryForm.vue'
import DetailDialog from './detail.vue'
import { ref } from 'vue'

/**
 * 查询表单
 */
// 表单数据
const query = ref({
  planNumber: null, // 计划编号
  planStartTimeArr: [], // 计划开始时间
  planEndTimeArr: [], // 计划结束时间
  productName: null, // 产品名称
  orderNumber: null, // 销售编号
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
    prop: 'cusotmerName',
    label: '客户',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'planNumber',
    label: '计划编号',
    minWidth: '180px',
  }, {
    prop: 'orderNumber',
    label: '销售编号',
    minWidth: '180px',
  }, {
    prop: 'productNumber',
    label: '产品编号',
    minWidth: '180px',
  }, {
    prop: 'productName',
    label: '产品名称',
    minWidth: '180px',
  }, {
    prop: 'remark',
    label: '备注',
    minWidth: '180px',
  }, {
    prop: 'process',
    label: '进度',
    minWidth: '180px',
  }, {
    prop: 'status',
    label: '状态',
    minWidth: '180px',
  }, {
    prop: 'planQuantity',
    label: '计划数量',
    minWidth: '180px',
  }, {
    prop: 'stockQuantity',
    label: '库存数量',
    minWidth: '180px',
  }, {
    prop: 'productionQuantity',
    label: '生产数量',
    minWidth: '180px',
  }, {
    prop: 'deliveryTime',
    label: '交货时间',
    minWidth: '180px',
  }, {
    prop: 'planStartTime',
    label: '计划开始时间',
    minWidth: '180px',
  }, {
    prop: 'planEndTime',
    label: '计划结束时间',
    minWidth: '180px',
  }, {
    prop: 'productionStartTime',
    label: '生产开始时间',
    minWidth: '180px',
  }, {
    prop: 'productionEndTime',
    label: '生产结束时间',
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
    cusotmerId: '1',
    cusotmerName: '李总',
    planNumber: 'PLAN1001',
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
// 表格详情弹窗
const detailVisible = ref(false)
const detailOperate = ref('add')
const detailData = ref(null)
// 表格详情
function handleDetail (operate, data) {
  detailVisible.value = true
  detailOperate.value = operate
  detailData.value = data || null
}
// 表格删除
function handleDelete () {

}
</script>

<style lang="scss" scoped>
@import '@/styles/common/TableView.common.scss';
</style>
