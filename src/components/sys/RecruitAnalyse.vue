<template>
  <el-row>
    <div>
      <div ref="myEchart" style="width:500px;height:400px;float:left"></div>
      <div style="width:400px;height:400px;float:right">
        学生签约率
        <el-progress
          type="circle"
          :percentage="this.signedNum"
          :stroke-width="10"
          :width="330"
          style="top:50px"
        ></el-progress>
      </div>
    </div>
  </el-row>
</template>

<script type="text/babel">
import echarts from 'echarts'
export default {
  data () {
    return {
      signedNum: 0,
      dataList: [
      ],
      tempDataList: []
    }
  },
  methods: {
    // 图表初始化数据
    initChart () {
      let myChart = echarts.init(this.$refs.myEchart)
      // this.getDataList()
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
            data: function () {
              var url = this.HOST + '/recruit/getRecruitmentAnalyse'
              var params = {
              }
              this.$http.post(url, params,
                {
                  headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                  }
                })
                // then获取成功;response成功后的返回值（对象）
                .then(response => {
                  // console.log(response.data)
                  var responseData = response.data
                  console.log('responseData:' + responseData)
                  var tempnum
                  var tempmajor
                  // 把结果遍历存入datalist数组
                  for (var j = 0, len = responseData.length; j < len; j++) {
                    tempnum = responseData[j].num
                    tempmajor = responseData[j].major
                    console.log(tempmajor)
                    // this.dataList.push(tempnum, tempmajor)
                    this.dataList.push({ value: tempnum, name: tempmajor })
                  }
                  // this.dataList = responseData
                  console.log('赋值后的dataList' + this.dataList)
                })
                .catch(error => {
                  console.log(error)
                  alert('网络错误，不能访问简历报告')
                })
              return this.dataList
            },
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
          // console.log(response.data)
          var responseData = response.data
          // console.log(responseData.data)
          this.signedNum = responseData.data
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，不能访问简历报告')
        })
    }
    // getDataList () {
    //   var url = this.HOST + '/recruit/getRecruitmentAnalyse'
    //   var params = {
    //   }
    //   this.$http.post(url, params,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json;charset=UTF-8'
    //       }
    //     })
    //     // then获取成功;response成功后的返回值（对象）
    //     .then(response => {
    //       // console.log(response.data)
    //       var responseData = response.data
    //       console.log('responseData:' + responseData)
    //       var tempnum
    //       var tempmajor
    //       // 把结果遍历存入datalist数组
    //       for (var j = 0, len = responseData.length; j < len; j++) {
    //         tempnum = responseData[j].num
    //         tempmajor = responseData[j].major
    //         console.log(tempmajor)
    //         // this.dataList.push(tempnum, tempmajor)
    //         this.dataList.push({ 'value': tempnum, 'name': tempmajor })
    //       }
    //       // this.dataList = responseData
    //       console.log('赋值后的dataList' + this.dataList)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       alert('网络错误，不能访问简历报告')
    //     })
    // }
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
