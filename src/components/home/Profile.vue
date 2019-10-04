<template>
  <div>
    <!-- 头像 -->
    <el-row>
      <el-col :span="24">
        <img class="account-picture" src="../../assets/img/picture.jpg" />
      </el-col>
    </el-row>
    <!-- 名称 -->
    <el-row style="margin-top: 3px;">
      <el-col :span="24">
        <span style="color: #000000;font-weight: 900;font-family: 'microsoft yahei';">{{this.accountName}}</span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col :span="24">
        <el-button-group>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini">注销</el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    name: 'Profile',
    props: {
      accountName: String
    }
  }
</script>

<style>
  .account-picture {
    width: 80px;
    height: 80px;
    margin-top: 30px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border: 2px solid #409EFF;
  }
</style>
