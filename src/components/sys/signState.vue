<template>
  <div id="all">
    <div id="back" style="margin-top: 20px">
      个人签约情况
      <el-radio v-model="isSign" label="0" border size="medium">尚未签约</el-radio>
      <el-radio v-model="isSign" label="1" border size="medium">我已签约</el-radio>
      <el-button type="success" icon="el-icon-check" circle @click="submit()"></el-button>
      <img src="@/assets/qiqiu.png">
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSign: 3
    }
  },
  mounted: function () {
    this.initStuName()
  },
  methods: {
    initStuName () {
      this.stuName = sessionStorage.getItem('currentUserName')
      console.log('当前用户名' + this.stuName)
    },
    submit () {
      console.log(this.isSign)
      var url = this.HOST + '/resume/setSigned'
      // recruitForm.name = this.comName
      var params = {
        'stuName': this.stuName,
        'isSigned': this.isSign
      }
      this.$http.post(url, params,
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        // then获取成功；response成功后的返回值（对象）
        .then(response => {
          this.$message({
            message: '签约情况更新成功',
            center: true,
            type: 'success'
          })
        })
        .catch(error => {
          console.log(error)
          this.$message({
            message: '签约情况更新失败，请联系管理员',
            center: true,
            type: 'danger'
          })
        })
    }
  }
}
</script>
<style>
#back {
  width: 100%;
  height: 100%;
  background-size: cover;
  overflow: auto;
  background-position: center center;
  box-shadow: 0 0px 3px rgba(0, 0, 0, 0.5);
  text-align: center;
}
#back img {
  width: 100%;
  height: 70%;
  overflow: auto;
}
#state {
  float: left;
}
#city {
  float: left;
}
</style>
