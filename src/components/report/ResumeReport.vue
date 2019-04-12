<template>
  <div style="margin: 20px;">
    <div>
      <ul>
        <li><div class="layout-breadcrumb">
          <el-button type="text" @click="goMain ()">Home</el-button>
        </div></li>
        <li>
          <el-row class="demo-autocomplete">
        <el-col :span="8">
          <el-autocomplete
            class="inline-input"
            v-model="state2"
            :fetch-suggestions="querySearch"
            placeholder="按专业查询"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
        <el-col :span="8">
          <el-autocomplete
            class="inline-input"
            v-model="state2"
            :fetch-suggestions="querySearch"
            placeholder="按学历查询"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-row>
        </li>
        <li>
          <div style="padding: 10px 0;">
            <!-- 显示数据的表块儿 -->
            <!-- <Table
              border
              :columns="columns1"
              :data="data1"
              :height="400"
              @on-selection-change="s=>{change(s)}"
              @on-row-dblclick="s=>{dblclick(s)}"
            ></Table>-->
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
          </div>
        </li>
        <li>
          <div style="text-align: right;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="pageSize"
              layout="total, prev, pager, next"
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
      state1: '',
      state2: '',
      // /*分页total属性绑定值*/
      total: 0,
      // /*loading*/
      loading: true,
      // /*pageInfo实体*/
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      },
      // /*user实体*/
      user: {
        id: null,
        name: null,
        loginName: null,
        password: null,
        passwordAgain: null,
        email: null
      },
      // /*表显示字段*/
      columns1: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '专业',
          key: 'major'
        },
        {
          title: '学历',
          key: 'educationBack'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '英语水平',
          key: 'languageLevel'
        },
        {
          title: '计算机水平',
          key: 'computerLevel'
        }
      ]
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
    // Home键返回主页
    goMain () {
      this.$router.push({ path: '/hello' })
    },
    // 得到表数据
    getTable () {
      var url = this.HOST + '/resume/getResumeReport'
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
    }
  }
}
</script>
<style>
li {
  list-style-type: none;
}
</style>
