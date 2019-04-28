<style lang="scss" >
.el-icon-caret-bottom {
  position: absolute;
  right: -20px;
  top: 25px;
  font-size: 12px;
}
.layout {
  border: 1px solid #d7dde4;
  background: #e9eaec;
  /*position: relative;*/
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.layout-breadcrumb {
  padding: 10px 15px 0;
}
.layout-content {
  /*height: 80%;*/
  /*min-height: 100%;*/
  min-height: 200px;
  margin: 15px;
  overflow: hidden;
  background: #f8f8f9;
  border-radius: 4px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-content-main {
  padding: 10px;
}
.layout-copy {
  height: 4%;
  text-align: center;
  padding: 10px 0 20px;
  color: #009688;
}
.layout-menu-left {
  background: #464c5b;
}
.layout-header {
  height: 60px;
  background: #f8f8f9;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  text-align: right;
}
.layout-header img {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  margin-top: 10px;
  /*margin-right: 50px;*/
}
.layout-header strong {
  color: #ff5722;
  font-size: 10px;
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  /*background: #5b6270;*/
  border-radius: 3px;
  margin: 15px auto;
}
.layout-logo-left img {
  width: 20%;
  height: 100%;
}
.layout-logo-left strong {
  color: #00bcd4;
  font-size: 10px;
}
.dropdown-menu {
  text-align: center;
  /*box-shadow: 0 1px 6px #00BCD4;*/
}
.el-menu-vertical-demo {
  height: 100%;
  /* position: absolute; */
  bottom: 0;
}
.avatar-container {
  height: 50px;
  margin-right: 30px;
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 5px;
    position: relative;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
#logout {
  color: #ff5722;
}
#back {
  color: #009688;
}
#sysName{
  font-size: 17px;
  color: #00bcd4
}
#sysImage{
  width: 25px;
  height: 25px;
}
</style>
<template>
  <div class="layout">
    <el-row class="tac">
      <el-col :span="4">
        <div class="layout-logo-left">
          <img src="@/assets/score.jpg" id="sysImage">
          <a id="sysName">就业信息管理平台</a>
        </div>
        <el-menu
          :default-active="this.$route.path"
          background-color="#DCDFE6"
          class="el-menu-vertical-demo"
          @select="handleSelectPath"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu v-for="pmenu in menuList" :name="pmenu.id" :key="pmenu.id" :index="pmenu.id.toString()" background-color="#545c64">
            <template slot="title">
              <i class="el-icon-menu"></i>
              {{pmenu.name}}
            </template>
            <el-menu-item
              v-for="cmenu in pmenu.children"
              :name="cmenu.id"
              :key="cmenu.id"
              :index="cmenu.href"
            >{{cmenu.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div class="layout-header">
          <el-dropdown split-button type="primary"  size="medium">
            {{this.userName}}
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goHome"><a id="back">回到首页</a></el-dropdown-item>
              <el-dropdown-item @click.native="loginOut"><a id="logout">退出登录</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="layout-breadcrumb">
          <!-- <el-button type="text" @click="goHome">Home</el-button> -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/base' }">home</el-breadcrumb-item>
            <!-- <el-breadcrumb-item :to="{ path: '/ResumeReport' }">活动管理</el-breadcrumb-item> -->
          </el-breadcrumb>
        </div>
        <div class="layout-content">
          <router-view></router-view>
        </div>
        <div class="layout-copy">2015-2019 &copy; haohaohao</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userName: '',
      // 一级菜单
      menuList: [],
      /* 二级菜单 */
      menuSub: [],
      /* 面包屑data */
      breadcrumbData: []
    }
  },
  components: {
  },
  mounted () {
    // this.userName = window.sessionStorage.getItem('currentUserAccount')
    // console.log('账户' + this.userName)
    this.getUserName()
    this.getMenuList()
  },
  methods: {
    /* 下拉菜单选择事件 */
    dropdownSelect (e) {
      this.$router.push({ path: '/login' })
    },
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
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，无法获得用户名')
        })
    },
    // 2、 通过用户名去哪菜单列表
    getMenuList () {
      var account = sessionStorage.getItem('currentUserAccount')
      var url = this.HOST + '/user/curUserMenuList'
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
          this.menuList = response.data.data
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，不能获取菜单列表')
        })
    },
    // 菜单点击触发右侧内容更改
    handleSelectPath (key) {
      console.log('选中菜单')
      // var filterMenus = this.menuSub.filter(
      //   function (menu) {
      //     return (menu.href !== null && menu.href !== '' && menu.id === key)
      //   }
      // )
      this.$router.push(key)
    }
  }
}
</script>
