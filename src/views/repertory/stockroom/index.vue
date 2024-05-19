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
        <el-form-item label="仓库名称" prop="stockroomName">
          <el-input
            v-model="query.stockroomName"
            placeholder="请输入仓库名称"
          />
        </el-form-item>
        <el-form-item label="仓库类型" prop="stockroomType">
          <el-select
            v-model="query.stockroomType"
            placeholder="请选择仓库类型"
            clearable
          >
            <el-option value="普通仓库" label="普通仓库"></el-option>
            <el-option value="寄售库" label="寄售库"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库状态" prop="stockroomStatus">
          <el-select
            v-model="query.stockroomStatus"
            placeholder="请选择仓库状态"
            clearable
          >
            <el-option value="启用" label="启用"></el-option>
            <el-option value="0" label="停用"></el-option>
          </el-select>
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
          添加仓库
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
// 表单数据
const query = ref({
  stockroomName: null, // 仓库名称
  stockroomType: null, // 仓库类型
  stockroomStatus: null, // 仓库状态
})
// 表单搜索
function search (newQuery) {
  console.log('search', query.value)
}
// 表单重置
function reset (newQuery) {
  console.log('reset', query.value)
}

/**
 * 数据表格
 */
// 表格列数据
const tableCols = ref([
  {
    prop: 'stockroomCode',
    label: '仓库编号',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'stockroomName',
    label: '仓库名称',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'stockroomType',
    label: '仓库类型',
    minWidth: '180px',
  }, {
    prop: 'stockroomStatus',
    label: '仓库状态',
    minWidth: '180px',
  }, {
    prop: 'stockroomKeeper',
    label: '仓库管理员',
    minWidth: '180px',
  }, {
    prop: 'address',
    label: '地址',
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
const tableData = ref({})
loadTableData()
function loadTableData () {
  const DATA = getStorageItem('repertoryStockroom')
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
