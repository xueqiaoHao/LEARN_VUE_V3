<template>
  <div style="margin: 20px;">
    <div>
      <ul>
        <!-- <li><div class="layout-breadcrumb">
          <el-button type="text" @click="goMain ()">Home</el-button>
        </div></li>-->
        <li>
          <el-row class="demo-autocomplete">
            <el-col :span="8">
              <a>专业</a>
              <el-autocomplete
                class="inline-input"
                v-model="major"
                :fetch-suggestions="querySearch"
                placeholder="按专业查询"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </el-col>
            <el-col :span="8">
              <a>学历</a>
              <!-- <el-autocomplete
                class="inline-input"
                v-model="educationBack"
                :fetch-suggestions="querySearch"
                placeholder="按学历查询"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>-->
              <el-select v-model="educationBack" clearable placeholder="学历要求">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-button type="primary" icon="el-icon-search" @click="getTable">搜索</el-button>
          </el-row>
        </li>
        <li>
          <div style="padding: 10px 0;">
            <el-table :data="tableData" height="350" style="width: 100%">
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
          </div>
        </li>
        <li>
          <div style="text-align: right;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="this.pageInfo.pageNumber"
              :page-sizes="[5,10]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // /*用于查找的登录名*/
      loginName: null,
      restaurants: [],
      major: '',
      educationBack: '',
      // /*分页total属性绑定值*/
      total: 0,
      // /*loading*/
      loading: true,
      // /*pageInfo实体*/
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      },
      options: [{
        value: '本科',
        label: '本科'
      }, {
        value: '硕士',
        label: '硕士'
      }]
    }
  },
  mounted () {
    // /*页面初始化调用方法*/
    this.getTable()
    this.restaurants = this.loadAll()
  },
  created: {
  },
  methods: {
    // pageInfo实体初始化
    initPageInfo () {
      this.pageInfo.pageNumber = 1
      this.pageInfo.pageSize = 10
    },
    loadAll () {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
      ]
    },
    handleSelect (item) {
      console.log(item)
    },
    // Home键返回主页
    goMain () {
      this.$router.push({ path: '/hello' })
    },
    // 得到表数据
    getTable () {
      console.log(this.major)
      console.log(this.educationBack)
      var url = this.HOST + '/resume/getResumeReport'
      var params = {
        'pageNumber': this.pageInfo.pageNumber,
        'pageSize': this.pageInfo.pageSize,
        'major': this.major,
        'educationBack': this.educationBack
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
          console.log(responseData.data.dataList)
          this.tableData = responseData.data.dataList
          this.total = responseData.data.total
          // console.log(this.data1[0])
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，不能访问简历报告')
        })
    },
    // 打印出当前页数和美业条数
    handleSizeChange (val) {
      console.log(val)
      console.log('每页' + this.pageInfo.pageSize + '条')
      // 处理页码选择
      // this.pageNumber = val
      console.log('选择的页码为:' + this.pageInfo.pageNumber)
      // if (this.pageNum === 1) {
      //   this.pageQueryWarning = this.queryWarning.slice(0, this.pageSize)
      //   this.transformInfo()
      // } else {
      //   this.pageQueryWarning = this.queryWarning.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize)
      //   this.transformInfo()
      // }
    },
    handleCurrentChange (val) {
      console.log('当前页:' + val)
      this.pageInfo.pageNumber = val
      console.log('pageNumber的值' + this.pageInfo.pageNumber)
      this.getTable()
    }
  }
}
</script>
<style>
li {
  list-style-type: none;
}
</style>
