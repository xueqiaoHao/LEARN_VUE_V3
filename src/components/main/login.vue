<template>
  <div id="index_pc_bj" class="login">
    <div id="header">
      <h1>
        <strong>河北科技大学就业信息管理平台</strong>
      </h1>
    </div>
    <div id="main">
      <!-- 为了阻止链接在点击时跳转，我们使用了 "prevent" 修饰符 (preventDefault 的简称)。 -->
      <nav v-bind:class="active" v-on:click.prevent>
        <!-- 当菜单上的链接被点击时，我们调用了 makeActive 方法, 该方法在 Vue 实例中创建。 -->
        <a href="#" class="home" v-on:click="makeActive('企业身份')">企业身份</a>
        <a href="#" class="projects" v-on:click="makeActive('学生身份')">学生身份</a>
        <a href="#" class="services" v-on:click="makeActive('系统管理员')">系统管理员</a>
      </nav>
      <p>
        您身份类型为
        <b>{{this.active}}</b>
      </p>
      <!-- 登陆输入框 -->
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
            <el-input type="text" v-model="user.name" autocomplete="on" id="userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              @keyup.enter.native="handleLogin"
              v-model="user.pass"
              show-password
              autocomplete="on"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-d-arrow-right"
              @click.native.prevent="handleLogin"
              :plain="true"
              style="width: 200px"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <div class="footer">
        <ul>
          <li>©2019 信息学院</li>
          <li>通信152郝学峤</li>
        </ul>
      </div>
    </div>
  </div>
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
      active: '请选择',
      user: {
      },
      errorTip: 0,
      activeTip: 0,
      nameTip: 0,
      passTip: 0,
      loginTip: 0,
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
    makeActive: function (item) {
      this.active = item
      console.log(item)
    },

    handleLogin () {
      console.log(this.user.name)
      console.log(this.user.pass)
      if (this.active === '请选择') {
        this.$message({
          showClose: true,
          message: '请选择您的身份再进行登录',
          type: 'warning'
        })
        // alert('请选择您的身份并登陆')
      } else if (this.user.name === '' || this.user.name === undefined) {
        this.$message({
          showClose: true,
          message: '用户名不能为空',
          type: 'warning'
        })
        // alert('请填写完成账号密码信息再进行登陆')
      } else if (this.user.pass === undefined || this.user.pass === '') {
        this.$message({
          showClose: true,
          message: '请填写您的密码并进行登录',
          type: 'warning'
        })
      } else {
        var url = this.HOST + '/user/login'
        var params = {
          'loginAccount': this.user.name, 'password': this.user.pass
        }
        console.log(params)
        this.$http.post(url, params)
          // headers{
          //     'Content-type': 'application/x-www-form-urlencoded'
          // }
          // then获取成功；response成功后的返回值（对象）
          .then(response => {
            console.log('respon' + response)
            var res = response.data.status
            console.log('res' + res)
            if (res === 0) {
              this.loading = true
              this.$message({
                showClose: true,
                message: '登录成功 来啦老弟 !',
                type: 'success'
              })
              console.log('身份类型为' + this.active)
              this.$router.push('/base')
              // localStorage.removeItem('currentUser_name')
              var currentUsername = document.getElementById('userName').value
              sessionStorage.setItem('currentUserAccount', currentUsername)
            } else {
              console.log('errorTip')
              this.errorTip = 1
            }
          })
          // 获取失败
          .catch(error => {
            console.log(error)
            alert('网络错误，不能访问')
          })
        console.log(this.errorTip)
      }
    }
  }
}
</script>
<style>
/* 两个选择身份的位置的样式渲染 */
a,
a:visited {
  outline: none;
  color: #389dc1;
}

a:hover {
  text-decoration: none;
}
section,
footer,
header,
aside,
nav {
  display: block;
}
nav {
  display: inline-block;
  margin: 20px auto 20px;
  background-color: #5597b4;
  box-shadow: 0 1px 1px #ccc;
  border-radius: 2px;
}

nav a {
  display: inline-block;
  padding: 18px 30px;
  color: #fff !important;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none !important;
  line-height: 1;
  text-transform: uppercase;
  background-color: transparent;

  -webkit-transition: background-color 0.25s;
  -moz-transition: background-color 0.25s;
  transition: background-color 0.25s;
}

nav a:first-child {
  border-radius: 2px 0 0 2px;
}

nav a:last-child {
  border-radius: 0 2px 2px 0;
}

nav.home .home,
nav.projects .projects,
nav.services .services,
nav.contact .contact {
  background-color: #e35885;
}
p {
  font-size: 22px;
  font-weight: bold;
  color: #7d9098;
  /* bottom: 20px; */
  margin-top: 10px;
  margin-bottom: 20px;
}

p b {
  color: #ffffff;
  display: inline-block;
  padding: 5px 10px;
  background-color: #c4d7e0;
  border-radius: 2px;
  text-transform: uppercase;
  font-size: 18px;
}
#index_pc_bj {
  width: 100%;
  height: 100%;
  background-size: cover;
  overflow: hidden;
  background-image: url(../../assets/kdeast.jpg);
  background-position: center center;
  box-shadow: 0 0px 3px rgba(0, 0, 0, 0.5);
  text-align: center;
}
.login {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
}
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
}
li {
  list-style-type: none;
}
.loginerror {
  color: #ff0000;
}
</style>
