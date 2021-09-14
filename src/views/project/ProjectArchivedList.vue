<template>
  <div class="app-container">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="项目列表" name="projectList">
        <GenericListPage :table-config="tableConfig" />
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

export default {
  components: {
    ActionRecord,
    GenericListPage
  },
  data() {
    return {
      tableConfig: {
        url: '/project/projects/?is_archived=true',
        columns: [
          'name', 'code', 'org_name', 'leader', 'status_label', 'is_archived', 'archived_time', 'comment'
        ]
      },
      activeTab: 'projectList'
    }
  }
}
</script>
