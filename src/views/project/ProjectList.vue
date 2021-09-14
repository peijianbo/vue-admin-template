<template>
  <div class="app-container">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="项目列表" name="projectList">
        <router-link :to="{name: 'ProjectCreate'}">
          <el-row>
            <el-button type="primary" size="mini">创建</el-button>
          </el-row>
        </router-link>
        <GenericListPage :table-config="tableConfig" :paginator-config.sync="paginatorConfig" />
      </el-tab-pane>
      <el-tab-pane label="操作日志" name="actionRecord">
        <ActionRecord />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { GenericListPage } from '@/layout/components'
import ActionRecord from '@/views/project/ActionRecord'
import { Patch } from '@/api/common'

export default {
  components: {
    ActionRecord,
    GenericListPage
  },
  data() {
    return {
      tableConfig: {
        url: '/project/projects/?is_archived=false',
        columns: [
          'name', 'code', 'org_name', 'leader', 'status_label', 'is_archived', 'comment'
        ],
        Actions: [
          { 'label': '归档', 'type': 'primary', 'actionMethod': this.archiveProject },
          { 'label': '删除', 'type': 'danger', 'actionMethod': this.deleteProject }
        ]
      },
      paginatorConfig: {
        currentPage: 1,
        pageSizes: [2, 4, 20, 50, 100, 200],
        pageSize: 2,
        Total: 0
      },
      activeTab: 'projectList'
    }
  },
  methods: {
    archiveProject(index, row) {
      const url = this.tableConfig.url + row.id + '/'
      const data = { 'is_archived': 'sdf' }
      Patch(url, data).then(response => {
        alert(response)
      })
    },
    deleteProject(index, row) {
      alert(456)
    }
  }
}
</script>
