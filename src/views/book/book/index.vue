<template>
  <div>
    <el-card>
      <long-from :model="selectBook" @selectFrom="selectFrom">
        <el-form-item label="图书名称:" prop="bookName">
          <el-input v-model="selectBook.bookName"
                    placeholder="请输入图书名称"/>
        </el-form-item>
        <el-form-item label="图书作者:" prop="bookAuthor">
          <el-input v-model="selectBook.bookAuthor"
                    placeholder="请输入图书作者"/>
        </el-form-item>
        <el-form-item label="图书封面:" prop="bookCover">
          <el-input v-model="selectBook.bookCover"
                    placeholder="请输入图书封面"/>
        </el-form-item>
        <el-form-item label="图书名称:" prop="bookName">
          <el-input v-model="selectBook.bookName"
                    placeholder="请输入图书名称"/>
        </el-form-item>
        <el-form-item label="图书作者:" prop="bookName">
          <el-input v-model="selectBook.bookAuthor"
                    placeholder="请输入图书作者"/>
        </el-form-item>

        <el-form-item label="请输入时间:" prop="startTime">
          <el-form-item  prop="endTime">

            <long-date-picker v-model:start-time="selectBook.startTime"
                              v-model:end-time="selectBook.endTime"></long-date-picker>
          </el-form-item>
        </el-form-item>
        <template v-slot:longFromButton>

        </template>
      </long-from>
    </el-card>
    <el-card>
      <long-button-group-right>
        <el-button class="el-button-del">点击新增</el-button>
      </long-button-group-right>

      <long-supper-table ref="longSupperTable" :api="Api" selection :select-from="selectBook">
        <el-table-column align="center" label="图书名称"
                         prop="bookName"></el-table-column>

      </long-supper-table>
    </el-card>
  </div>
</template>
<script>
import longPagination from "@/components/longPagination.vue";
import LongButtonGroup from "@/components/longButtonGroup.vue";
import LongButtonGroupRight from "@/components/longButtonGroupRight.vue";
import longSupperTable from '@/components/longSupperTable.vue'
import LongAudio from "@/components/longAudio.vue";
import {page} from '@/api/book/index'
import LongFrom from "@/components/longFrom.vue";
import LongDatePicker from "@/components/LongDatePicker.vue";

export default {
  components: {
    LongDatePicker,
    LongFrom, LongAudio, LongButtonGroupRight, LongButtonGroup, longPagination, longSupperTable
  },
  data() {
    return {

      selectBook: {
        bookName:"",
        startTime: '',
        endTime: '',
      },
      //选中的List
      selectList: [],
      Api: page,

    }
  }, mounted() {
  }, methods: {
    selectFrom() {
      this.$refs.longSupperTable.getList()
    }
  }
}
</script>

<style scoped>

</style>