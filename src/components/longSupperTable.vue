<template>
  <el-table class="longSuperTable" :data="tableDate" header-cell-class-name="table-header-row" @selection-change="handleSelectionChange"
            v-loading="loading">
    <el-table-column type="selection" width="55" v-if="selection"/>
    <slot></slot>
  </el-table>
  <long-pagination :page="page" @selectPage="selectPage"></long-pagination>

</template>
<script>
import longPagination from "@/components/longPagination.vue";

export default {
  components: {longPagination},
  props: {
    selectDate: {
      type: Array,
      default: []
    },
    selectList: {
      type: Array,
      default: []
    },
    //当前页
    current: {
      type: Number,
      default: 1
    },
    //显示多少条
    size: {
      type: Number,
      default: 10
    },
    //查询接口
    api: {
      type: Function
    },
    //查询条件
    selectFrom: {
      type: Object,
      default: {}
    },
    //边框
    border: {
      type: Boolean,
      default: false
    },
    //复选框
    selection: {
      type: Boolean,
      default: false
    },
    //默认数据
    data: {
      type: Array,
      default: []
    }, dataConFig: {
      type: Array,
      default: {
        label: "label",
        prop: "prop"
      }
    }
  }, data() {
    return {
      loading: true,
      tableDate: this.data,
      //分页
      page: {
        current: this.current,
        size: this.size,
        total: 0,
      },
      //选择
      selectList: []
    }
  },
  mounted() {
    this.getList();
  }, methods: {
    selectPage(page) {
      this.page.size = page.size
      this.page.current = page.current
      this.getList()
    },
    handleSelectionChange(val) {
      // this.selectList = val;
      this.$emit("update:selectDate",val)
      //查询
    }, getList() {
      //当data长度等于0调用接口
      if (this.data.length === 0) {
        this.api(this.page, this.selectFrom).then(req => {
          if (req.code === 200) {
            this.tableDate = req.data.records;
            this.page.current = req.data.current
            this.page.size = req.data.size
            this.page.total = req.data.total
            this.loading = false
          }
        })
      }
    },//重置需要从外部清空selectFrom
    reset() {
      this.page = {
        current: this.current,
        size: this.size,
        total: 0,
      }
      this.getList();
    },
  }
}
</script>
<style scoped>
.longSuperTable{
}
</style>