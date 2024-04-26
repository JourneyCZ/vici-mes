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
        <el-form-item label="工单编号" prop="productionCode">
          <el-input
            v-model="query.productionCode"
            placeholder="请输入工单编号"
          />
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input
            v-model="query.productName"
            placeholder="请输入产品名称"
          />
        </el-form-item>
        <el-form-item label="工序名称" prop="processName">
          <el-input
            v-model="query.processName"
            placeholder="请输入工序名称"
          />
        </el-form-item>
      </template>
      <!-- 表单折叠项 -->
      <template #FoldedItems="{ query }">
        <el-form-item label="计划编号" prop="planCode">
          <el-input
            v-model="query.planCode"
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
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="query.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option value="0" label="未创建"></el-option>
            <el-option value="1" label="未开始"></el-option>
            <el-option value="2" label="执行中"></el-option>
            <el-option value="3" label="已完成"></el-option>
            <el-option value="4" label="已暂停"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </QueryForm>

    <!-- 数据表格-操作栏 -->
    <div class="data-table-handle">
      <div class="data-table-handle-left">
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
      <el-table-column label="操作" width="460" fixed="right">
        <template v-slot="{ row }">
          <el-button type="primary" link @click="handleDetail('edit', row)">开始</el-button>
          <el-button type="primary" link @click="handleDetail('edit', row)">暂停</el-button>
          <el-button type="primary" link @click="handleDetail('edit', row)">完成</el-button>
          <el-button type="primary" link @click="handleDetail('edit', row)">报修</el-button>
          <el-button type="primary" link @click="handleDetail('edit', row)">报工</el-button>
          <el-button type="primary" link @click="handleDetail('edit', row)">查看</el-button>
          <el-button type="primary" link @click="handleDetail('edit', row)">换班</el-button>
          <el-button type="primary" link @click="handleDetail('edit', row)">换班记录</el-button>
          <el-button type="primary" link @click="handleDetail('edit', row)">拆分</el-button>
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
  productionCode: null, // 工单编号
  productName: null, // 产品名称
  processName: null, // 工序名称
  planCode: null, // 计划编号
  planStartTimeArr: [], // 计划开始时间
  planEndTimeArr: [], // 计划结束时间
  status: null, // 状态
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
    prop: 'productionCode',
    label: '工单编号',
    minWidth: '180px',
    fixed: 'left',
  }, {
    prop: 'planCode',
    label: '计划编号',
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
    prop: 'productSpecification',
    label: '产品规格',
    minWidth: '180px',
  }, {
    prop: 'productUnit',
    label: '产品单位',
    minWidth: '180px',
  }, {
    prop: 'processCode',
    label: '工序编号',
    minWidth: '180px',
  }, {
    prop: 'processName',
    label: '工序名称',
    minWidth: '180px',
  }, {
    prop: 'processStatus',
    label: '工序状态',
    minWidth: '180px',
  }, {
    prop: 'reportPermission',
    label: '报工权限',
    minWidth: '180px',
  }, {
    prop: 'assignList',
    label: '分配列表',
    minWidth: '180px',
  }, {
    prop: 'equipmentGroup',
    label: '设备组',
    minWidth: '180px',
  }, {
    prop: 'reportRatio',
    label: '报工数配比',
    minWidth: '180px',
  }, {
    prop: 'planQuantity',
    label: '计划数量',
    minWidth: '180px',
  }, {
    prop: 'productionQuantity',
    label: '生产数量',
    minWidth: '180px',
  }, {
    prop: 'goodProductQuantity',
    label: '良品数量',
    minWidth: '180px',
  }, {
    prop: 'defectiveProductQuantity',
    label: '不良品数量',
    minWidth: '180px',
  }, {
    prop: 'process',
    label: '进度',
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
  },
])
// 表格数据
const tableData = ref([
  {
    productionCode: 'PROD1001',
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
