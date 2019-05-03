<template>
<div>
    <el-container id="all">
      <el-header>
        <Header/>
      </el-header>
      <el-container>
        <el-aside>
          <Aside/>
        </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer> <div class="layout-copy">2015-2019 &copy; haohaohao</div></el-footer>
        </el-container>
      </el-container>
    </el-container>
</div>
</template>

<script>
import Header from '@/components/part/Header'
import Aside from '@/components/part/Aside'
export default {
  name: 'Main',
  components: {
    Header, Aside
  },
  methods: {

  }
}
//
</script>
<style>
#all{
  height: 100%;
}
.el-header {
   background-color: rgb(179, 209, 188);
    color: rgb(51, 51, 51);
    line-height: 60px;
}
.el-aside {
  width: 100px;
  line-height: 500px;
  background-color:powderblue
}
.el-main{
  background-color:white
}
.el-footer {
  height: 50px;
  background-color:whitesmoke
}
.layout-copy {
  height: 4%;
  text-align: center;
  padding: 10px 0 20px;
  color: #009688;
}
</style>
