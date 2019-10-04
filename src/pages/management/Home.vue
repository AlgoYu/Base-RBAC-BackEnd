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
      <Tab :tabs="tabs" :currentTabName="currentTabName" @transferSelectTab="changeTabView"></Tab>
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
    data(){
      return{
        accountName: 'xiaoyu',
        tabs: [],
        currentTabName: 1
      }
    },
    methods:{
      //增加标签页
      addTab(tab){
        //创建一个布尔值
        var flag = true;
        //判断是否已经在tab数组里存在
        for(var i = 0; i < this.tabs.length; i++){
          //如果存在flag为flase
          if(this.tabs[i].tabName === tab.tabName){
            flag = false;
            break;
          }
        }
        //tab数组里未找到就添加
        if(flag){
          this.tabs.push(tab);
        }
        //跳转到当前的Tab
        this.currentTabName = tab.tabName;
        this.$router.push({
          path: tab.routeUrl
        });
      },
      //改变Tab识图
      changeTabView(tabName){
        for(var i = 0; i < this.tabs.length; i++){
          //寻找这个id的视图
          if(this.tabs[i].tabName === tabName){
            this.$router.push({
              path: this.tabs[i].routeUrl
            });
            //设置当前tab为跳转tab
            this.currentTabName = tabName;
            break;
          }
        }
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
