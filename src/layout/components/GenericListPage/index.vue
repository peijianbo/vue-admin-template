<template>
  <div>
    <div>
      <el-table ref="multipleTable" class="itable" :data="tableData" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange" @sort-change="changeTableSort">
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="(value, key) of tableConfig.columns" :key="key" :prop="value" :label="label(value)" sortable />
        <el-table-column v-if="tableConfig.Actions" label="操作">
          <template slot-scope="scope">
            <el-button v-for="(value, key) of tableConfig.Actions" :key="key" size="mini" :type="value.type" @click="value.actionMethod(scope.$index, scope.row)">{{ value.label }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :current-page.sync="paginatorConfig.currentPage"
        :page-sizes="paginatorConfig.pageSizes"
        :page-size="paginatorConfig.pageSize"
        :total="paginatorConfig.Total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { List, Options } from '@/api/common'

export default {
  name: 'GenericListPage',
  props: {
    tableConfig: {
      type: Object,
      default: () => ({})
    },
    paginatorConfig: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        Total: 0
      })
    }
  },
  data() {
    return {
      MetaData: {},
      tableData: [],
      orderFields: [], // TODO 动态排序字段
      multipleSelection: []
    }
  },

  computed: {
    label: function() {
      return function(column) {
        return this.MetaData[column] ? this.MetaData[column]['label'] : ''
      }
    }
  },

  created() {
    Options(this.tableConfig.url).then(response => {
      this.MetaData = response.data.actions.GET
      this.orderFields = response.data.actions.GET.order_fields
    })
    List(this.tableConfig.url, { 'offset': 0, 'limit': this.paginatorConfig.pageSize }).then(response => {
      this.tableData = response.data.results
      this.paginatorConfig.Total = response.data.count
    })
  },

  methods: {
    // 可实现后端排序
    changeTableSort(column) {
      return
      // const fieldName = column.prop
      // const sortingType = column.order
      // const params = { 'limit': this.Paginator.pageSize, 'offset': this.Paginator.pageSize * (this.Paginator.currentPage - 1) }
      // if (sortingType === 'descending') {
      //   params.ordering = '-' + fieldName
      // } else {
      //   params.ordering = fieldName
      // }
      // List(this.tableConfig.url, params).then(response => {
      //   this.tableData = response.data.results
      // })
    },

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 分页器自带方法：修改每页显示条数
    handleSizeChange(val) {
      const params = { 'limit': val, 'offset': this.paginatorConfig.pageSize * (this.paginatorConfig.currentPage - 1) }
      List(this.tableConfig.url, params).then(response => {
        this.tableData = response.data.results
      })
      this.paginatorConfig.pageSize = val
    },

    // 分页器自带方法：查看第几页
    handleCurrentChange(val) {
      const params = { 'limit': this.paginatorConfig.pageSize, 'offset': this.paginatorConfig.pageSize * (val - 1) }
      List(this.tableConfig.url, params).then(response => {
        this.tableData = response.data.results
      })
      this.paginatorConfig.currentPage = val
    }
  }
}
</script>
<style>
  .itable {
    margin-top: 10px;
  }
  .el-pagination {
    text-align: center;
  }
</style>
