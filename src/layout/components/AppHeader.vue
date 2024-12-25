<!--网站头布-->
<template>
  <div id="appHeader">
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="12" class="title">
            <img alt="Vue logo" src="@/assets/logo.png" style="width: 25px;height: 25px">

            全世界无产者联合起来
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" class="avatarDiv">

        <el-button type="text" @click="screenfull.toggle();" style="margin-right: 12px;font-size: 26px;margin-top: 8px;"
                   class="title" v-if="!winFlag">
          <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
            <el-icon>
              <FullScreen/>
            </el-icon>
          </el-tooltip>
        </el-button>
        <el-button type="text" @click="screenfull.toggle();" style="margin-right: 12px;font-size: 26px;margin-top: 8px;"
                   class="title" v-else>
          <el-tooltip class="item" effect="dark" content="退出全屏" placement="bottom">
            <el-icon>
              <Notification/>
            </el-icon>
          </el-tooltip>
        </el-button>
        <el-popover placement="bottom" :width="200" trigger="click">
          <template #reference>
            <div class="avatarDiv">
              <el-image :src="users.avatar" class="avatar"></el-image>
              <span class="userName">{{
                  users.userName
                }}</span>
            </div>
          </template>
          <p class="setting" @click="updatePassWord">修改密码</p>
          <p class="setting" @click="quitClick">退出</p>
        </el-popover>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {getUser, remove, removeToken} from "@/util/auth";
import {ElMessageBox} from "element-plus";
import {header} from '@/ui'
import screenfull from "screenfull";

export default {
  data() {
    return {
      header: header,
      users: JSON.parse(getUser()),
      winFlag: false
    }
  }, computed: {
    screenfull() {
      return screenfull
    }
  }, methods: {
    // 监听是否全屏状态
    isFullScreen() {
      this.winFlag = (
          (document.fullscreenElement && document.fullscreenElement !== null) ||
          (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
          (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
          (document.msFullscreenElement && document.msFullscreenElement !== null)
      );
    },


    //修改密码
    updatePassWord() {
      this.$refs.updatePassWord.dialogVisible = true
    },
    //退出
    quitClick() {
      ElMessageBox.confirm('确定是否退出！',
          '退出', {
            confirmButtonText: '退出',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        remove();
        this.$router.push({
          path: "/login",
        })
      }).catch(() => {

      })
    }
  }, created() {
    // 监听事件
    window.addEventListener('resize', this.isFullScreen)
  },
  beforeDestroy() {
    // 取消监听事件
    window.removeEventListener('resize', this.isFullScreen)
  },

}
</script>

<style scoped>
.avatarDiv {
  display: flex;
  justify-content: end;
  cursor: pointer;

}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  line-height: 5px;
  margin-top: 5px;
}

#appHeader {
  height: 50px;
  background-color: v-bind('header.bgColor');
}

.title {
  color: v-bind('header.color');;
  line-height: 2.5;
  font-size: 20px;
  margin-left: 20px;
}

.title:hover {
  color: v-bind('header.color');;
}

.setting {
  cursor: pointer;
  text-align: center;
  padding: 20px;
  margin: 0;
}

.setting:hover {
  padding: 20px;
  margin: 0;
  background-color: #f4f4f4;
}

.userName {
  color: v-bind('header.color');
  line-height: 50px;
  margin-left: 5px;
  margin-right: 20px;
}
</style>