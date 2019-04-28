<template>
<div>
  <div ref="myEchart" style="width:500px;height:400px;float:left"></div>
  <div style="width:500px;height:400px;float:right">
    <el-progress type="circle" :percentage="this.signedNum" stroke-width="10" width="300" style="top:50px">
      </el-progress></div>
</div>
</template>

<script type="text/babel">
import echarts from 'echarts'
export default {
  data () {
    return {
      signedNum: '',
      dataList: [
        { value: 98, name: '计算机' },
        { value: 108, name: '通信工程' },
        { value: 34, name: '软件工程' },
        { value: 77, name: '电信工程' },
        { value: 35, name: '网络工程' }
      ]
    }
  },
  methods: {
    // 图表初始化数据
    initChart () {
      let myChart = echarts.init(this.$refs.myEchart)
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} <br/> ({d}%)'
        },
        series: [
          {
            name: '招聘人数分布图',
            type: 'pie',
            radius: '80%',
            center: ['52%', '53%'],
            avoidLabelOverlap: false,
            data: this.dataList,
            itemStyle: {
              emphasis: {
                shadowBlur: 5,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              }
            }
          }
        ]
      })
    },
    getSignPercent () {
      var url = this.HOST + '/resume/getSignedNum'
      var params = {
      }
      this.$http.post(url, params,
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        // then获取成功；response成功后的返回值（对象）
        .then(response => {
          console.log(response.data)
          var responseData = response.data
          console.log(responseData.data)
          this.signedNum = responseData.data
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，不能访问简历报告')
        })
    }
  },
  mounted () {
    let obj = this.$refs.myEchart
    if (obj) {
      this.initChart()
    }
    this.getSignPercent()
  }
}
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
</style>
