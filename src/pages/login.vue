<template>
  <div>
    <el-form v-model="loginForm">
      <el-form-item label="手机号">
        <el-input v-model="loginForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="loginForm.checkCode" ></el-input>
        <el-button type="primary" id="get-code" @click="toSendLoginCheckCode">获取验证码</el-button>
      </el-form-item>
    </el-form>

    <el-button @click="toLogin">登录</el-button>
  </div>
</template>

<script>
import { login,sendLoginCheckCode } from '../api/index.js'
export default {
  data() {
    return {
      loginForm: {
        phone: '',
        password: '',
        checkCode: ''
      },
    }
  },

  methods: {
    toSendLoginCheckCode() {
      sendLoginCheckCode({
        phone: this.loginForm.phone
      }).then(() => {
                this.$notify({
                    message: '验证码发送成功',
                    type: 'success'
                })
            })
    },
    toLogin() {
      window.console.log(this.loginForm)
      login(this.loginForm).then((res) => {
        localStorage.setItem('Authorization',res.data.Authorization)
        this.$router.push({ path:'/classify' })
        location.reload();
      })

    },
  },
}
</script>

<style>
#get-code {
  margin-left: 20px;
}
</style>


