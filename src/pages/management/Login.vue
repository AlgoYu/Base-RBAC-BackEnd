<template>
  <div class="container">
    <el-card class="box-card login-panel">
      <div slot="header">
        <img src="@/assets/img/logo.png" class="logo" />
        <h2>RBAC后台管理系统</h2>
      </div>
      <el-form :model="form" :rules="rules" ref="loginForm" label-width="100px">
        <el-form-item prop="accountName" label="账户名称:">
          <el-input v-model="form.accountName" placeholder="请输入账户名称" clearable></el-input>
        </el-form-item>
        <el-form-item prop="accountPassword" label="账户密码:">
          <el-input v-model="form.accountPassword" placeholder="请输入账户密码" type="password" clearable></el-input>
        </el-form-item>
        <div>
          <el-switch v-model="form.rememberMe" active-color="#13ce66" inactive-color="#ff4949" active-text="自动登录">
          </el-switch>
        </div>
        <div style="margin-top: 25px;">
          <el-button type="primary" @click="login('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          accountName: '',
          accountPassword: '',
          rememberMe: true
        },
        rules: {
          accountName: [{
              required: true,
              message: '请输入账户名称',
              trigger: 'blur'
            },
            {
              min: 4,
              max: 20,
              message: '长度在 4 到 20 个字符',
              trigger: 'blur'
            }
          ],
          accountPassword: [{
              required: true,
              message: '请输入账户名称',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 20,
              message: '长度在 6 到 20 个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      login(formName) {
        // 验证表单是否通过
        this.$refs[formName].validate((isValid) => {
          // 通过验证既登录
          if (isValid) {
            this.form.accountPassword = md5(this.form.accountPassword);
            this.axios.post(this.Common.httpUrl + '/login', this.form)
              .then((response) => {
                // 判断是否登录成功
                if (response.data.data) {
                  this.$message({
                    message: '登录成功！3秒后跳转至管理界面！',
                    type: 'success'
                  });
                  // 跳转页面
                  setTimeout(() => {
                    this.$router.push({
                      name: 'ManagementHome',
                      params: {
                        accountName: this.form.accountName
                      }
                    });
                  }, 3000);
                } else {
                  this.$message({
                    message: response.data.message,
                    type: 'warning'
                  });
                }
              })
              .catch((error) => {
                // 这里是请求失败
                this.$message.error('当前网络不畅，请检查您的网络！');
              });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    height: 100%;
    display: flex;
    align-items: center;
    /*定义body的元素垂直居中*/
    justify-content: center;
    /*定义body的里的元素水平居中*/
  }

  .login-panel {
    width: 35%;
    height: 60%;
  }
</style>
