<template>
  <div class="hello">
    <h1>{{ oftenGoods.data.dataList[0].name }}</h1>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      oftenGoods: ''
    }
  },
  created () {
    var url = this.HOST + '/resume/getResumeReport'
    var params = {
      'pageSize': 10, 'pageNumber': 1, 'offset': null, 'isPublish': 1, 'deliveredCom': '马竞'
    }
    this.$http.post(url, params,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      // headers{
      //     'Content-type': 'application/x-www-form-urlencoded'
      // }
      // then获取成功；response成功后的返回值（对象）
      .then(response => {
        console.log(response)
        // var obj = JSON.parse(response.data)
        this.oftenGoods = response.data
      })
      // 获取失败
      .catch(error => {
        console.log(error)
        alert('网络错误，不能访问hello')
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
