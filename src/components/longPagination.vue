<!--分页组件-->
<template>
  <div id="pagination">
    <el-pagination layout="total, prev, pager, next,sizes"
                   :total="page.total"
                   :current-page="page.current"
                   :page-size="page.size"
                   @size-change="handleSizeChange"
                   :page-sizes="pageSizes"
                   @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  props: {
    page: {
      type: Object,
      default: {
        total: 0,
        current: 1,
        size: 10
      }
    },
    pageSizes: {
      type: Array,
      default: [
        10, 20, 30, 40
      ]
    }

  }, methods: {
    handleSizeChange(val) {
      this.page.size = val;
      this.$emit('selectPage', {...this.page})

    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.$emit('selectPage', {...this.page})
    }
  }, mounted() {
  }
}
</script>
<style scoped>
#pagination {
  background: #fff;
  padding: 10px;
  text-align: right;
}
</style>
<style>
.el-pagination {
  justify-content: center;

}
</style>