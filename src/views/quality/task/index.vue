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
        <el-form-item label="任务编号" prop="taskCode">
          <el-input
            v-model="query.taskCode"
            placeholder="请输入任务编号"
          />
        </el-form-item>
        <el-form-item label="质检方案" prop="schemeName">
          <el-input
            v-model="query.schemeName"
            placeholder="请输入质检方案名称"
          />
        </el-form-item>
        <el-form-item label="质检状态" prop="inspectionStatus">
          <el-select
            v-model="query.inspectionStatus"
            placeholder="请选择状态"
            clearable
          >
            <el-option value="0" label="未开始"></el-option>
            <el-option value="1" label="执行中"></el-option>
            <el-option value="2" label="已完成"></el-option>
            <el-option value="3" label="已暂停"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <!-- 表单折叠项 -->
      <template #FoldedItems="{ query }">
        <el-form-item label="检验结果" prop="inspectionResult">
          <el-select
            v-model="query.inspectionResult"
            placeholder="请选择检验结果"
            clearable
          >
            <el-option value="1" label="合格"></el-option>
            <el-option value="0" label="不合格"></el-option>
          </el-select>
        </el-form-item>
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
        <el-form-item label="产品编号" prop="productCode">
          <el-input
            v-model="query.productCode"
            placeholder="请输入产品编号"
          />
        </el-form-item>
        <el-form-item label="质检开始时间" prop="inspectionStartTimeArr">
          <el-date-picker
            v-model="query.inspectionStartTimeArr"
            type="daterange"
            value-format="YYYY-MM-DD"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="质检结束时间" prop="inspectionEndDateArr">
          <el-date-picker
            v-model="query.inspectionEndDateArr"
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
          添加质检任务
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
      <el-table-column label="操作" width="180" fixed="right">
        <template v-slot="{ row }">
          <el-button type="primary" link @click="handleDetail('edit', row)">录入数据</el-button>
          <el-button type="primary" link @click="handleDetail('detail', row)">查看数据</el-button>
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
  inspectionStartTimeArr: [], // 质检开始时间
  inspectionEndDateArr: [], // 质检结束时间
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
    prop: 'taskCode',
    label: '任务编号',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'status',
    label: '任务状态',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'status',
    label: '任务状态',
    minWidth: '180px',
  }, {
    prop: 'inspectionStatus',
    label: '质检状态',
    minWidth: '180px',
  }, {
    prop: 'schemeName',
    label: '质检方案',
    minWidth: '180px',
  }, {
    prop: 'inspectionType',
    label: '检验类型',
    minWidth: '180px',
  }, {
    prop: 'inspectionResult',
    label: '检验结果',
    minWidth: '180px',
  }, {
    prop: 'inspectionStartTime',
    label: '质检开始时间',
    minWidth: '180px',
  }, {
    prop: 'inspectionEndTime',
    label: '质检结束时间',
    minWidth: '180px',
  }, {
    prop: 'productCode',
    label: '产品编号',
    minWidth: '180px',
  }, {
    prop: 'productName',
    label: '产品名称',
    minWidth: '180px',
  }, {
    prop: 'productType',
    label: '产品分类',
    minWidth: '180px',
  }, {
    prop: 'productSpecification',
    label: '产品规格',
    minWidth: '180px',
  }, {
    prop: 'productUnit',
    label: '单位',
    minWidth: '180px',
  }, {
    prop: 'productionCode',
    label: '工单编号',
    minWidth: '180px',
  }, {
    prop: 'processCode',
    label: '工序编号',
    minWidth: '180px',
  }, {
    prop: 'processName',
    label: '工序名称',
    minWidth: '180px',
  },
])
// 表格数据
const tableData = ref([
  {
    taskCode: 'SCHE1001',
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
</script>

<style lang="scss" scoped>
@import '@/styles/common/TableView.common.scss';
</style>
