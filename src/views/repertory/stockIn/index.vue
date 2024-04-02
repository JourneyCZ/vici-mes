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
        <el-form-item label="入库编号" prop="stockInCode">
          <el-input
            v-model="query.stockInCode"
            placeholder="请输入入库编号"
          />
        </el-form-item>
        <el-form-item label="入库类型" prop="stockInType">
          <el-select
            v-model="query.stockInType"
            placeholder="请选择入库类型"
            clearable
          >
            <el-option value="1" label="成品入库"></el-option>
            <el-option value="2" label="半成品入库"></el-option>
            <el-option value="3" label="采购入库"></el-option>
            <el-option value="4" label="调拨入库"></el-option>
            <el-option value="5" label="销售退货入库"></el-option>
            <el-option value="6" label="退料入库"></el-option>
            <el-option value="7" label="其他入库"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库时间" prop="stockInTimeArr">
          <el-date-picker
            v-model="query.stockInTimeArr"
            type="daterange"
            value-format="YYYY-MM-DD"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </template>
      <!-- 表单折叠项 -->
      <template #FoldedItems="{ query }">
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
        <el-button
          type="primary"
          plain
          @click="handleDetail('add')"
        >
          <el-icon><Plus /></el-icon>
          添加入库单
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
  stockInCode: null, // 入库编号
  stockInType: null, // 入库类型
  stockInTimeArr: [], // 入库时间
  createUserName: null, // 创建人
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
    prop: 'stockInCode',
    label: '入库编号',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'stockInType',
    label: '入库类型',
    minWidth: '180px',
  }, {
    prop: 'stockInTime',
    label: '入库时间',
    minWidth: '180px',
  }, {
    prop: 'createUserName',
    label: '创建人',
    minWidth: '180px',
  }, {
    prop: 'createTime',
    label: '创建时间',
    minWidth: '180px',
  }, {
    prop: 'remark',
    label: '备注',
    minWidth: '180px',
  }
])
// 表格数据
const tableData = ref([
  {
    stockInId: '1',
    stockInCode: 'CUST1001',
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
