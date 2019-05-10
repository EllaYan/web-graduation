<template>
  <div class="login-page">
    <div class="form-box">
      <el-form v-model="loginForm" label-width="60px" size="small">
        <p class="title">社区购后台</p>
        <el-form-item label="手机号">
          <el-input v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密 码">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <div id="code-input">
            <el-input v-model="loginForm.checkCode"></el-input>
            <el-button class="get-code" @click="toSendLoginCheckCode">获取验证码</el-button>
          </div>
          
        </el-form-item>

        <el-form-item>
          <el-button @click="toLogin" type="primary" class="submit">登录</el-button>
        </el-form-item>
      </el-form>

      
    </div>
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
      if(!this.loginForm.phone){
        this.$notify({
                    message: '请输入手机号',
                    type: 'warning'
                })
        return;
      }
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
  created() {
    let authorization = localStorage.getItem('Authorization')
    if(authorization){
      this.$router.push({ path:'/classify' })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-page{
  position: relative;
  height: 100vh;
  background: url(../../public/background.jpg) no-repeat;
  background-size: 100%;
}
.form-box{
  position:absolute;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  width:315px;
  height:240px;
  margin: auto;
  padding: 10px 20px 25px 15px;
  background-color: #fff;
  border-radius: 20px;
  .get-code{
    margin-left: 20px;
  }
}

.title{
  text-align: center;
  font-size: 22px;
  color: #ff5660;
  margin: 10px auto 20px;
}
</style>

<style lang="scss">
.form-box{
  .el-input{
    // width:80%;
  }
  .submit{
    width:195px;
    background-color: #ff5660;
    border-color: #ff5660;
  }
}
#code-input{
  .el-input{
    width:143px;
  }
}
</style>



