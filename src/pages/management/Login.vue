<template>
  <div class="box">
    <el-row>
      <el-col :span="24">
        <h1>RBAC后台管理系统</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :offset="9">
        <el-form :model="form" :rules="rules" ref="loginForm" label-width="100px">
          <el-form-item prop="accountName" label="账户名称:">
            <el-input v-model="form.accountName" placeholder="请输入账户名称" clearable></el-input>
          </el-form-item>
          <el-form-item prop="accountPassword" label="账户密码:">
            <el-input v-model="form.accountPassword" placeholder="请输入账户密码" type="password" clearable></el-input>
          </el-form-item>
          <el-form-item label="自动登录:">
            <el-switch
              v-model="form.rememberMe"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="12">
                <el-button type="primary" @click="login('loginForm')">登录</el-button>
              </el-col>
              <el-col :span="12">
                <el-button @click="resetForm('loginForm')">重置</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        accountName: '',
        accountPassword: '',
        rememberMe: true
      },
      rules: {
        accountName: [
          { required: true, message: '请输入账户名称', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        accountPassword: [
          { required: true, message: '请输入账户名称', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login(formName){
      // 验证表单是否通过
      this.$refs[formName].validate((isValid)=>{
        // 通过验证既登录
        if(isValid){
          this.axios.post(this.Common.httpUrl+'/login', this.form)
          .then((response) =>{
            // 判断是否登录成功
            if(response.data.data){
              this.$message({
                message: '登录成功！3秒后跳转至管理界面！',
                type: 'success'
              });
              // 跳转页面
              setTimeout(()=>{
                this.$router.push({
                  name: 'ManagementHome',
                  params:{
                    accountName: this.form.accountName
                  }
                });
              },3000);
            }else{
              this.$message({
                message: response.data.message,
                type: 'warning'
              });
            }
          })
          .catch((error) =>{
            // 这里是请求失败
            this.$message.error('当前网络不畅，请检查您的网络！');
          });
        }
      });
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
}
</style>
