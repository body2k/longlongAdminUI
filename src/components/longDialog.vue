<!--对话框-->
<template>
  <div id="longDialog" :class="!fullscreen?'':'longDialogFullscreen'">
    <el-dialog v-model="value" :show-close="false" :width="width" :fullscreen="fullscreen" :draggable="draggable"
               :close-on-click-modal="false">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <span :id="titleId" :class="titleClass">{{ title }}</span>
          <div>
            <el-button type="text" @click="fullScreen" class="dialog-header-button" v-if="!fullscreen">
              <el-icon>
                <FullScreen/>
              </el-icon>
            </el-button>
            <el-button type="text" @click="fullScreen" class="dialog-header-button" v-else>
              <el-icon>
                <Notification/>
              </el-icon>
            </el-button>
            <el-button type="text" @click="dialogClose" class="dialog-header-button dialog-header-button-clone"
                       v-if="!fullscreen">
              <el-icon>
                <CircleCloseFilled/>
              </el-icon>
            </el-button>
            <el-button type="text" @click="dialogClose" class="dialog-header-button" v-else>
              <el-icon>
                <CircleCloseFilled/>
              </el-icon>
            </el-button>
          </div>
        </div>

        <div class="my-body">
          <slot></slot>

        </div>
        <div class="my-footer">
          <slot name="footer"></slot>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import LongButtonGroupRight from "@/components/longButtonGroupRight.vue";
import {dialog} from '@/ui'
import {ElMessageBox} from "element-plus";

export default {
  components: {LongButtonGroupRight},
  props: {
    //是否可移动
    draggable: {
      type: Boolean,
      default: false
    },
    //标题
    title: {
      type: String,
      default: 'title'
    },
    //弹框控制
    modelValue: {
      type: Boolean,
      default: false
    },
    //大小
    width: {
      type: Number,
      default: 600
    },
  }, emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }, data() {
    return {
      dialog: dialog,
      fullscreen: false,
    }
  }, methods: {
    handleClose() {
      ElMessageBox.confirm('确定是否关闭！',
          '关闭', {
            confirmButtonText: '确定关闭',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        this.fullscreen = false
      }).catch(() => {
        this.dialogVisible = true

      })
    },
    //关闭
    dialogClose() {
      this.fullscreen = false
      this.value = false
    },
    //全屏
    fullScreen() {
      this.fullscreen = !this.fullscreen

    },
  }, mounted() {
    console.log(this.value)
  }
}
</script>
<style scoped>
.my-body {
  padding: 20px;
}

.my-footer {
  padding: 0 20px;
  display: flex;
  justify-content: center;
}

.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 5px 10px 0 10px;

  background-color: v-bind('dialog.headerBgColor');

  span, .dialog-header-button {
    margin:auto;
    color: v-bind('dialog.headerColor');;
    border-radius: 5px;
    font-size: 18px
  }

  .dialog-header-button-clone {
    position: absolute;
    top: -15px;
    margin-left: -2px;
  }
}


</style>
<style>
.fullscreen-dialog {
  transition: all 0.5s ease;
}

/* 进入 */
#longDialog .el-dialog, .longDialogFullscreen .el-dialog {
  animation: anim-open .3s ease !important;
}
.el-overlay-dialog{
  background-color: rgba(169, 169, 169, 0.6);
}

@keyframes anim-open {
  0% {
    transform: scale(0);

  }

  100% {
    transform: scale(1);
  }
}

#longDialog .el-dialog {
  border-radius: 5px;

  padding: 0;
}

#longDialog .el-dialog {
  padding: 0;
}


@keyframes dialog-fade-out {
  0% {
    transform: scale(1);
    background-color: rgba(169, 169, 169, 0.3);

  }

  100% {
    transform: scale(0);
    background-color: rgba(169, 169, 169, 0);

  }
}

.el-dialog__wrapper {
  transition: all 0.5s;
}

.el-dialog__wrapper.fullscreen {
  max-width: 100% !important;
  max-height: 100% !important;
}

.el-overlay {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>