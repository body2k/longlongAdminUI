<!--模糊查询菜单管理-->
<template>
  <div id="longFrom" :class="isOpen?'isOpenFalse':'isOpenTrue'">
    <el-form :inline="true" :model="model" label-width="120px" ref="longFrom">
      <slot></slot>
    </el-form>
    <long-button-group-right>
      <longFromButton>
        <slot name="longFromButton"></slot>
      </longFromButton>
      <el-button class="el-button-add" @click="selectFrom">
        查询
      </el-button>
      <el-button @click="resetForm('longFrom')">
        重置
      </el-button>
      <div style="margin-left: 10px;" v-if="!showOpen">
        <el-button v-if="!isOpen" type="text" @click="isOpen=true">
          展开
          <el-icon>
            <ArrowDownBold/>
          </el-icon>
        </el-button>
        <el-button v-else @click="isOpen=false" type="text">
          收起
          <el-icon>
            <ArrowUpBold/>
          </el-icon>
        </el-button>
      </div>
    </long-button-group-right>
  </div>
</template>
<script>

import {defineComponent} from "vue";
import LongButtonGroupRight from "@/components/longButtonGroupRight.vue";

export default defineComponent({
  components: {LongButtonGroupRight},
  props: {
    //是否显示展开
    showOpen: {
      type: Boolean,
      default: false
    },
    model: {}
  }, data() {
    return {
      //是否展开
      isOpen: false
    }
  }, methods: {
    selectFrom() {
      this.$emit('selectFrom', {...this.model})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.selectFrom()
    }
  }, mounted() {

  }
})
</script>
<style scoped>
#longFrom {

}


.isOpenTrue {
  display: flex;
  animation:  isOpenTrue 0.3s linear ;
  height: 30px;

}
@keyframes isOpenTrue {
  0% {
    height: 100%;

    transform: translateY(30px);

  }
  50%{
    height: 50%;
    transform: translateY(15px);

  }
  100%{
    height: 0%;

    transform: translateY(0);


  }
}
.isOpenFalse {
  height: 100%;
  transition: all 0.3s;
  transform: translateY(30px);

}
</style>