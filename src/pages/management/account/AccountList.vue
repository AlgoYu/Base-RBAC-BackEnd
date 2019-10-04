<template>
  <div v-loading="loading" class="full">
    <el-input v-on:keyup.enter.native="handleKeyboardEnter" v-model="keyWord" placeholder="搜索账户" prefix-icon="el-icon-search"
      clearable class="search-input"></el-input>
    <el-tooltip class="item" effect="dark" content="也可以在输入框直接回车搜索哦!" placement="bottom">
      <el-button type="primary" v-on:click="search">搜索</el-button>
    </el-tooltip>
    <el-button-group>
      <el-tooltip class="item" effect="dark" content="添加" placement="bottom">
        <el-button type="primary" icon="el-icon-circle-plus"></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="批量删除" placement="bottom">
        <el-button type="danger" icon="el-icon-remove"></el-button>
      </el-tooltip>
    </el-button-group>
    <el-table :data="accountListData" style="width: 100%">
      <el-table-column type="selection" width="70" align="center">
      </el-table-column>
      <el-table-column prop="accountId" label="账户ID" width="50" align="center">
      </el-table-column>
      <el-table-column prop="accountName" label="账户名称" align="center" fit>
      </el-table-column>
      <el-table-column prop="accountDescription" label="账户描述" align="center" fit>
      </el-table-column>
      <el-table-column prop="accountSex" label="账户性别" align="center" fit>
      </el-table-column>
      <el-table-column prop="createDatetime" label="创建时间" align="center" fit>
      </el-table-column>
      <el-table-column prop="operator" label="操作者" align="center" fit>
      </el-table-column>
      <el-table-column prop="operatorIp" label="操作者IP" align="center" fit>
      </el-table-column>
      <el-table-column prop="operateDatetime" label="操作时间" align="center" fit>
      </el-table-column>
      <el-table-column prop="lastLoginDatetime" label="上一次登录时间" align="center" fit>
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
    name: 'AccountList',
    data() {
      return {
        loading: false,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        keyWord: '',
        accountListData: [{
          accountId: 1
        }]
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.loading = true;
        this.axios.post(this.Common.httpUrl + '/api/account/getCurrentPageData', {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            keyWord: this.keyWord
          })
          .then((response) => {
            // 判断是否登录成功
            console.log(response.data.data.data)
            this.loading = false;
            if (response.data.data != null && response.data.data.data instanceof Array) {
              this.accountListData = response.data.data.data;
              this.pageSize = response.data.data.pageSize;
              this.total = response.data.data.total;
              this.loading = false;
            } else {
              this.$message.error('请重新登录！');
              this.$router.push({
                name: 'Login'
              });
            }
          })
          .catch((error) => {
            // 这里是请求失败
            this.$message.error('网络错误！');
            this.loading = false;
          });
      },
      search() {
        this.currentPage = 1;
        this.loadData();
      },
      handleKeyboardEnter() {
        this.currentPage = 1;
        this.loadData();
      },
      handleDelete(index, row) {
        console.log(index);
        console.log(row);
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
