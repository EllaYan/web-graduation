<template>
    <el-aside class="aside">
        <div class="user-info">
            <div class="avatar">
                <i class="iconfont icon-avatar">&#xe7d5;</i>
            </div>
            <p class="user-name">管理员</p>
        </div>
        <el-menu class="menu-container" router :default-active="$route.path">
            <el-menu-item v-for="(item) in memu" :key="item.name" :route="item" :index="item.path">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.displayName}}</span>
            </el-menu-item>
        </el-menu>
        <div class="login-out" @click="loginOut">退出</div>
    </el-aside>
</template>

<script>
export default {
    data() {
        return {
            memu: [
                {
                    displayName: '分类管理',
                    path: '/classify'
                },
                {
                    displayName: '商品管理',
                    path: '/sku'
                },
                {
                    displayName: '订单管理',
                    path: '/order'
                },
                {
                    displayName: '团长业绩',
                    path: '/achievement'
                },
                {
                    displayName: '团长审核',
                    path: '/apply'
                },
                {
                    displayName: '系统管理',
                    path: '/system'
                }
            ]
        }
    },
    methods: {
        loginOut() {
            localStorage.clear();
            this.$router.push({path: '/login'})
            location.reload()
        }
    }
}
</script>

<style lang="scss">
.aside{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
    background-color: #404449;
    color: #fff;
    width:200px !important;
    overflow: hidden;
    .login-out{
        position: fixed;
        bottom:40px;
        cursor: pointer;
    }
}
.user-info{
    margin-top: 40px;
    text-align: center;
    .avatar{
        border: 2px solid #fff;
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }
    .icon-avatar{
        font-size: 50px;
        line-height:70px;
    }
}
.menu-container{
    background-color: #404449;
    color:#fff;
    width:199.9px;
    border:0;
    .el-menu-item{
        color: #fff;
        background-color: #404449;
        height: 40px;
        line-height: 40px;
    }
    .el-menu-item:hover, .el-menu-item:focus {
        outline: none;
        background: linear-gradient(to left, #409eff 0%,#2166E7 100%) !important;
    }
    .el-menu-item {
      &.is-opened,
      &.is-active{
        color: #fff;
        background: linear-gradient(to left, #409eff 0%,#2166E7 100%);
      }
  }
    
}
</style>


