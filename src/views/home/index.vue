<template>
  <div class="view-container">
    <div class="view-item">
      <div class="chart-container" ref="SaleOrderChartRef"></div>
    </div>
    <div class="view-item">
      <div class="chart-container" ref="ProductionOrderChartRef"></div>
    </div>
    <div class="view-item">
      <div class="chart-container" ref="ProductionReportChartRef"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import moment from 'moment'

onMounted(() => {
  initSaleOrderChart()
  initProductionOrderChart()
  initProductionReportChart()
})

// 最近七天日期数据
const dateList = ref([
  moment().subtract(6, 'days').format('MM-DD'),
  moment().subtract(5, 'days').format('MM-DD'),
  moment().subtract(4, 'days').format('MM-DD'),
  moment().subtract(3, 'days').format('MM-DD'),
  moment().subtract(2, 'days').format('MM-DD'),
  moment().subtract(1, 'days').format('MM-DD'),
  moment().format('MM-DD')
])

// 销售订单图表
const SaleOrderChartRef = ref()
let SaleOrderChart = null
function initSaleOrderChart () {
  SaleOrderChart = initChart(SaleOrderChartRef.value)
  SaleOrderChart.setOption({
    color: ['#67C23A', '#409EFF', '#0FCED3'],
    title: {
      text: '销售订单统计',
    },
    legend: {
      data: ['已完成订单数', '生产中订单数', '新增订单数']
    },
    xAxis: {
      data: dateList.value
    },
    series: [
      {
        type: 'bar',
        stack: 'order',
        barMaxWidth: 60,
        name: '已完成订单数',
        data: [20, 22, 18, 14, 22, 30, 18]
      },
      {
        type: 'bar',
        stack: 'order',
        barMaxWidth: 60,
        name: '生产中订单数',
        data: [20, 16, 12, 14, 22, 30, 18]
      },
      {
        type: 'bar',
        stack: 'order',
        barMaxWidth: 60,
        name: '新增订单数',
        data: [22, 19, 16, 22, 25, 14, 23]
      }
    ]
  })
}

// 生产订单图表
const ProductionOrderChartRef = ref()
let ProductionOrderChart = null
const ProductionOrderList = ref(['订单1', '订单2', '订单3', '订单4', '订单5'])
function initProductionOrderChart () {
  ProductionOrderChart = initChart(ProductionOrderChartRef.value)
  ProductionOrderChart.setOption({
    color: ['#409EFF', '#E5EAF3'],
    title: {
      text: '生产订单进度',
    },
    legend: {
      data: ['进度']
    },
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: ProductionOrderList.value
    },
    series: [
      {
        type: 'bar',
        stack: 'process',
        barMaxWidth: 50,
        name: '进度',
        data: [96, 88, 82, 80, 76]
      },
      {
        type: 'bar',
        stack: 'process',
        barMaxWidth: 50,
        name: '待完成进度',
        data: [4, 12, 18, 20, 24]
      }
    ]
  })
}

// 生产报工图表
const ProductionReportChartRef = ref()
let ProductionReportChart = null
function initProductionReportChart () {
  ProductionReportChart = initChart(ProductionReportChartRef.value)
  ProductionReportChart.setOption({
    color: ['#67C23A', '#409EFF', '#0FCED3'],
    title: {
      text: '生产报工统计',
    },
    legend: {
      data: ['报工数']
    },
    xAxis: {
      data: dateList.value
    },
    series: [
      {
        type: 'line',
        smooth: true,
        barMaxWidth: 60,
        name: '报工数',
        data: [56, 60, 58, 62, 60, 56, 60]
      }
    ]
  })
}

// 图表-初始化
function initChart (ref) {
  const chart = echarts.init(ref)
  chart.setOption({
    title: {
      top: 10,
      left: 20
    },
    legend: {
      top: 10,
      right: 20,
      data: []
    },
    grid: {
      top: 60,
      bottom: 20,
      left: 20,
      right: 20,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      type: 'value'
    },
    series: []
  })
  return chart
}

// 自适应大小
window.onresize = function () {
  SaleOrderChart?.resize()
  ProductionOrderChart?.resize()
  ProductionReportChart?.resize()
}
</script>

<style lang="scss" scoped>
.view-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;

  .view-item {
    flex: auto;
    width: 25%;
    height: 50%;
    background-color: rgba($color: #fff, $alpha: 0.6);
    border-radius: 5px;
    box-shadow: 2px 2px 10px 3px #eee;
    margin: 0 20px 20px 0;

    .chart-container {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
