<!--导航栏-->
<template>
  <div>
    <el-menu :default-active="selectMenu" router unique-opened>

      <div v-for="oneMenu in menuList">
        <el-sub-menu v-if="oneMenu.hasOwnProperty('children')&&oneMenu.isOpen===0&&oneMenu.action===0"
                     :index="oneMenu.path">
          <template #title>
            <div :class="$route.path.toString().indexOf(oneMenu.path)>-1 ? 'is-activeV3' : ''">
              <el-icon v-if="oneMenu.icon">
                <component :is="oneMenu.icon"></component>
              </el-icon>
              {{ oneMenu.name }}
            </div>
          </template>
          <div v-for="twoMenu in oneMenu.children">
            <el-menu-item v-if="twoMenu.isOpen===0&&twoMenu.action===0" :index="twoMenu.path"
                          @click="menuPathClick(oneMenu.path)"
                          :class="$route.path === twoMenu.path ? 'is-activeV2' : ''">
              <el-icon v-if="twoMenu.icon">
                <component :is="twoMenu.icon"></component>
              </el-icon>
              {{ twoMenu.name }}
            </el-menu-item>
          </div>
        </el-sub-menu>
        <el-menu-item v-else-if="!oneMenu.hasOwnProperty('children')&&oneMenu.isOpen===0&&oneMenu.action===0"
                      :index="oneMenu.path" :class="$route.path === oneMenu.path ? 'is-activeV2' : ''">
          <span>
            <el-icon v-if="oneMenu.icon">
              <component :is="oneMenu.icon"></component>
            </el-icon>
            {{ oneMenu.name }}</span>
        </el-menu-item>
      </div>


    </el-menu>

  </div>
</template>
<script>
import {getMenu} from "@/util/auth";
import {useRoute, useRouter} from 'vue-router';
import {menu} from '@/ui'

export default {
  data() {
    return {
      menu:menu,
      selectMenu: "",
      //菜单集合
      menuList: [],
      routeName: this.$route.name,
      menuPath: ""
    }
  }, methods: {

    menuPathClick(data) {
      this.menuPath = data
    },
    getMenuIng() {
      this.menuList = JSON.parse(getMenu())
    }
  }, mounted() {
    this.getMenuIng();
    console.log(this.$parent)
  }
}
</script>

<style scoped>

</style>
<style>
.el-menu {
  border-right: 0 !important;
}

.is-activeV2 .el-sub-menu__title, .is-activeV2, .el-menu-item:hover, .el-sub-menu__title:hover {
  background-color:  v-bind('menu.selectBgColor') !important;
  transition: background-color 1s, color 1s;
  color: v-bind('menu.selectColor') !important;

}

.el-sub-menu__title:has(.is-activeV3){
  border-left: v-bind('menu.selectBorderLeft') 4px solid;
  transition:  border-left 1s;
}
.el-menu--inline{
  background-color: v-bind('menu.childMenuBgColor') !important;
}
</style>
