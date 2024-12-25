<template>

  <router-view v-slot="{ Component }">
    <transition name="fade">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style>
.el-checkbox__input.is-indeterminate .el-checkbox__inner{
  transition: all 0.5s;

  background-color: v-bind('home.inputBorderColor') !important;
  border: v-bind('home.inputBorderColor') 1px solid !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  transition: all 0.5s;

  background-color: v-bind('home.inputBorderColor') !important;
  border: v-bind('home.inputBorderColor') 1px solid !important;
}

.el-checkbox__inner:hover {
  transition: all 0.5s;
  border: v-bind('home.inputBorderColor') 1px solid !important;
}

.el-input__wrapper {
  --el-input-focus-border-color: v-bind('home.inputBorderColor') !important;
}

.is-focused {
  box-shadow: 0 0 0 1px v-bind('home.inputBorderColor') inset !important;

}

body {
  //filter:progid:DXImageTransform.Microsoft.BasicImage(graysale=1);
  //-webkit-filter: grayscale(100%);

  padding: 0;
  margin: 0;
  border: 0;

}

/* 路由切换动画 */
/* fade-transform */
.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s;
}

/* 可能为enter失效，拆分为 enter-from和enter-to */
.fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
<script>
import {Home} from '@/ui'

export default {
  data() {
    return {
      home: Home
    }
  }, methods: {}, mounted() {
    const debounce = (fn, delay) => {
      let timer
      return (...args) => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fn(...args)
        }, delay)
      }
    }

    const _ResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
      constructor(callback) {
        callback = debounce(callback, 200);
        super(callback);
      }
    }
  }
}
</script>