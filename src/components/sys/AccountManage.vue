<template>
  <div style="margin: 20px;">
    <div>
      <ul>
        <li>
          <el-row class="demo-autocomplete" style="text-align:left">
            <el-button
              type="primary"
              @click="dialogFormVisible = true"
              style="width: 100px; height: 40px;"
            >新建用户</el-button>
          </el-row>
          <el-dialog title="新建用户" :visible.sync="dialogFormVisible">
            <el-form :model="userForm" ref="userForm">
              <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
                <el-input v-model="userForm.userName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
                <el-input v-model="userForm.account" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                <el-input v-model="userForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="userForm.email" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancleForm">取 消</el-button>
              <el-button @click="resetForm('userForm')">重置</el-button>
              <el-button type="primary" @click="submitForm('recruitForm')" :plain="true">确 定</el-button>
            </div>
          </el-dialog>
        </li>
        <li>
          <div style="padding: 10px 0;">
            <el-table v-loading="loading" :data="tableData" border height="350" style="width: 100%">
              <el-table-column prop="id" label="账号id" fixed width="180"></el-table-column>
              <el-table-column prop="userName" label="登录名" width="180"></el-table-column>
              <el-table-column prop="account" label="账号" width="180"></el-table-column>
              <el-table-column prop="password" label="密码"></el-table-column>
              <!-- <el-table-column prop="email" label="邮箱"></el-table-column> -->
              <el-table-column label="用户身份" width="135px">
                <template slot-scope="scope">
                  <el-button
                    id="editButton"
                    size="small"
                    icon="el-icon-s-custom"
                    @click="handleRole(scope.$index, scope.row)"
                  ></el-button>
                </template>
              </el-table-column>
              <el-table-column label="删除用户" width="135px">
                <template slot-scope="scope">
                  <!-- <el-button
                    id="editButton"
                    size="small"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
                  ></el-button>-->
                  <el-button
                    id="deleteButton"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    size="small"
                    @click.native.prevent="handleDelete(scope.$index, scope.row)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog title="权限赋予" :visible.sync="setRole" width="300px" center>
              <div class="del-dialog-cnt">
                设置用户
                <strong>{{this.pointName}}</strong>的身份类型为
                <el-select v-model="roleType" placeholder="请选择" clearable>
                  <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                    <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-option-group>
                </el-select>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="setRole = false">取 消</el-button>
                <el-button type="primary" @click="setUserRole">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 删除提示框 -->
            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
              <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
              </span>
            </el-dialog>
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
      total: 0,
      // /*loading*/
      loading: true,
      // /*pageInfo实体*/
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      },
      tableData: [],
      dialogFormVisible: false,
      userForm: {
        userName: '',
        account: '',
        password: '',
        email: ''
      },
      userId: 1,
      pointName: '',
      formLabelWidth: '120px',
      delVisible: false, // 删除提示弹框的状态
      msg: '', // 记录每一条的信息，便于取id
      delid: '', // 存放删除的数据
      setRole: false,
      roleType: '',
      options: [{
        label: '管理者',
        options: [{
          value: '1',
          label: '管理员'
        }]
      }, {
        label: '成员身份',
        options: [{
          value: '3',
          label: '公司身份'
        }, {
          value: '2',
          label: '学生身份'
        }]
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
    // 得到表数据
    getTable () {
      var url = this.HOST + '/user/getAccountList'
      var params = {
        'pageNumber': this.pageInfo.pageNumber,
        'pageSize': this.pageInfo.pageSize
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
          // console.log(responseData.data.dataList)
          this.tableData = responseData.data.dataList
          this.total = responseData.data.total
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，不能访问简历报告')
        })
    },
    handleSizeChange: function (val) {
      // console.log('每页' + this.pageInfo.pageSize + '条')
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
    // 取消表单
    cancleForm () {
      this.dialogFormVisible = false
      this.$message({
        message: '您取消了用户创建',
        center: true,
        type: 'warning'
      })
    },
    // 重置表单操作
    resetForm (formName) {
      this.$refs[formName].resetFields()
      // eslint-disable-next-line no-undef
    },
    // 提交表单
    submitForm (userForm) {
      console.log(this.userForm)
      if (this.userForm.userName === null || this.userForm.userName === '' || this.userForm.account === null || this.userForm.password === null || this.userForm.account === '' || this.userForm.password === '') {
        alert('请填写完成必要信息再进行提交操作')
      } else {
        var url = this.HOST + '/user/addUser'
        var params = this.userForm
        this.$http.post(url, params,
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
          // then获取成功；response成功后的返回值（对象）
          .then(response => {
            this.$message({
              message: '创建成功',
              center: true,
              type: 'success'
            })
            this.getTable()
          })
          .catch(error => {
            console.log(error)
            alert('网络错误，不能访问简历报告')
          })
        this.dialogFormVisible = false
      }
    },
    // 删除用户，单条
    handleDelete (index, row) {
      this.idx = index
      this.msg = row// 每一条数据的记录
      this.delid = this.msg.id// 把单行删除的每条数据的id添加进放删除数据的数组
      this.delVisible = true
    },
    // 确定删除

    deleteRow () {
      console.log(this.delid)
      var url = this.HOST + '/user/deleteUser'
      var params = {
        'id': this.delid
      }
      this.$http.post(url, params,
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        // then获取成功；response成功后的返回值（对象）
        .then(response => {
          this.$message({
            message: this.msg.userName + '已删除',
            center: true,
            type: 'success'
          })
          this.getTable()
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，删除失败')
        })
      this.delVisible = false // 关闭删除提示模态框
    },
    // 点击一行后为此行账号附加身份信息
    handleRole (index, row) {
      this.pointName = row.userName
      this.setRole = true
      this.userId = row.id
    },
    setUserRole () {
      console.log(this.userId)
      console.log(this.roleType)
      if (this.userId === null || this.roleType === null || this.userId === '' || this.roleType === '') {
        alert('请选定身份类型后再进行提交操作')
      } else {
        var url = this.HOST + '/user/setUserRole'
        var params = {
          'userId': this.userId,
          'role': this.roleType
        }
        console.log(params)
        this.$http.post(url, params,
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
          // then获取成功；response成功后的返回值（对象）
          .then(response => {
            this.$message({
              message: '身份设定成功',
              center: true,
              type: 'success'
            })
            this.getTable()
          })
          .catch(error => {
            console.log(error)
            alert('网络错误，身份设定失败')
          })
        this.setRole = false
      }
    }
  }
}
</script>
<style>
li {
  list-style-type: none;
}
#userName {
  background-color: aqua;
}
#editButton {
  float: left;
}
#deleteButton {
  margin-left: 35%;
}
</style>
