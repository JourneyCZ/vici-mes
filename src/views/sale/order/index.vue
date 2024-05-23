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
        <el-form-item label="销售编号" prop="orderCode">
          <el-input
            v-model="query.orderCode"
            placeholder="请输入销售编号"
          />
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input
            v-model="query.customerName"
            placeholder="请输入客户名称"
          />
        </el-form-item>
        <el-form-item label="订单类型" prop="orderType">
          <el-select
            v-model="query.orderType"
          >
            <el-option
              v-for="item in orderTypes"
              :key="item.value"
              :value="item.label"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <!-- 表单折叠项 -->
      <template #FoldedItems="{ query }">
        <el-form-item label="订单金额" prop="orderAmountMin">
          <el-input-number
            v-model="query.orderAmountMin"
            :min="0"
            :max="query.orderAmountMax"
            controls-position="right"
            placeholder="请输入最小值"
          />
          <div :span="2" class="query-form-separator">-</div>
          <el-input-number
            v-model="query.orderAmountMax"
            :min="query.orderAmountMin"
            controls-position="right"
            placeholder="请输入最大值"
          />
        </el-form-item>
        <el-form-item label="交货时间" prop="deliveryTimeArr">
          <el-date-picker
            v-model="query.deliveryTimeArr"
            type="daterange"
            value-format="YYYY-MM-DD"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
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
        <el-button
          type="primary"
          plain
          @click="handleDetail('add')"
        >
          <el-icon><Plus /></el-icon>
          添加销售订单
        </el-button>
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
      <el-table-column label="产品清单" minWidth="200" fixed="left">
        <template v-slot="{ row }">
          {{ row.productList?.map(item => item.productName).join('，') || '' }}
        </template>
      </el-table-column>
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
      @save="loadTableData"
    />
  </div>
</template>

<script setup>
import QueryForm from '@/components/TableView/QueryForm.vue'
import DetailDialog from './detail.vue'
import { ref } from 'vue'
import { getStorageItem } from '@/utils/LocalStorageManage.js' // , deleteStorageItem

/**
 * 查询表单
 */
// 订单类型
const orderTypes = ref([
  { value: '1', label: '订单类型1' },
  { value: '2', label: '订单类型2' }
])
// 表单数据
const query = ref({
  orderCode: null, // 销售编号
  customerName: null, // 客户名称
  orderType: null, // 订单类型
  orderAmountMin: undefined, // 订单金额-最小值
  orderAmountMax: undefined, // 订单金额-最大值
  deliveryTimeArr: [], // 交货时间
  createTimeArr: [], // 创建时间
})
// 表单搜索
function search (newQuery) {
  console.log('search', query.value)
}
// 表单重置
function reset (newQuery) {
  newQuery.orderAmountMax = undefined
  console.log('reset', query.value)
}

/**
 * 数据表格
 */
// 表格列数据
const tableCols = ref([
  {
    prop: 'orderCode',
    label: '销售编号',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'customerName',
    label: '客户',
    minWidth: '180px',
    fixed: 'left',
  }, {
  //   prop: 'productList',
  //   label: '产品清单',
  //   minWidth: '180px',
  // }, {
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
    prop: 'orderType',
    label: '订单类型',
    minWidth: '180px',
  }, {
    prop: 'merchandiserName',
    label: '跟单员',
    minWidth: '180px',
  }, {
    prop: 'customerPosition',
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
const tableData = ref({})
loadTableData()
function loadTableData () {
  const DATA = getStorageItem('saleOrder')
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
