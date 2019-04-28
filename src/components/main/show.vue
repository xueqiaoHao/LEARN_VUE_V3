<template>
  <el-container>
    <el-header>
      <div>
        <a>进入系统</a>
      </div>
    </el-header>
    <el-main>
      <div class="block">
        <el-carousel height="300px'">
          <el-carousel-item v-for="item in imagesbox" :key="item">
            <img ref="bannerHeight" :src="item.url" class="image" @load="imgLoad">
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-main>
    <el-footer>
      <div>
        <a href="http://www.hebust.edu.cn/">
          <img border="0" src="@/websetLogo/LoginLogo.png">
        </a>
        <a href="https://jobs.51job.com/">
          <img border="0" src="@/websetLogo/qianchengwuyou.png">
        </a>
        <a href="https://www.lagou.com/">
          <img border="0" src="@/websetLogo/lagou.png">
        </a>
        <a href="https://www.zhipin.com/">
          <img border="0" src="@/websetLogo/boss.jpg">
        </a>
        <a href="https://www.zhaopin.com/">
          <img border="0" src="@/websetLogo/zhilian.jpg">
        </a>
      </div>
    </el-footer>
  </el-container>
  <!-- 下面放科大的官网和几个牛逼公司的官网链接，+招聘市场的链接 -->
</template>
<script>
export default {
  data () {
    return {
      bannerHeight: '',
      imagesbox: [{ id: 0, url: require('../../websetLogo/LoginLogo.png') },
        { id: 1, url: require('@/websetLogo/qianchengwuyou.png') },
        { id: 2, url: require('@/websetLogo/qianchengwuyou.png') }]
    }
  },
  methods: {
    imgLoad () {
      this.$nextTick(() => {
        this.bannerHeight = this.$refs.bannerHeight[0].height
        console.log(this.$refs.bannerHeight[0].height)
      })
    }
  },
  mounted () {
    this.imgLoad()
    window.addEventListener('resize', () => {
      this.bannerHeight = this.$refs.bannerHeight[0].height
      this.imgLoad()
    }, false)
  }
}
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
a {
  text-align: right;
}
img {
  width: 150px;
  height: 60px;
}
</style>
