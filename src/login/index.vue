<!--登录页面-->
<template>
  <div id="logInApp" @keydown="handleKeyDown">
    <div id="logIn">
      <h1 class="logInDivH3">{{ VUE_APP_TITLE }}</h1>
      <div id="logInDiv">
        <h3 class="logInDivH3">用户登录</h3>
        <el-form :model="userLogin" :rules="userRole" ref="userLoginRef">
          <el-form-item prop="account">
            <el-input v-model="userLogin.account" placeholder="请输入账号" class="logInInput">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <UserFilled/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="userLogin.password" placeholder="请输入密码" type="password" class="logInInput">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <key/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="logInButton" type="primary" @click="loginIng">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>

import {defineComponent, ref} from 'vue'
import {userRole} from "@/util/verify.js";
import {token, roleTree} from '@/api/auth'
import {getMenu, setMenu, setToken, setUser} from "@/util/auth";
import {Login} from '@/ui'
import {call} from "@/main";

export default defineComponent({
  data() {
    return {
      Login: Login,
      VUE_APP_TITLE: process.env.VUE_APP_TITLE,
      userLogin: {
        account: "",
        password: "",
      }, userRole: userRole
    }
  }, methods: {
    //回车
    handleKeyDown(data) {
      if (data.keyCode === 13) {
        this.loginIng();
      }
    },
    //菜单
    async treeIng() {
      roleTree().then(async req => {
        if (req.code === 200) {
          //设置菜单
          await setMenu(req.data)

          //跳转到首页
          this.$router.push({
            path: "/home",
          })
          console.log('加载完毕')
        }
      })
    },
    //登录
    loginIng() {
      this.$refs.userLoginRef.validate((valid) => {
        if (valid) {
          token(this.userLogin).then((req) => {
            if (req.code === 200) {
              setToken(req.data.accessToken);
              setUser(req.data)

              this.treeIng()
            }

          })
        }
      })

    }
  }
})
</script>

<style scoped>
.logInInput {
  height: 40px;
}

#logIn {
  margin-top: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.logInDivH3 {
  text-align: center;
}

#logInDiv {
  padding: 20px;
  width: 500px;
  height: 270px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .05);
  background-color: rgb(255, 255, 255, 0.9);

}

.logInButton {
  margin: 20px auto 0 auto;
  width: 200px;
  height: 40px;
  text-align: center;
  font-size: 16px;
  letter-spacing: 10px;
  background: linear-gradient(0deg, v-bind('Login.buttonBgColorTo'), v-bind('Login.buttonBgColor'));;
  border: 0;
  color: v-bind('Login.buttonColor');;
}

#logInApp {
  width: 100%;
  height: 100%;
  background-size: cover;
  position: absolute;
  z-index: -1;
  //background-repeat: no-repeat;
  //background: rgb(243,244,249);
  background: url("../assets/login/img/bg1.png");

}
</style>