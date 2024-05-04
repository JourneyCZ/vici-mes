<template>
  <div class="query-form-container">
    <!-- 查询表单 -->
    <el-form
      ref="QueryFormRef"
      class="query-form"
      :model="query"
      :label-width="labelWidth"
    >
      <!-- 表单项 -->
      <div class="query-form-items">
        <slot name="FormItems" :query="query"></slot>
        <!-- 折叠表单项 -->
        <div class="query-form-fold-items" v-show="!folded">
          <slot name="FoldedItems" :query="query"></slot>
        </div>
      </div>
      <!-- 表单按钮 -->
      <div class="query-form-buttons">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </el-form>
    <!-- 表单-折叠操作栏 -->
    <div class="query-form-handle">
      <el-icon
        class="query-form-fold-icon"
        @click="folded = !folded"
      >
        <ArrowDown v-if="folded" />
        <ArrowUp v-else />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const { query } = defineProps({
  query: {
    type: Object,
    default () {
      return {}
    }
  },
  labelWidth: {
    type: String,
    default: 'auto'
  }
})
const emits = defineEmits('search', 'reset')

// 表单折叠
const folded = ref(true)

// 表单搜索
function search () {
  emits('search', query)
}

// 表单重置
const QueryFormRef = ref()
function reset () {
  QueryFormRef.value?.resetFields()
  emits('reset', query)
}
</script>

<style lang="scss" scoped>
@include themeMixin {
  .query-form-container {
    display: flex;
    flex-direction: column;

    // 查询表单
    :deep(.query-form) {
      display: flex;
      width: 100%;

      // 表单项
      &>.query-form-items,
      .query-form-fold-items {
        flex: auto;
        display: flex;
        flex-wrap: wrap;

        .el-form-item {
          flex: 1 1 30%;
          max-width: calc(33.33% - 10px);
          margin: 0 10px 10px 0;

          .el-form-item__label {
            font-weight: 600;
            color: theme('colorTextBase');
          }

          .el-input,
          .el-select,
          .el-input-number,
          .el-cascader {
            flex: auto;
          }

          .query-form-separator {
            flex: none;
            text-align: center;
            padding: 0 10px;
          }
        }
      }

      // 表单按钮
      .query-form-buttons {
        flex: none;
      }
    }

    // 查询表单-操作栏
    .query-form-handle {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 10px;

      &::before,
      &::after {
        flex: auto;
        content: '';
        border-top: 1px solid #dcdfe6;
      }

      .query-form-fold-icon {
        width: 18px;
        height: 18px;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        color: theme('colorPrimary');
        border: 1px solid theme('colorPrimary');
        border-radius: 9px;
        margin: 0 10px;
        cursor: pointer;

        &:hover {
          color: #fff;
          background-color: theme('colorPrimary');
        }
      }
    }

  }
}
</style>
