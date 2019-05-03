<template>
  <el-row class="tac">
    <el-col :span="4" id="sysName">
      <div class="layout-logo-left">
        <img src="@/assets/score.jpg" id="sysImage">
        <a id="sysName">就业信息管理平台</a>
      </div>
    </el-col>
    <el-col :span="3" id="sysOperate">
      <div class="layout-header">
        <el-dropdown split-button type="primary" size="medium">
          {{this.userName}}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="goHome">
              <a id="back">回到首页</a>
            </el-dropdown-item>
            <el-dropdown-item @click.native="loginOut">
              <a id="logout">退出登录</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      userName: ''
    }
  },
  mounted () {
    // this.userName = window.sessionStorage.getItem('currentUserAccount')
    // console.log('账户' + this.userName)
    this.getUserName()
  },
  methods: {
    goHome () {
      console.log('goHome')
      this.$router.push({ path: '/welcome' })
    },
    loginOut () {
      this.$router.push('/')
    },
    // 1、通过账号拿用户名
    getUserName () {
      var account = sessionStorage.getItem('currentUserAccount')
      // console.log('当前登录的账号: ' + account)
      var url = this.HOST + '/user/curUserName'
      var params = {
        'loginAccount': account
      }
      this.$http.post(url, params,
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        // then获取成功；response成功后的返回值（对象）
        .then(response => {
          this.userName = response.data.data
          console.log('userName:' + this.userName)
          if (this.userName !== 'admin') {
            sessionStorage.setItem('currentUserName', this.userName)
          }
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，无法获得用户名')
        })
    }
  }
}
</script>
<style>
#sysImage {
  width: 25px;
  height: 25px;
}
#sysName {
  float: left;
}
#sysOperate {
  float: right;
}
</style>
