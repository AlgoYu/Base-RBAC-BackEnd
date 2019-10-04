<template>
  <el-tabs type="border-card" :value="currentTabName.toString()" @tab-click="selectTab">
    <el-tab-pane :name="tab.tabName.toString()" :label="tab.tabLable" v-for="tab in tabs">
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
      currentTabName: Number
    },
    methods: {
      selectTab(tab) {
        console.log("选中:"+tab.name+"当前:"+this.currentTabName);
        var tabName = parseInt(tab.name);
        //如果是当前页面则返回
        if (tabName == this.currentTabName) {
          return;
        }
        console.log("需要跳转！");
        this.$emit('transferSelectTab', tabName);
      }
    }
  }
</script>

<style>

</style>
