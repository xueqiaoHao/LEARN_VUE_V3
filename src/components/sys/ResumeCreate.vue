<template>
  <div id="create" style="margin: 20px;">
    <el-button type="primary" @click="publish" style="create">创建简历</el-button>
    <el-button type="info" v-show="isPublish" @click="isPublish=false" style="create">收起</el-button>
    <el-form :model="resumeForm" v-show="isPublish" ref="resumeForm" label-width="100px">
      <el-col :span="11">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="resumeForm.name" :disabled="true" :placeholder="stuName"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item label="年龄" prop="age">
          <el-input v-model="resumeForm.age"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="性别" prop="sex">
          <!-- <el-input v-model="resumeForm.sex"></el-input> -->
          <el-select v-model="resumeForm.sex" clearable placeholder="请选择" style="width:337px">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item label="专业" prop="major">
          <el-input v-model="resumeForm.major"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="学历背景" prop="educationBack">
          <el-select
            v-model="resumeForm.educationBack"
            clearable
            placeholder="请选择"
            style="width:337px"
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
        <el-form-item label="培养方式" prop="trainingMode">
          <el-col :span="12">
            <el-select
              v-model="resumeForm.trainingMode"
              clearable
              placeholder="请选择"
              style="width:337px"
            >
              <el-option
                v-for="item in trainingModeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="生源地" prop="origin">
          <el-input v-model="resumeForm.origin"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item label="毕业时间" prop="graduationTime" required>
          <el-col :span="11">
            <el-date-picker
              v-model="resumeForm.graduationTime"
              type="month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              placeholder="选择毕业年月"
              style="width:337px"
            ></el-date-picker>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="期望工资岗位" prop="jobIntention">
          <el-input v-model="resumeForm.jobIntention"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item label="外语水平" prop="languageLevel">
          <el-autocomplete
            class="inline-input"
            v-model="resumeForm.languageLevel"
            :fetch-suggestions="querySearch"
            placeholder="请输入外语水平"
            style="width:337px"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="电话" prop="phone">
          <el-input v-model="resumeForm.phone"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="resumeForm.email"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="现居住地址" prop="address">
          <el-input v-model="resumeForm.address"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item label="是否公开" prop="isPublic">
          <el-select v-model="resumeForm.isPublic" clearable placeholder="请选择" style="width:337px">
            <el-option
              v-for="item in isPublicOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="自我介绍" prop="message">
          <el-input type="textarea" v-model="resumeForm.message"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item>
          <el-button type="primary" :plain="true" @click="submitForm('resumeForm')">保存简历</el-button>
          <el-button @click="resetForm('resumeForm')">重置信息</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <img src="@/assets/jianli.png">
  </div>
</template>
<script>
export default {
  data () {
    return {
      levels: [],
      sexOptions: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
      trainingModeOptions: [{
        value: '全日制',
        label: '全日制'
      }, {
        value: '非全日制',
        label: '非全日制'
      }],
      educationOptions: [{
        value: '本科',
        label: '本科'
      }, {
        value: '硕士',
        label: '硕士'
      }],
      isPublicOptions: [{
        value: '1',
        label: '公开简历'
      }, {
        value: '0',
        label: '不公开简历'
      }],
      resumeForm: {
        name: '',
        age: '',
        sex: '',
        major: '',
        educationBack: '',
        trainingMode: '',
        origin: '',
        graduationTime: '',
        jobIntention: '',
        languages: '',
        languageLevel: '',
        phone: '',
        email: '',
        address: '',
        message: '',
        isPublic: ''
      },
      isPublish: false,
      stuName: ''
    }
  },
  mounted () {
    this.initStuName()
    this.levels = this.loadAll()
  },
  methods: {
    initStuName () {
      this.stuName = sessionStorage.getItem('currentUserName')
      console.log('当前用户名' + this.stuName)
    },
    querySearch (queryString, cb) {
      var levels = this.levels
      var results = queryString ? levels.filter(this.createFilter(queryString)) : levels
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (level) => {
        return (level.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        { 'value': 'CET4', 'express': '英语四级' },
        { 'value': 'CET6', 'express': '英语四级' }
      ]
    },
    handleSelect (item) {
      console.log(item)
    },
    publish () {
      this.isPublish = true
    },
    submitForm (resumeForm) {
      var url = this.HOST + '/resume/saveResume'
      this.resumeForm.name = this.stuName
      var params = this.resumeForm
      this.$http.post(url, params,
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        // then获取成功；response成功后的返回值（对象）
        .then(response => {
          console.log(response.data.data)
          if (response.data.status === 0) {
            this.$message({
              showClose: true,
              message: '简历保存成功 !',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '发生未知错误 !',
              type: 'warning'
            })
          }
          // console.log(response.data)
          // alert(response.data)
          console.log(response.data)
          this.$refs[resumeForm].resetFields()
        })
        .catch(error => {
          console.log(error)
          this.$message.error('网络错误，无法存储您的简历')
          // alert('网络错误，不能访问简历报告')
        })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>
/* #create {
  float: left;
} */
#create {
  width: 100%;
  height: 100%;
  background-size: cover;
  overflow: auto;
  background-position: center center;
  box-shadow: 0 0px 3px rgba(0, 0, 0, 0.5);
  text-align: center;
}
#create img {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
