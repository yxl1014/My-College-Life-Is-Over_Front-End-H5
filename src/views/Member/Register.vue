<template>
  <div style="width:800px">
    <h1>表单</h1>
    <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" ></el-input>
      </el-form-item>

<!--      <el-form-item label="密码" prop="password">-->
<!--        <el-input type="password" v-model="form.password"></el-input>-->
<!--      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      state:false,
      // 定义规则
      rules: {
        "username": [
          {required: true, message: '请输入用户名', trigger: 'change'}
        ],
        "password":[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度为6-8位', trigger: 'blur' },
          {
            validator(_, value, callback){
              // rule：采用的规则
              // value: 被校验的值
              // callback是回调函数，
              //      如果通过了规则检验，就直接调用callback()
              //      如果没有通过规则检验，就调用callback(错误对象，在错误对象中说明原因)
              //         例如：callback(new Error('错误说明'))
              if(value === '123456'){
                callback(new Error('密码不能为123456'))
              } else{
                callback()
              }
              // console.log(rule, value, callback)
            },
            trigger:"blur"
          }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      // 手动兜底校验
      // console.log(this.$refs.form)
      // this.$refs.form.validate会让表单自动校验一次
      // valid就会自动接收校验的结果
      // this.$refs.form.validate(valid => {
      //   console.log(valid)
      //   // valid: true，false
      //   // 为false: 表单上会有提示信息
      //   // 如果是true,就可以进一步发ajax做登录
      // })
    }
  }
}
</script>