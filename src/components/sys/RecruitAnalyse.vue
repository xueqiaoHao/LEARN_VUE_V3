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
      signedNum: 0
    }
  },
  methods: {
    getData () {
      var url = this.HOST + '/recruit/getRecruitmentAnalyse'
      this.$http.post(url).then(resp => {
        var data = resp.data
        var tatilData = []
        for (var i = 0; i < data.data.length; i++) {
          console.log(data.data)
          tatilData.push(data.data[i].name)
        }
        let myChart = echarts.init(this.$refs.myEchart)
        // this.getDataList()
        myChart.setOption({
          title: {
            text: '各专业招聘信息分析图',
            subtext: '就业信息管理中心库',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: tatilData
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                  funnel: {
                    x: '25%',
                    width: '50%',
                    funnelAlign: 'left',
                    max: 1548
                  }
                }
              },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: data.data
            }
          ]
        })
      }).catch(() => {
        alert('网络错误，查看招聘分析报告')
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
    console.log(obj)
    this.getData()
    if (obj) {
      console.log('in')
    }
    this.getSignPercent()
  }
}
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
</style>
