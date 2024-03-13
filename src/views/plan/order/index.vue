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
        <el-form-item label="产品名称" prop="productionName">
          <el-input
            v-model="query.productionName"
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
        <template v-solt="{ row }">
          <el-button type="primary" link @click="handleDetail('edit', row)">编辑</el-button>
          <el-button type="danger" link @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      v-model:visible="DetailVisible"
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
  productionName: null, // 产品名称
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
    prop: 'productList',
    label: '产品清单',
    minWidth: '180px',
  }, {
    prop: 'productFinished',
    label: '已完成产品',
    minWidth: '180px',
  }, {
    prop: 'process',
    label: '进度',
    minWidth: '180px',
  }, {
    prop: 'orderAmount',
    label: '订单金额',
    minWidth: '180px',
  }, {
    prop: 'planTimeStart',
    label: '计划开始时间',
    minWidth: '180px',
  }, {
    prop: 'planTimeEnd',
    label: '计划结束时间',
    minWidth: '180px',
  }, {
    prop: 'merchandiserName',
    label: '跟单员',
    minWidth: '180px',
  }, {
    prop: 'custumerPosition',
    label: '客户职位',
    minWidth: '180px',
  }, {
    prop: 'contactName',
    label: '联系人',
    minWidth: '180px',
  }, {
    prop: 'contactWay',
    label: '联系方式',
    minWidth: '180px',
  }, {
    prop: 'publicAccount',
    label: '对公账号',
    minWidth: '180px',
  }, {
    prop: 'address',
    label: '地址',
    minWidth: '180px',
  }, {
    prop: 'orderRemark',
    label: '订单备注',
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
const DetailVisible = ref(false)
// 表格详情
function handleDetail (operate, data) {
  DetailVisible.value = true
}
// 表格删除
function handleDelete () {

}
</script>

<style lang="scss" scoped>
@import '@/styles/common/TableView.common.scss';
</style>
