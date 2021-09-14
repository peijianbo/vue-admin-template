<template>
  <GenericListPage :table-config="tableConfig" />
</template>

<script>
import { GenericListPage } from '@/layout/components'

export default {
  name: 'ActionRecord',
  components: {
    GenericListPage
  },
  data() {
    return {
      tableConfig: {
        url: '/record/records/',
        columns: [
          'username', 'object_id', 'object_repr', 'address',
          'action_label', 'action_time', 'comment'
        ]
      }
    }
  }
}
</script>
