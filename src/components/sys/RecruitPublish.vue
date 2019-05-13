<template>
  <div style="margin: 20px;">
    <ul>
    <el-button type="success" @click="publish" style="create">发布招聘信息</el-button>
    <!-- <el-dialog title="新建招聘信息" :visible.sync="isPublish"> -->
    <el-button type="success" v-show="isPublish" @click="isPublish=false" style="create">收起</el-button>
    <el-form :model="recruitForm"  v-show="isPublish" ref="recruitForm" label-width="100px" >
      <!-- <el-form-item label="公司信息" prop="info">
        <el-input type="textarea" v-model="recruitForm.info"></el-input>
      </el-form-item>-->
      <el-col :span="11">
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="recruitForm.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item label="公司地址" prop="address">
          <el-input v-model="recruitForm.address"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="岗位类型" prop="nature">
          <el-input v-model="recruitForm.nature"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item label="招收专业" prop="major">
          <el-input v-model="recruitForm.major"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="薪资待遇" prop="salary">
          <el-input v-model="recruitForm.salary"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item label="公司类型" prop="type">
          <el-col :span="11">
            <el-select v-model="recruitForm.type" clearable placeholder="请选择" style="width:315px">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="学历要求" prop="educationBack">
          <el-select
            v-model="recruitForm.educationBack"
            clearable
            placeholder="请选择"
            style="width:315px"
          >
            <el-option
              v-for="item in educationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item label="招收人数" prop="peopleNums">
          <el-input v-model="recruitForm.peopleNums"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="招聘方式" prop="jobWay">
          <el-select v-model="recruitForm.jobWay" clearable placeholder="请选择" style="width:315px">
            <el-option
              v-for="item in jobWayOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item label="职位信息" prop="jobInfo">
          <el-input type="textarea" v-model="recruitForm.jobInfo"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="宣讲地点" prop="careerTalk">
          <el-input v-model="recruitForm.careerTalk"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item label="宣讲时间" prop="talkTime" required>
          <el-col :span="11">
            <el-date-picker
              v-model="recruitForm.talkTime"
              type="datetime"
              placeholder="选择日期时间"
              default-time="14:00:00"
              style="width:315px"
            ></el-date-picker>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="公司信息" prop="info">
          <el-input type="textarea" v-model="recruitForm.info"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="发布人" prop="publisher">
          <el-input v-model="recruitForm.publisher"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="recruitForm.phone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item>
          <el-button type="primary" @click="submitForm('recruitForm')">立即发布</el-button>
          <el-button @click="resetForm('recruitForm')">重置</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <!-- </el-dialog> -->
     <el-table :data="tableData" stripe height="350" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="公司名称">
                      <span>{{ props.row.name }}</span>
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
              <el-table-column label="薪资待遇" prop="salary"></el-table-column>
            </el-table>
            <li><div style="text-align: right;">
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
</template>
<script>
export default {
  data () {
    return {
      typeOptions: [{
        value: '国企',
        label: '国企'
      }, {
        value: '私企',
        label: '私企'
      }, {
        value: '外企',
        label: '外企'
      }],
      educationOptions: [{
        value: '本科',
        label: '本科'
      }, {
        value: '硕士',
        label: '硕士'
      }],
      jobWayOptions: [{
        value: '网上招聘',
        label: '网上招聘'
      }, {
        value: '现场宣讲',
        label: '现场宣讲'
      }],
      tableData: [],
      total: 0,
      isPublish: false,
      recruitForm: {
        name: '',
        address: '',
        nature: '',
        type: '',
        publisher: '',
        depart: '',
        phone: '',
        info: '',
        major: '',
        educationBack: '',
        peopleNums: '',
        salary: '',
        jobWay: '',
        jobInfo: '',
        careerTalk: '',
        talkTime: ''
      },
      successTip: 0,
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      }
    }
  },
  mounted: function () {
    // /*页面初始化调用方法*/
    this.initPageInfo()
    this.getTable()
  },
  methods: {
    // 页面设置初始化
    initPageInfo: function () {
      this.pageInfo.pageNumber = 1
      this.pageInfo.pageSize = 10
    },
    submitForm (recruitForm) {
      var url = this.HOST + '/recruit/publishRecruitment'
      var params = this.recruitForm
      this.$http.post(url, params,
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        // then获取成功；response成功后的返回值（对象）
        .then(response => {
          // console.log(response.data)
          this.successTip = 1
          // alert(response.data)
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，不能访问简历报告')
        })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    publish () {
      this.isPublish = true
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
    // 得到表数据
    getTable () {
      var comName = sessionStorage.getItem('currentUserName')
      console.log('当前用户名' + comName)
      var url = this.HOST + '/recruit/getOwnRecruitment'
      var params = {
        'pageNumber': this.pageInfo.pageNumber,
        'pageSize': this.pageInfo.pageSize,
        'comName': comName
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
#create{
  float: left;
}
</style>
