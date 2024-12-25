<template>
  <div>
    <!--搜素    -->
    <el-card>
      <long-from :model="selectDbBase" @selectFrom="selectFrom">
        <el-form-item label="数据库url:" prop="url">
          <el-input v-model="selectDbBase.url"
                    placeholder="请输入数据库url" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="连接驱动:" prop="driverName">
          <el-input v-model="selectDbBase.driverName"
                    placeholder="请输入连接驱动" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="数据库账号:" prop="userName">
          <el-input v-model="selectDbBase.userName"
                    placeholder="请输入数据库账号" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="selectDbBase.password"
                    placeholder="请输入密码" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="数据库名称:" prop="name">
          <el-input v-model="selectDbBase.name"
                    placeholder="请输入数据库名称" style="width: 200px"/>
        </el-form-item>
      </long-from>
    </el-card>
    <!--表格    -->
    <el-card>

      <long-button-group-right>
        <el-button class="el-button-add" @click="saveOrUpdateIng(1,null)">新增</el-button>
        <el-button class="el-button-del">批量删除</el-button>
      </long-button-group-right>
      <long-supper-table ref="longSupperTable" :api="Api" selection :select-from="selectDbBase"
                         v-model:select-date="selectDate">
        <el-table-column align="center" label="数据库url"
                         prop="url"></el-table-column>
        <el-table-column align="center" label="连接驱动"
                         prop="driverName"></el-table-column>
        <el-table-column align="center" label="数据库账号"
                         prop="userName"></el-table-column>
        <el-table-column align="center" label="密码"
                         prop="password"></el-table-column>
        <el-table-column align="center" label="数据库名称"
                         prop="name"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
          <template #default="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">创建表</el-button>
            <el-button type="text">复制</el-button>
            <el-button type="text" class="el-button-text-del">删除</el-button>
          </template>
        </el-table-column>
      </long-supper-table>
    </el-card>
    <save-or-update v-model="dialogSaveOrUpdate" :saveOrUpdateVisible="saveOrUpdateVisible"></save-or-update>
  </div>
</template>
<script>


import LongFrom from "@/components/longFrom.vue";
import longSupperTable from "@/components/longSupperTable.vue";
import {page} from '@/api/database'
import LongButtonGroupRight from "@/components/longButtonGroupRight.vue";
import SaveOrUpdate from "@/views/code/database/components/saveOrUpdate.vue";

export default {
  components: {SaveOrUpdate, LongButtonGroupRight, longSupperTable, LongFrom},
  data() {
    return {
      dialogSaveOrUpdate: false,
      saveOrUpdateVisible: 1,
      selectDate: [],
      Api: page,
      selectDbBase: {},
    }
  }, methods: {
    saveOrUpdateIng(type, data) {
      this.dialogSaveOrUpdate = true
    },
    selectFrom() {

      this.$refs.longSupperTable.getList()

    }
  }
}
</script>
<style scoped>

</style>