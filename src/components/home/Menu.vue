<template>
  <!-- 菜单渲染 -->
  <el-menu default-active="/management/index" mode="vertical" unique-opened class="el-menu-vertical-demo left-menu">
    <div v-for="menu in menus">
      <el-menu-item :index="menu.menuUrl" v-if="menu.menuType=='菜单项'" @click="selectMenu(menu)">
        <i :class="menu.menuIcon"></i>
        <span slot="title">{{menu.menuName}}</span>
      </el-menu-item>
      <el-submenu :index="menu.menuId.toString()" v-if="menu.menuType=='子菜单'">
        <template slot="title">
          <i :class="menu.menuIcon"></i> <span>{{menu.menuName}}</span>
        </template>
        <el-menu-item :index="submenu.menuUrl" v-for="submenu in menu.subMenus" @click="selectMenu(submenu)">{{submenu.menuName}}</el-menu-item>
      </el-submenu>
    </div>
  </el-menu>
</template>

<script>
  export default {
    name: 'Menu',
    data() {
      return {
        menus: []
      }
    },
    created() {
      //获取菜单信息
      this.axios.get(this.Common.httpUrl + '/api/menu/getAll')
        .then((response) => {
          // 判断是否是数组
          if (response.data.data != null && response.data.data instanceof Array) {
            this.menus = response.data.data;
            this.$emit('transferSelectMenu', {
              tabId: this.menus[0].menuId,
              tabLable: this.menus[0].menuName,
              routeUrl: this.menus[0].menuUrl
            });
          } else {
            this.$message.error('系统出错！请重新登录！');
            this.$router.push({
              name: 'Login'
            });
          }
        })
        .catch((error) => {
          // 这里是请求失败
          this.$message.error('网络错误！');
        });
    },
    methods: {
      selectMenu(menu) {
        this.$emit('transferSelectMenu', {
          tabId: menu.menuId,
          tabLable: menu.menuName,
          routeUrl: menu.menuUrl
        });
      }
    }
  }
</script>

<style>
</style>
