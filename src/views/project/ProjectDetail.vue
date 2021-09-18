<template>
  <div>
    <el-drawer :title="detailConfig.title" :visible.sync="detailDrawer.showDrawer" direction="rtl" size="40%" @open="loadData">
      <el-tabs :value="Object.keys(detailConfig.tab_fields[0])[0]">
        <el-tab-pane v-for="(tab, tab_key) of detailConfig.tab_fields" :key="tab_key" :label="Object.keys(tab)[0]" :name="Object.keys(tab)[0]">
          <el-descriptions v-for="(value, key) of Object.values(tab)[0]" :key="key" :title="Object.keys(value)[0]" direction="horizontal" :column="2" label-class-name="description-label">
            <el-descriptions-item v-for="(v, k) of Object.values(value)[0]" :key="k" :label="label(v)">{{ detailData[v] }}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>
<script>
import { Detail, Options } from '@/api/common'

export default {
  name: 'ProjectDetail',
  props: {
    detailDrawer: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      FieldMeta: {}, // 字段元数据
      detailConfig: {
        'title': '项目详情',
        'url': '/project/projects/{id}/',
        'tab_fields': [
          {
            'Tab_1': [
              { '基础信息': ['name', 'code', 'org_name', 'leader', 'status_label'] },
              { '高级': ['create_by', 'update_by', 'create_time', 'update_time', 'online_time', 'offline_time', 'comment'] }
            ]
          },
          {
            'Tab_2': [
              { '基础信息123': ['name', 'code', 'org_name'] },
              { '高级123': ['create_by', 'update_by', 'create_time', 'update_time', 'online_time'] }
            ]
          }
        ]
      },
      detailData: {}
    }
  },
  computed: {
    // 表头
    label: function() {
      return function(column) {
        return this.FieldMeta[column] ? this.FieldMeta[column]['label'] : ''
      }
    }
  },
  methods: {
    loadData() {
      const url = this.detailConfig.url.format({ id: this.detailDrawer.id })
      Options(url).then(response => {
        this.FieldMeta = response.data.actions.GET
      })
      Detail(url).then(response => {
        this.detailData = response.data
      })
    }
  }
}

</script>
<style>
/*drawer标题样式*/
.el-drawer__header {
  background-color: #f1f1f1;
  border-bottom: 1px solid #dbdbdb;
  padding: 15px;
  margin: 0;
}
/*drawer body样式*/
/*.el-drawer__body {*/
/*  padding: 0 30px 30px 30px;*/
/*}*/

/*tab样式*/
.el-tabs__header {
  background-color: #f1f1f1;
}
.el-tabs__content{
  margin: 20px;
}

/*description样式*/
.el-descriptions {
  margin-bottom: 20px;
}
/*description标题样式*/
.el-descriptions__header{
  border-bottom: 1px solid #dbdbdb;
}
.el-descriptions__title{
  font-weight: bold;
  font-size: 15px
}
.description-label {
  font-weight: bold;
}

</style>
