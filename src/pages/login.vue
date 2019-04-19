<template>
  <div>
    <el-form v-model="loginForm">
      <el-form-item label="用户名">
        <el-input v-model="loginForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
    </el-form>

    <el-button @click="toLogin">登录</el-button>
  </div>
</template>

<script>
import { login } from '../api/index.js'
export default {
  data() {
    return {
      loginForm: {
        phone: '',
        password: '',
      },
    }
  },

  methods: {
    toLogin() {
      window.console.log(this.loginForm)
      login(this.loginForm).then((res) => {
        localStorage.setItem('Authorization',res.data.Authorization)
        this.$router.push({ path:'/order' })
        location.reload();
      })

    },
  },
}
</script>

<style>

</style>


