<template>
  <div style="margin: 20px;">
    <el-form :model="recruitForm" ref="recruitForm" label-width="100px">
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
          <el-col :span="12">
            <el-select v-model="recruitForm.type" clearable placeholder="请选择" style="width:380px">
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
            style="width:380px"
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
          <el-select v-model="recruitForm.jobWay" clearable placeholder="请选择" style="width:380px">
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
              style="width:380px"
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
      successTip: 0
    }
  },
  methods: {
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
    }
  }
}
</script>
<style>
</style>
