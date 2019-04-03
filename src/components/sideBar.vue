<template>
    <el-aside class="aside">
        <el-menu class="menu-container" active-text-color="#001529">
            <el-menu-item v-for="item in memu" :key="item.name">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
export default {
    data() {
        return {
            memu: [
                {
                    name: '商品管理',
                    route: ''
                }
            ]
        }
    }
}
</script>

<style lang="scss">
.aside{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #001529;
    color: #fff;
    width:200px !important;
    overflow: hidden;
}
.menu-container{
    background-color: #001529;
    color:#fff;
    width:200px;
    border:0;
    .el-menu-item{
        color: #fff;
        background-color: #001529;
        &:hover{
            background-color: #fff !important;
            color: #001529 !important;
        }
    }
    .is-active{
        color: #001529 !important;
    }
    
}
</style>


