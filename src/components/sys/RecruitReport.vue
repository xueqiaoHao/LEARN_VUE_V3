<template>
  <div style="margin: 20px;">
    <div>
      <ul>
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
              <el-select v-model="educationBack" clearable placeholder="学历要求">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-button type="primary" icon="el-icon-search" @click="handleFilterSelect">搜索</el-button>
          </el-row>
        </li>
        <li>
          <div style="padding: 10px 0;">
            <el-table :data="tableData" height="350" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="招聘信息编号">
                      <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="专业要求">
                      <span>{{ props.row.major }}</span>
                    </el-form-item>
                    <el-form-item label="学历要求">
                      <span>{{ props.row.educationBack }}</span>
                    </el-form-item>
                    <el-form-item label="企业类型">
                      <span>{{ props.row.type }}</span>
                    </el-form-item>
                    <el-form-item label="招收人数">
                      <span>{{ props.row.peopleNums }}</span>
                    </el-form-item>
                    <el-form-item label="薪资待遇">
                      <span>{{ props.row.salary }}</span>
                    </el-form-item>
                    <el-form-item label="宣讲地点">
                      <span>{{ props.row.careerTalk }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="招聘信息编号" prop="id"></el-table-column>
              <el-table-column label="专业要求" prop="major"></el-table-column>
              <el-table-column label="学历要求" prop="educationBack"></el-table-column>
            </el-table>
          </div>
        </li>
        <li>
          <div style="text-align: right;">
            <el-pagination
              :current-page="this.pageInfo.pageNumber"
              :page-sizes="[5,10]"
              :page-size="this.pageInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
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
      tableData: [],
      options: [{
        value: '本科',
        label: '本科'
      }, {
        value: '硕士',
        label: '硕士'
      }]
    }
  },
  mounted: function () {
    // /*页面初始化调用方法*/
    this.getTable()
  },
  methods: {
    // 页面设置初始化
    initPageInfo: function () {
      this.pageInfo.pageNumber = 1
      this.pageInfo.pageSize = 10
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
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
    // 得到表数据
    getTable () {
      console.log('major ' + this.major)
      console.log(this.educationBack)
      var url = this.HOST + '/recruit/getRecruitment'
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
    handleSizeChange: function (val) {
      console.log('每页' + this.pageInfo.pageSize + '条')
      // 处理页码选择
      this.pageInfo.pageSize = val
      this.getTable()
    },
    handleCurrentChange: function (val) {
      console.log('当前页:' + val)
      this.pageInfo.pageNumber = val
      console.log('pageNumber的值' + this.pageInfo.pageNumber)
      console.log(this.total)
      this.getTable()
    },
    // 完成按条件过滤的方法
    handleFilterSelect: function () {
      if (this.pageInfo.pageNumber !== 1) {
        this.initPageInfo()
      }
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
