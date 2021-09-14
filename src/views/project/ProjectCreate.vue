<template>
  <div class="app-container">
<!--    <div class="el-container">-->
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" size="small" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="标识" prop="code">
          <el-input v-model="ruleForm.code" />
        </el-form-item>
        <el-form-item label="组织" prop="org_id">
          <el-input v-model="ruleForm.org_id" />
        </el-form-item>
        <el-form-item label="负责人" prop="leader">
          <el-input v-model="ruleForm.leader" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择状态">
            <el-option label="待上线" value="ONLINE" />
            <el-option label="运行中" value="RUNNING" />
            <el-option label="待下架" value="OFFLINE" />
            <el-option label="已归档" value="ARCHIVED" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="ruleForm.comment" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
        </el-form-item>
      </el-form>
<!--    </div>-->
  </div>
</template>
<script>
import { Create, List } from '@/api/common'

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        code: '',
        org_id: '',
        leader: '',
        status: '',
        comment: ''
      },
      rules: {
        name: [
          { required: true, message: '这个字段时必填项', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '这个字段时必填项', trigger: 'blur' }
        ],
        org_id: [
          { required: true, message: '这个字段时必填项', trigger: 'blur' }
        ],
        leader: [
          { required: true, message: '这个字段时必填项', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '这个字段时必填项', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const url = '/project/projects/'
          Create(url, this.ruleForm).then(response => {
            alert('创建成功')
          }).catch(error => {
              alert(Object.values(error.response.data))

            })
        }
        else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style>
  .demo-ruleForm {
    background-color: white;
    padding: 20px;
  }
</style>
