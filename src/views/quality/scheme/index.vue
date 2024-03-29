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
        <el-form-item label="方案编号" prop="schemeNumber">
          <el-input
            v-model="query.schemeNumber"
            placeholder="请输入方案编号"
          />
        </el-form-item>
        <el-form-item label="方案名称" prop="schemeName">
          <el-input
            v-model="query.schemeNumber"
            placeholder="请输入方案名称"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="query.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <!-- 表单折叠项 -->
      <template #FoldedItems="{ query }">
        <el-form-item label="创建日期" prop="createTimeArr">
          <el-date-picker
            v-model="query.createTimeArr"
            type="daterange"
            value-format="YYYY-MM-DD"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="更新时间" prop="updateDateArr">
          <el-date-picker
            v-model="query.updateDateArr"
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
          添加质检方案
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
  schemeNumber: null, // 方案编号
  schemeName: null, // 方案名称
  status: null, // 状态
  createTimeArr: [], // 创建时间
  updateDateArr: [], // 更新时间
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
    prop: 'schemeNumber',
    label: '方案编号',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'schemeName',
    label: '方案名称',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'status',
    label: '状态',
    minWidth: '180px',
  }, {
    prop: 'createTime',
    label: '创建时间',
    minWidth: '180px',
  }, {
    prop: 'updateDate',
    label: '更新时间',
    minWidth: '180px',
  },
])
// 表格数据
const tableData = ref([
  {
    schemeNumber: 'SCHE1001',
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
