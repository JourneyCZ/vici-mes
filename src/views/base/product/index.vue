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
        <el-form-item label="产品规格" prop="productSpecification">
          <el-input
            v-model="query.productSpecification"
            placeholder="请输入产品规格"
          />
        </el-form-item>
      </template>
      <!-- 表单折叠项 -->
      <template #FoldedItems="{ query }">
        <el-form-item label="产品分类" prop="productType">
          <el-select
            v-model="query.productType"
            placeholder="请选择产品分类"
            clearable
          >
            <el-option :value="null">全部</el-option>
            <el-option value="产成品">产成品</el-option>
            <el-option value="半成品">半成品</el-option>
            <el-option value="零部件">零部件</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务范围" prop="businessScope">
          <el-input
            v-model="query.businessScope"
            placeholder="请输入业务范围"
          />
        </el-form-item>
        <el-form-item label="工艺路线" prop="processRoute">
          <el-select
            v-model="query.processRoute"
            placeholder="请选择工艺路线"
            clearable
          >
            <el-option value="工艺一" label="工艺一"></el-option>
            <el-option value="工艺二" label="工艺二"></el-option>
          </el-select>
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
        <el-form-item label="产品状态" prop="productStatus">
          <el-select
            v-model="query.productStatus"
            placeholder="请选择产品状态"
            clearable
          >
            <el-option value="启用" label="启用"></el-option>
            <el-option value="停用" label="停用"></el-option>
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
          添加产品
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
  productName: null, // 产品名称
  productType: null, // 产品分类
  createTimeArr: [], // 创建时间
  productStatus: null, // 产品状态
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
    prop: 'productCode',
    label: '产品编号',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'productName',
    label: '产品名称',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'processRoute',
    label: '工艺路线',
    minWidth: '180px',
  }, {
    prop: 'productUnit',
    label: '单位',
    minWidth: '180px',
  }, {
    prop: 'stockroomName',
    label: '所在仓库',
    minWidth: '180px',
  }, {
    prop: 'businessScope',
    label: '业务范围',
    minWidth: '180px',
  }, {
    prop: 'productType',
    label: '产品分类',
    minWidth: '180px',
  }, {
    prop: 'productStatus',
    label: '产品状态',
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
  const DATA = getStorageItem('baseProduct')
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
