<template>
  <div v-loading="loading" class="full">
    <el-input @keyup.enter.native="handleKeyboardEnter" v-model="keyWord" placeholder="搜索角色" prefix-icon="el-icon-search"
      clearable class="search-input"></el-input>
    <el-tooltip class="item" effect="dark" content="也可以在输入框直接回车搜索哦!" placement="bottom">
      <el-button type="primary" @:click="handleSearch">搜索</el-button>
    </el-tooltip>
    <el-button-group>
      <el-tooltip class="item" effect="dark" content="添加" placement="bottom">
        <el-button type="primary" icon="el-icon-circle-plus"></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
        <el-button type="success" icon="el-icon-refresh" @click="handleRefresh"></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="批量删除" placement="bottom">
        <el-button type="danger" icon="el-icon-remove" @click="handleBatchDelete"></el-button>
      </el-tooltip>
    </el-button-group>
    <el-table :data="roleListData" style="width: 100%">
      <el-table-column type="selection" width="70" align="center">
      </el-table-column>
      <el-table-column prop="roleId" label="角色ID" width="50" align="center">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" align="center" fit>
      </el-table-column>
      <el-table-column prop="roleDescription" label="角色描述" align="center" fit>
      </el-table-column>
      <el-table-column prop="createDatetime" label="创建时间" align="center" fit>
      </el-table-column>
      <el-table-column prop="operator" label="操作者" align="center" fit>
      </el-table-column>
      <el-table-column prop="operatorIp" label="操作者IP" align="center" fit>
      </el-table-column>
      <el-table-column prop="operateDatetime" label="操作时间" align="center" fit>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"></el-button>
            </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'RoleList',
    data() {
      return {
        loading: false,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        keyWord: '',
        roleListData: [],
        isRefresh: false
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.loading = true;
        var parameterString = "?currentPage="+ this.currentPage + "&pageSize=" + this.pageSize + "&keyWord="+this.keyWord;
        this.axios.get(this.Common.httpUrl + '/api/role/getCurrentPageData' + parameterString)
          .then((response) => {
            // 判断是否为空或是否为数组
            if (response.data.data != null && response.data.data.data instanceof Array) {
              console.log(response.data.data.data);
              this.roleListData = response.data.data.data;
              this.pageSize = response.data.data.pageSize;
              this.total = response.data.data.total;
              if(this.isRefresh){
                this.$message({
                          message: '刷新成功！',
                          type: 'success'
                        });
                  this.isRefresh = false;
              }
            } else {
              this.$message.error('请重新登录！');
              this.$router.push({
                name: 'Login'
              });
            }
            this.loading = false;
          })
          .catch((error) => {
            // 这里是请求失败
            this.$message.error('网络错误！');
            this.loading = false;
          });
      },
      //搜索按钮
      handleSearch() {
        this.currentPage = 1;
        this.isRefresh = true;
        this.loadData();
      },
      //输入框键盘回车
      handleKeyboardEnter() {
        this.currentPage = 1;
        this.isRefresh = true;
        this.loadData();
      },
      //表格内删除按钮
      handleDelete(index, row) {
        console.log(index);
        console.log(row);
        console.log("删除");
      },
      //刷新按钮
      handleRefresh(){
        this.isRefresh = true;
        this.loadData();
      },
      //批量删除按钮
      handleBatchDelete(){
        console.log("批量删除")
      },
      //编辑按钮
      handleEdit(index,row){
        console.log("编辑")
      }
    }
  }
</script>

<style>
  .full {
    margin-top: 50px;
  }

  .search-input {
    width: 300px;
  }
</style>
