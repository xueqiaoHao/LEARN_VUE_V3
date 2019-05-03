<template>
<div>
  <el-menu
    :default-active="this.$route.path"
    background-color="#B0E0E6"
    class="el-menu-vertical-demo"
    @select="handleSelectPath"
    text-color="#AAAAAA"
    active-text-color="#BBFF00"
  >
    <el-submenu
      v-for="pmenu in menuList"
      :name="pmenu.id"
      :key="pmenu.id"
      :index="pmenu.id.toString()"
      background-color="#545c64"
    >
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
      // 折叠菜单
      isCollapse: true
    }
  },
  mounted () {
    // this.userName = window.sessionStorage.getItem('currentUserAccount')
    // console.log('账户' + this.userName)
    this.getMenuList()
  },
  methods: {
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
    handleSelectPath (key) {
      console.log('选中菜单')
      this.$router.push(key)
    }
  }
}
</script>
<style>
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  } */
</style>
