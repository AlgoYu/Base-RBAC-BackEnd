<template>
  <!-- 外部容器 -->
  <el-container direction="horizontal" class="main-container">
    <!-- 左侧区域 -->
    <el-aside width="170px">
      <!-- 头像部分 -->
      <Profile :accountName="accountName"></Profile>
      <!-- 菜单部分 -->
      <Menu @transferSelectMenu="addTab"></Menu>
      <!-- 底部标签 -->
      <Lable></Lable>
    </el-aside>
    <!-- 主要内容区域 -->
    <el-main>
      <!-- Tab部分 -->
      <Tab :tabs="tabs" :currentTabIndex="currentTabIndex" @transferSelectTab="changeTab" @transferRemoveTab="closeTab"></Tab>
    </el-main>
  </el-container>
</template>

<script>
  import Profile from '@/components/home/Profile.vue'
  import Menu from '@/components/home/Menu.vue'
  import Lable from '@/components/home/Lable.vue'
  import Tab from '@/components/home/Tab.vue'

  export default {
    name: 'Home',
    data() {
      return {
        accountId: 0,
        accountName: 'xiaoyu',
        tabs: [],
        currentTabIndex: 1
      }
    },
    created(){
      this.axios.get(this.Common.httpUrl+'/isAuthentication')
      .then((response) =>{
        // 判断是否登录成功并存在Session
        if(response.data.data.login){
          this.accountId = response.data.data.accountId;
          this.accountName = response.data.data.accountName;
        }else{
          this.$router.push({
            name: 'Login'});
        }
      })
    },
    methods: {
      //增加标签页
      addTab(tab) {
        //判断是否已经在tab数组里存在
        for (var i = 0; i < this.tabs.length; i++) {
          //如果存在flag为flase
          if (this.tabs[i].tabId === tab.tabId) {
            this.changeTab(i);
            return;
          }
        }
        //tab数组里未找到就添加并选中跳转
        this.tabs.push(tab);
        this.changeTab(this.tabs.length - 1);
      },
      //传入Tab下标改变Tab
      changeTab(tabIndex) {
        this.$router.push({
          path: this.tabs[tabIndex].routeUrl
        });
        this.currentTabIndex = tabIndex;
      },
      //关闭Tab并返回下标-1的视图
      closeTab(tabIndex) {
        if(tabIndex <= this.currentTabIndex){
          this.currentTabIndex--;
          this.changeTab(this.currentTabIndex);
        }
        //删除这个tab
        this.tabs.splice(tabIndex, 1);
      }
    },
    components: {
      Profile,
      Menu,
      Lable,
      Tab
    }
  }
</script>

<style>
  .el-aside {
    border-right: 1px solid #F2F6FC;
  }

  .left-menu {
    margin-top: 20px;
  }

  .main-container {
    height: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
  }

  .el-main {
    padding: 0px;
  }
</style>
