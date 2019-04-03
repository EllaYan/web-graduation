<template>
    <el-aside class="aside">
        <el-menu class="menu-container">
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

<style lang="scss" scoped>
.aside{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #40C6FF;
    color: #fff;
}
.menu-container{
    background-color: #40C6FF;
    color:#fff;
}
</style>


