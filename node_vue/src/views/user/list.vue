<template>
  <div class="userListContainer">
    <div class="topBox">
      <el-input v-model="keyword" placeholder="用户账号" class="handle-input mr10" clearable @clear="getList(2)"></el-input>
      <el-button type="primary" icon="Search" @click="getList(2)">搜索</el-button>
    </div>
    <el-table :data="userList" border header-cell-class-name="table-header">
      <el-table-column prop="user_id" label="ID" align="center" min-width="80"></el-table-column>
      <el-table-column prop="name" label="账号" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column label="头像" align="center" min-width="80">
        <template #default="scope">
          <el-image class="face" :src="scope.row.face" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center" min-width="100">
        <template #default="scope">
          {{ scope.row.sex==0?'未知':scope.row.sex==1?'男':'女'}}
        </template>
      </el-table-column>
      <el-table-column label="等级" align="center" min-width="100">
        <template #default="scope">V{{ scope.row.level }}</template>
      </el-table-column>
      <el-table-column label="余额" align="center" min-width="100">
        <template #default="scope">￥{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column prop="birthday" label="生日" align="center" min-width="120"></el-table-column>
      <el-table-column label="状态" align="center">
        <template #default="scope">
          <el-tag :type="scope.row.status==1?'success':'danger'">
            {{ scope.row.status==1?'正常':'封号'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="login_time" label="登录时间" align="center" min-width="170"></el-table-column>
      <el-table-column prop="create_time" label="注册时间" align="center" min-width="120"></el-table-column>
      <el-table-column label="操作" min-width="160" align="center" fixed="right">
        <template #default="scope">
          <el-button type="text" icon="Edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" icon="Delete" class="red" @click="handleDelete(scope.row.user_id)" v-if="scope.row.is_admin==0">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next,jumper" :current-page="page" :page-size="row" :total="records" :page-count="total" @current-change="handlePageChange" />
    </div>
    <!-- 编辑框 -->
    <el-dialog title="编辑" v-model="editVisible" width="380px">
      <el-form label-width="70px">
        <el-form-item label="账号">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="余额">
          <el-input v-model="form.money" maxlength="8" @input="checkMoney"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-if="form.is_admin==0">
          <el-switch v-model="form.status" active-text="是" inactive-text="否" :active-value="1" :inactive-value="2"  inline-prompt />
        </el-form-item>
      </el-form>
      <div class="el-dialog__footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { ref, reactive, getCurrentInstance } from "vue";
  import { ElMessage, ElMessageBox } from "element-plus";
  export default {
    data() {
      return {
        userList: [],
        page: 1,
        row: 10,
        total: 1,
        records: 1,
        form: [],
        editVisible: false,
        keyword: '',
        value: ''
      }
    },
    methods: {
      checkMoney() {
        var money = this.form.money
        money = money.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
          .replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
          .replace(/^\./g, '') //保证第一个为数字而不是.
          .replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
        if (money.indexOf('.') < 0 && money != '') {
          money = parseFloat(money);
        }
        if (money == '') {
          money = 0
        }
        this.form.money = money;
      },
      handlePageChange(val) {
        this.page = val
        this.getList()
      },
      getList(e) {
        if (e == 2) {
          if (this.value != this.keyword) {
            this.value = this.keyword
            this.page = 1
            this.list = []
          } else {
            return
          }
        }
        this.$get('user/list', {
          page: this.page,
          row: this.row,
          keyword: this.value
        }).then(res => {
          if (res.code == 200) {
            this.userList = res.data
            this.total = res.total,
              this.records = res.records
          } else {
            ElMessage.error(res.msg);
          }
        })
      },
      handleDelete(user_id) {
        ElMessageBox.confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          buttonSize: 'default'
        }).then(() => {
          this.$post('user/delete', {
            user_id: user_id,
          }).then(res => {
            if (res.code == 200) {
              ElMessage.success("删除成功");
              this.page = 1
              this.getList()
            } else {
              ElMessage.error(res.msg);
            }
          })
        }).catch(() => {})
      },
      handleEdit(index, row) {
        this.editVisible = true;
        this.form = JSON.parse(JSON.stringify(row))
      },
      // 编辑
      saveEdit() {
        this.$post('user/edit', {
          user_id: this.form.user_id,
          nickname: this.form.nickname,
          money: this.form.money,
          status: this.form.state ? 2 : 1
        }).then(res => {
          if (res.code == 200) {
            this.editVisible = false
            ElMessage.success('编辑成功');
            this.getList()
          } else {
            ElMessage.error(res.msg);
          }
        })
      }
    },
    created() {
      this.getList()
    }
  }
</script>
<style lang="scss">
  .userListContainer {
    .topBox {
      display: flex;
      align-items: center;
      margin: 0 0 15px;
      .el-input {
        width: 200px;
      }
      .el-input__inner {
        border-radius: 3px 0 0 3px;
      }
      .el-button {
        border-radius: 0 3px 3px 0;
      }
    }
    .face {
      width: 40px;
      height: 40px;
    }
    .el-dialog__footer {
      padding-bottom: 10px;
    }
  }
</style>
