<template>
  <div class="view-container">
    <!-- 查询表单 -->
    <QueryForm
      ref="QueryForm"
      :query="query"
      @submit="querySubmit"
      @reset="queryReset"
    >
      <!-- 表单项 -->
      <template #FormItems="{ query }">
        <el-form-item label="销售编号" prop="orderNumber">
          <el-input
            v-model="query.orderNumber"
            placeholder="请输入销售编号"
          />
        </el-form-item>
        <el-form-item label="客户名称" prop="custumerName">
          <el-input
            v-model="query.custumerName"
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
              :value="Number(item.value)"
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
        <el-button type="primary" plain>
          <el-icon><Plus /></el-icon>
          添加销售订单
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
  </div>
</template>

<script setup>
import QueryForm from '@/components/TableView/QueryForm.vue'
import { ref } from 'vue'

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
  orderNumber: null, // 销售编号
  custumerName: null, // 客户名称
  orderType: null, // 订单类型
  orderAmountMin: undefined, // 订单金额-最小值
  orderAmountMax: undefined, // 订单金额-最大值
  deliveryTimeArr: [], // 交货时间
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
    prop: 'cusotmerName',
    label: '客户',
    minWidth: '180ox',
    fixed: 'left',
  }, {
    prop: 'saleNum',
    label: '销售编号',
    minWidth: '180ox',
  }, {
    prop: 'productList',
    label: '产品清单',
    minWidth: '180ox',
  }, {
    prop: 'productFinished',
    label: '已完成产品',
    minWidth: '180ox',
  }, {
    prop: 'process',
    label: '进度',
    minWidth: '180ox',
  }, {
    prop: 'orderAmount',
    label: '订单金额',
    minWidth: '180ox',
  }, {
    prop: 'planTimeStart',
    label: '计划开始时间',
    minWidth: '180ox',
  }, {
    prop: 'planTimeEnd',
    label: '计划结束时间',
    minWidth: '180ox',
  }, {
    prop: 'orderType',
    label: '订单类型',
    minWidth: '180ox',
  }, {
    prop: 'merchandiserName',
    label: '跟单员',
    minWidth: '180ox',
  }, {
    prop: 'custumerPosition',
    label: '客户职位',
    minWidth: '180ox',
  }, {
    prop: 'contactName',
    label: '联系人',
    minWidth: '180ox',
  }, {
    prop: 'contactWay',
    label: '联系方式',
    minWidth: '180ox',
  }, {
    prop: 'publicAccount',
    label: '对公账号',
    minWidth: '180ox',
  }, {
    prop: 'address',
    label: '地址',
    minWidth: '180ox',
  }, {
    prop: 'orderRemark',
    label: '订单备注',
    minWidth: '180ox',
  }, {
    prop: 'createUserName',
    label: '创建人',
    minWidth: '180ox',
  }, {
    prop: 'createTime',
    label: '创建时间',
    minWidth: '180ox',
  },
])
// 表格数据
const tableData = ref([
  {
    cusotmerName: '李总',
    saleNum: 'ORDER1001',
    productList: '阀门',
  }
])
// 表格详情
function handleDetail () {

}
// 表格删除
function handleDelete () {

}
</script>

<style lang="scss" scoped>
@import '@/styles/common/TableView.common.scss';
</style>
