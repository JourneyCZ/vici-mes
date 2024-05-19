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
        <el-form-item label="工序编号" prop="processCode">
          <el-input
            v-model="query.processCode"
            placeholder="请输入工序编号"
          />
        </el-form-item>
        <el-form-item label="工序名称" prop="processName">
          <el-input
            v-model="query.processName"
            placeholder="请输入工序名称"
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
          添加工序
        </el-button>
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
  processName: null, // 工序名称
  processCode: null, // 工序编号
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
    prop: 'processCode',
    label: '工序编号',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'processName',
    label: '工序名称',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'reportAuthority',
    label: '报工权限',
    minWidth: '180px',
  }, {
    prop: 'reportRatio',
    label: '报工数配比',
    minWidth: '180px',
  }, {
    prop: 'rejectsList',
    label: '不良品项列表',
    minWidth: '180px',
  }, {
    prop: 'equipmentGroup',
    label: '设备组列表',
    minWidth: '180px',
  }, {
    prop: 'processFile',
    label: '工序附件',
    minWidth: '180px',
  }, {
    prop: 'processImage',
    label: '工序图片',
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
  const DATA = getStorageItem('baseProcess')
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
