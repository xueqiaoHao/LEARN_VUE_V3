<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="简历ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="学生专业">
              <span>{{ props.row.major }}</span>
            </el-form-item>
            <el-form-item label="学历背景">
              <span>{{ props.row.educationBack }}</span>
            </el-form-item>
            <el-form-item label="姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="年龄">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="英语水平">
              <span>{{ props.row.languageLevel }}</span>
            </el-form-item>
            <el-form-item label="计算机水平">
              <span>{{ props.row.computerLevel }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="简历 ID" prop="id"></el-table-column>
      <el-table-column label="学生专业" prop="major"></el-table-column>
      <el-table-column label="学历背景" prop="educationBack"></el-table-column>
    </el-table>
     <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
  </div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  data () {
    return {
      tableData: '',
      total: ''
    }
  },
  mounted () {
    // /*页面初始化调用方法*/
    this.getTable()
  },
  methods: {
    // 得到表数据
    getTable () {
      var url = this.HOST + '/resume/getResumeReport'
      console.log('去取数据了要')
      var params = {
        'pageNumber': 1,
        'pageSize': 10
      }
      this.$http.post(url, params,
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        // then获取成功；response成功后的返回值（对象）
        .then(response => {
          console.log('获取成功')
          console.log(response.data)
          var responseData = response.data
          console.log(responseData.data.dataList)
          this.tableData = responseData.data.dataList
          this.total = responseData.data.total
          console.log(this.tableData[0])
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，不能访问简历报告')
        })
    }
  }
}
</script>
