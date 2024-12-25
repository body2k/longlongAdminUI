<!--布具-->
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <app-header></app-header>

      </el-header>
      <el-container>
        <el-aside class="aside" width="200px">
          <app-navbar></app-navbar>
        </el-aside>
        <el-main style="background-color: rgb(245,247,249);  overflow-y: auto;
">
          <!--二级标题        -->

          <app-main-tag></app-main-tag>
          <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import AppNavbar from "@/layout/components/AppNavbar.vue";
import AppMainTag from "@/layout/components/AppMainTag.vue";
import LongAudio from "@/components/longAudio.vue";

export default {
  name: 'layout',
  data(){
    return{

    }
  },
  components: {
    LongAudio,
    AppMainTag,
    AppNavbar,
    AppHeader,
    AppMain
  }, created() {
  },methods:{


  }
}
</script>
<style scoped>
#draggable{
  position: relative;     /*定位*/
  top: 10px;
  left: 10px;

}
.common-layout {
  margin: 0;
}
.aside{
  border-right: 1px solid rgb(238,238,238);
  overflow-y: auto;
  height: calc(100vh - 60px);
}
</style>
<style>
.el-header {
  --el-header-padding: 0px !important;
}

</style>