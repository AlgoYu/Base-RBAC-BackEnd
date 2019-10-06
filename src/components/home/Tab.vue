<template>
  <el-tabs type="border-card" :value="currentTabIndex.toString()" @tab-click="selectTab" @tab-remove="removeTab">
    <!-- 这里的tab.index!=0是为了主页不被关闭 -->
    <el-tab-pane :closable="index!=0" :name="index.toString()" :label="tab.tabLable" v-for="(tab,index) in tabs">
    </el-tab-pane>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </el-tabs>
</template>

<script>
  export default {
    name: 'Tab',
    props: {
      tabs: Array,
      currentTabIndex: Number
    },
    methods: {
      //选择Tab
      selectTab(tab) {
        var tabName = parseInt(tab.name);
        //如果是当前页面则返回
        if (tabName == this.currentTabName) {
          return;
        }
        this.$emit('transferSelectTab', tabName);
      },
      //删除Tab
      removeTab(tabName){
        this.$emit('transferRemoveTab', parseInt(tabName));
      }
    }
  }
</script>

<style>

</style>
