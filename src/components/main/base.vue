<style>
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
</style>
<template>
  <div class="layout">
    <!-- <img src="@/assets/logo.png"> -->
    <el-row class="tac">
      <el-col :span="4">
        <div class="layout-logo-left">
          <img src="@/assets/logopic.png">
          <strong>信息管理平台</strong>
        </div>
        <!-- <h5>自定义颜色</h5> -->
        <el-menu
          default-active="2"
          background-color="#87CEFA"
          class="el-menu-vertical-demo"
          @select="handleSelectPath"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>简历信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">查看学生简历</el-menu-item>
              <el-menu-item index="1-2">发布简历</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>招聘信息</span>
            </template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="2-1">查看招聘信息</el-menu-item>
              <el-menu-item index="2-2">发布招聘信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" >
        <div class="layout-header">
          欢迎您
          <!-- <strong>{{userName}}</strong>
          <el-dropdown class="avatar-container right-menu-item" trigger="click">
            <div class="avatar-wrapper">
              欢迎您
              <i class="el-icon-caret-bottom"/>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided>
                <span style="display:block;" @click="logout">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>-->
        </div>

        <div class="layout-breadcrumb">
          <el-button type="text" @click="goHome">Home</el-button>
        </div>
        <!-- <div class="layout-header">
          <navbar></navbar>
        </div>-->
        <div class="layout-content">
          <router-view></router-view>
        </div>
        <div class="layout-copy">2015-2019 &copy; haohaohao</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import resume from '@/components/sys/ResumeReport'
// import navbar from '@/components/part/Navbar'
export default {
  data () {
    return {
      userName: '',
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: '',
      value2: '',
      value3: ''
    }
  },
  components: {
    // resume
    // navbar
  },
  mounted () {
    console.log(window.localStorage)
    this.userName = window.localStorage.getItem('currentUser_name')
  },
  methods: {
    // home返回welcome页面
    goHome () {
      this.$router.push('/welcome')
    },
    /* 下拉菜单选择事件 */
    dropdownSelect (e) {
      this.$router.push({ path: '/login' })
    },
    // 菜单点击触发右侧内容更改
    handleSelectPath (key) {
      switch (key) {
        case '1-1':
          this.$router.push('/ResumeReport')
          break
        case '2-1':
          this.$router.push('/RecruitReport')
          break
        case '2-2':
          this.$router.push('/RecruitPublish')
          break
      }
    }
  }
}
</script>
