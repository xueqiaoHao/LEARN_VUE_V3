<template>
  <el-row type="flex" justify="center">
    <el-form
      autocomplete="on"
      ref="loginForm"
      :model="user"
      :rules="rules"
      status-icon
      label-width="80px"
    >
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="user.name" autocomplete="on" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          @keyup.enter.native="handleLogin"
          v-model="user.pass"
          autocomplete="on"
          placeholder="请输入密码"
        ></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-upload" @click.native.prevent="handleLogin" style="width: 200px">登录</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>
<script>
export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value == null || value === '') {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value == null || value === '') {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      user: {
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur', validator: validateUsername }
        ],
        pass: [
          { required: true, message: '密码不能为空', trigger: 'blur', validator: validatePass }
        ]
      }
    }
  },
  methods: {
    showPwd () {
      if (this.password === 'password') {
        this.password = ''
      } else {
        this.password = 'password'
      }
    },
    handleLogin () {
      console.log('execute')
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log('push')
          this.loading = true
          console.log('push to base')
          this.$router.push({path: '/base'})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
  // to_url () {
  //   this.$router.push('/login')
  // }
}
</script>
<style>
</style>
